var lang = require('./lang.js'),
    esprima = require('esprima'),
	extKeyword = require('./keyword.js');


function arrayToString(ary) {
    var output = '[';
    if (ary) {
        ary.forEach(function (item, i) {
            output += (i > 0 ? ',' : '') + '"' + lang.jsEscape(item) + '"';
        });
    }
    output += ']';

    return output;
}

//This string is saved off because JSLint complains
//about obj.arguments use, as 'reserved word'
var argPropName = 'arguments';

//From an esprima example for traversing its ast.
function traverse(object, visitor) {
    var key, child;

    if (!object) {
        return;
    }

    if (visitor.call(null, object) === false) {
        return false;
    }
    for (key in object) {
        if (object.hasOwnProperty(key)) {
            child = object[key];
            if (typeof child === 'object' && child !== null) {
                if (traverse(child, visitor) === false) {
                    return false;
                }
            }
        }
    }
}

//Like traverse, but visitor returning false just
//stops that subtree analysis, not the rest of tree
//visiting.
function traverseBroad(object, visitor) {
    var key, child;

    if (!object) {
        return;
    }

    if (visitor.call(null, object) === false) {
        return false;
    }
    for (key in object) {
        if (object.hasOwnProperty(key)) {
            child = object[key];
            if (typeof child === 'object' && child !== null) {
                traverse(child, visitor);
            }
        }
    }
}

/**
 * Pulls out dependencies from an array literal with just string members.
 * If string literals, will just return those string values in an array,
 * skipping other items in the array.
 *
 * 把Node类型的数组，转换成string类型的数组
 *
 * @param {Node} node an AST node.
 *
 * @returns {Array} an array of strings.
 * If null is returned, then it means the input node was not a valid
 * dependency.
 */
function getValidDeps(node) {
    if (!node || node.type !== 'ArrayExpression' || !node.elements) {
        return;
    }

    var deps = [];

    node.elements.some(function (elem) {
        if (elem.type === 'Literal') {
            deps.push(elem.value);
        }
    });
	//console.log('...get valid deps: ' + deps + '...');
    return deps.length ? deps : undefined;
}

/**
* 解析require节点的值
* 例如： require : 'abc.d'
*	     require : ['cde.f']
*
* 返回值：[ 'cde.f', 'abc.d']
*/
function getRequireDeps(node) {
    if (!node) {
        return;
    }

    var deps = [];

	if(node.type === 'ArrayExpression'){ // 数组类型
		node.elements.some(function (elem) {
			if (elem.type === 'Literal') {
				deps.push(elem.value);
			}
		});
	} else if(node.type === 'Literal'){ // 值类型
		deps.push(node.value);
	}
    
    return deps.length ? deps : undefined;
}

/**
 * Main parse function. Returns a string of any valid require or
 * define/require.def calls as part of one JavaScript source string.
 * @param {String} moduleName the module name that represents this file.
 * It is used to create a default define if there is not one already for the
 * file. This allows properly tracing dependencies for builds. Otherwise, if
 * the file just has a require() call, the file dependencies will not be
 * properly reflected: the file will come before its dependencies.
 * @param {String} moduleName
 * @param {String} fileName
 * @param {String} fileContents
 * @param {Object} options optional options. insertNeedsDefine: true will
 * add calls to require.needsDefine() if appropriate.
 * @returns {String} JS source string or null, if no require or
 * define/require.def calls are found.
 */
function parse(moduleName, fileName, fileContents, options) {
    options = options || {};

    //Set up source input
    var i, moduleCall, depString,
        moduleDeps = [],
        result = '',
        moduleList = [],
        needsDefine = true,
        astRoot = esprima.parse(fileContents);

    parse.recurse(astRoot, function (callName, config, name, deps) {
        if (!deps) {
            deps = [];
        }

        if (callName === 'define' && (!name || name === moduleName)) {
            needsDefine = false;
        }

        if (!name) {
            //If there is no module name, the dependencies are for
            //this file/default module name.
            moduleDeps = moduleDeps.concat(deps);
        } else {
            moduleList.push({
                name: name,
                deps: deps
            });
        }

        //If define was found, no need to dive deeper, unless
        //the config explicitly wants to dig deeper.
        return !!options.findNestedDependencies;
    }, options);

    if (options.insertNeedsDefine && needsDefine) {
        result += 'require.needsDefine("' + moduleName + '");';
    }

    if (moduleDeps.length || moduleList.length) {
        for (i = 0; i < moduleList.length; i++) {
            moduleCall = moduleList[i];
            if (result) {
                result += '\n';
            }

            //If this is the main module for this file, combine any
            //"anonymous" dependencies (could come from a nested require
            //call) with this module.
            if (moduleCall.name === moduleName) {
                moduleCall.deps = moduleCall.deps.concat(moduleDeps);
                moduleDeps = [];
            }

            depString = arrayToString(moduleCall.deps);
            result += 'define("' + moduleCall.name + '",' +
                      depString + ');';
        }
        if (moduleDeps.length) {
            if (result) {
                result += '\n';
            }
            depString = arrayToString(moduleDeps);
            result += 'define("' + moduleName + '",' + depString + ');';
        }
    }

    return result || null;
}

parse.traverse = traverse;
parse.traverseBroad = traverseBroad;

/**
 * Handles parsing a file recursively for require calls.
 * @param {Array} parentNode the AST node to start with.
 * @param {Function} onMatch function to call on a parse match.
 * @param {Object} [options] This is normally the build config options if
 * it is passed.
 */
parse.recurse = function (object, onMatch, options) {
    //Like traverse, but skips if branches that would not be processed
    //after has application that results in tests of true or false boolean
    //literal values.
    var key, child,
        hasHas = options && options.has;

	// 递归结束条件1：解析到AST的叶子节点
    if (!object) {
        return;
    }

	/**
	* 如果不需要分析require(' ' , function(){}或者app.getController()等
	* 类似这样的语句的话，可以设置非深度搜索
	*/
	
	/** 递归结束条件2：非深度搜索情况下，只要一找到define，就结束
	* 不在对此节点的子节点进行查找
	/*注意：这里的return是 往上层返回，并不是一定是算法的终止
	*/
    if (this.parseNode(object, onMatch) === false) { // step：先处理当前节点Node对象
        return;
	}
	for (key in object) { // step2：然后处理节点的每一个属性对象
		if (object.hasOwnProperty(key)) {
			//console.log('...key: ' + key +'...');
			child = object[key];
			if (typeof child === 'object' && child !== null) {
				this.recurse(child, onMatch, options);
			}
		}
	}
};


/**
 * Finds require("") calls inside a CommonJS anonymous module wrapped
 * in a define function, given an AST node for the definition function.
 * @param {Node} node the AST node for the definition function.
 * @returns {Array} and array of dependency names. Can be of zero length.
 */
parse.getAnonDepsFromNode = function (node) {
    var deps = [],
        funcArgLength;

    if (node) {
        this.findRequireDepNames(node, deps);

        //If no deps, still add the standard CommonJS require, exports,
        //module, in that order, to the deps, but only if specified as
        //function args. In particular, if exports is used, it is favored
        //over the return value of the function, so only add it if asked.
        funcArgLength = node.params && node.params.length;
        if (funcArgLength) {
            deps = (funcArgLength > 1 ? ["require", "exports", "module"] :
                    ["require"]).concat(deps);
        }
    }
    return deps;
};





/**
* 找到指定节点下的require关键字
* node 必须是Ext.define('abc.de.f', {}); 的config JSON对象 
*
*/
parse.findByDepKeyWord = function (node) {
	var i,len,deps=[],obj;
	if (!node && !node.properties) {
        return;
    }
	
    for (i=0, len = node.properties.length; i< len; i++) {
        child = node.properties[i];
		obj ={};
		if (child && child.key) {
			switch(child.key.name){
				case extKeyword.DEPEND_REQ:
				case extKeyword.DEPEND_STORE:
				case extKeyword.DEPEND_MODEL:
				case extKeyword.DEPEND_VIEW:
				case extKeyword.DEPEND_EXTEND:
					obj[child.key.name] = getRequireDeps(child.value);
					deps.push(obj);
					break;
				
			}
			
		}
    }
	return deps;
};



//Ext.define()
parse.hasExtDefine = function (node) {	
	return	node && node.type === 'CallExpression' && node.callee &&node.callee.type === 'MemberExpression' && 
		node.callee.object && node.callee.object.type === 'Identifier' && node.callee.object.name === 'Ext' &&
        node.callee.property && node.callee.property.type === 'Identifier' && node.callee.property.name === 'define';
	
};


/**
* 检查getController的调用者，是否符合规则
* 我们认为：只有app.getController() 和 this.getController() 是正确的调用方式
*/
parse.checkControllerCallee = function(object){
	return object.type === 'ThisExpression' || object.name === 'app';
}


/*
* 验证是否是合法的表达式getController
*
* 解析格式如下：
*
*"object": {
*	"type": "CallExpression",
*	"callee": {
*		"type": "MemberExpression",
*		"computed": false,
*		"object": {
*			"type": "ThisExpression"
*		},
*		"property": {
*			"type": "Identifier",
*			"name": "getController"
*		}
*	},
*	"arguments": [
*		{
*			"type": "Literal",
*			"value": "abc",
*			"raw": "'abc'"
*		}
*	]
*}
*/
parse.validControllerExpression = function (node) {	
	return	node && node.type === 'CallExpression' && 
		node.callee &&node.callee.type === 'MemberExpression' && 
		node.callee.object && parse.checkControllerCallee(node.callee.object) &&
        node.callee.property && node.callee.property.name === 'getController';
	
};


parse.findRequireDepNames = function (node, deps) {
    traverse(node, function (node) {
        var arg;

        if (node && node.type === 'CallExpression' && node.callee &&
                node.callee.type === 'Identifier' &&
                node.callee.name === 'require' &&
                node[argPropName] && node[argPropName].length === 1) {

            arg = node[argPropName][0];
            if (arg.type === 'Literal') {
                deps.push(arg.value);
            }
        }
    });
};



/**
 * Determines if a specific node is a valid require or define/require.def
 * call.
 * @param {Array} node
 * @param {Function} onMatch a function to call when a match is found.
 * It is passed the match name, and the config, name, deps possible args.
 * The config, name and deps args are not normalized.
 *
 * @returns {String} a JS source string with the valid require/define call.
 * Otherwise null.
 */
parse.parseNode = function (node, onMatch) {
    var name, deps, cjsDeps, arg, factory,obj={},
        args = node && node[argPropName];
		
	//  解析每个文件，这个语句只会匹配一次成功
	// 因为一个类是一个文件，只能有一个Ext.define
	if(parse.hasExtDefine(node) && args && args.length){
		name = args[0];
        factory = args[1];
		deps=[];

        // 这里只考虑name是string的情况

		/**
		* 返回的结构如下：
		*	[ 
		*		{ requires : [ 
		*			{ ’Soims.model.application.common.SampleApplicationType’},
		*			{ ’Soims.model.applicationAccept.AcceptAction’}
		*		]},
		*		 {extends : [ 
		*			{ ’Soims.model.application.common.SampleApplicationType’},
		*			{ ’Soims.model.applicationAccept.AcceptAction’}
		*		]}
		*	]
		*/
        if (factory && factory.type === 'ObjectExpression') {
			deps = parse.findByDepKeyWord(factory);
			//  解析require(); 语句
        } else if (factory && factory.type === 'FunctionExpression') {
            //If no deps and a factory function, could be a commonjs sugar
            //wrapper, scan the function for dependencies.
            cjsDeps = parse.getAnonDepsFromNode(factory);
            if (cjsDeps.length) {
                deps = cjsDeps;
            }
        } else if (deps || factory) {
            //Does not match the shape of an AMD call.
            return;
        }

        //Just save off the name as a string instead of an AST object.
        if (name && name.type === 'Literal') {
            name = name.value;
        }

        return onMatch("extDefine", null, name, deps, node);
	}else if (parse.validControllerExpression(node) && args && args.length) {// 这个语句会多次匹配，因为会有多个getController()和require()
		/**
		* obj 的结构是:{name: 'controllers', deps: [' abc.de.f', 'sd.lk.g']}
		* 目的是，返回的时候，合并相同的依赖关系
		*/
		obj.name = extKeyword.DEPEND_CONTRL;
		obj.relations = [args[0].value];// 这里只把第一个参数看做是依赖关系getControllert(' soims.abc.def ');
		return onMatch("getController", null, undefined, obj, node) && false; // 强制停止，不再搜索本语句的子节点
    }
};


module.exports = parse;
