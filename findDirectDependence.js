var esprima = require('esprima'),
    parse = require('./lib/parse.js');



/**
* 数组去重，这里只考虑数组元素是简单元素的情况
* 如：[1,2,3,4 ] [' a', ' b', ' c']
*/
function uniqArr(arr){
	var ra = [],obj={}; 
	for(var i = 0, len = arr.length; i < len; i++){ 
		if(!obj[arr[i]]){
			obj[arr[i]] = arr[i];
			ra.push(arr[i]);
		}
	} 
	return ra; 
}

	
/**
* 返回类型为：
*  [ { name : 'Soims.controller.application.ApplicationGrid', 
*	deps : [ 
*		{ requires: [' application.ApplicationGrid', ' Soims.model.application.common.SampleApplicationType'] },
*		{ extend: [' application.ApplicationGrid', ' Soims.model.application.common.SampleApplicationType'] }
*    ]}
*  ]
*/
function find(fileContents, options) {
    options = options || {};

		/**
		* 存储Controllers依赖
		* 因为会有多个匹配，所以用{}方便查找
		*/
	var	depObj = {}, 
		rels =[],
		key,temp ={},
        moduleList = [],
        astRoot;
		
	try{
		astRoot = esprima.parse(fileContents);
		parse.recurse(astRoot, function (callName, config, name, deps) {
			if (!deps) {
				deps = [];
			}
			/**
			* 1. 类的定义中，没有指定类名,这种情况可以暂时不考虑。例如：Ext.define( null, {} );
			* 2. 在解析类的内部的时候，无法获得name
			* 所以，if语句会被多次执行，而else语句只执行一次
			*/
			if (!name) {
				if(depObj[deps.name]){
					depObj[deps.name] = uniqArr(depObj[deps.name].concat(deps.relations));
				}else{
					depObj[deps.name] = deps.relations;
				}
			} else {
				moduleList.push({ // 只会执行一次
					name: name,
					deps: deps
				});
			}

			//If define was found, no need to dive deeper, unless
			//the config explicitly wants to dig deeper.
			return !!options.findNestedDependencies;
		}, options);
	}catch(e){
		console.log('解析文件AST错误！'+e.message);
	}

	// 把对Controllers的查询结果转换成数组
	if(moduleList.length){
		for (key in depObj) {
			if (depObj.hasOwnProperty(key)) {
				temp[key] = depObj[key];
				moduleList[0].deps.push(temp);
			}
		}
	}

    return moduleList;
}


module.exports = find;
