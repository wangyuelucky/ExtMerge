var fs = require('fs'),
	path = require('path'),
	util = require('util'),
	commondir = require('./lib/commondir.js'),
	finder = require('./lib/walkdir.js'),
    detect = require('./findDirectDependence.js'),
	extKeyword = require('./lib/keyword.js'),
	searchMenu = require('./searchMenuByRole.js'),
	minify = require('./minify.js');
	
var sufferRegEx = /\.(js|coffee|jsx)$/, // 匹配文件类型
	commonPathRegEx = /Application\/common/,
	JS_SUFFER = '.js';
	DEPS_FILE_NAME = 'dependence.txt',
	DEEP_DEPS_FILE_NAME = 'deepDependence.txt',
	MENU_DEPS_FILE_NAME = 'menuDependence.txt',
	PROJECT_NAME = 'Soims', // 项目名称
	EXT_NAME = 'Ext', 
	APP_BASEPATH = 'Application', // 项目根路径
	EXT_BASEPATH = APP_BASEPATH + '\\common\\ext'; // ext根目录,注意用两个反斜线，一个是转义字符关键字


/**
* 用JSON方便查找，相当于map
* 用JSON对象方便输出到文件
* 保存最终结果,格式为
* {文件名-类名-依赖文件们}
*/
var tree = {};

/**
* 第二个参数例如，node main.js src
* 注意这里需要使用相对路径，并且第一个目录前没有斜线/
*/
var src = [process.argv[2]];
src = resolveTargets(src); // 获取绝对路径

var baseDir = getBaseDir(src); // 获得cmd当前目录

/**
*  1. 分析src下所有文件的依赖关系，并保存在tree中
*/
var t1 = Date.now();
createDepency(src);
var dure = Date.now() - t1;
console.log('generate dependency tree using ' + dure + 'ms');
fs.writeFileSync(DEPS_FILE_NAME, JSON.stringify(tree,undefined,'\t'), 'utf-8'); // 保存到文件
console.log('generate is ok,please check in ' + DEPS_FILE_NAME);




/**
*  2. 分析每个节点的深度依赖关系
*/
deepDependency(tree);
console.log('generate is ok,please check in ' + DEEP_DEPS_FILE_NAME);
fs.writeFileSync(DEEP_DEPS_FILE_NAME, JSON.stringify(tree,undefined,'\t'), 'utf-8'); // 保存到文件





/**
*  3. 根据角色-菜单-类的关系，按角色合并文件
 */
searchDepByMenu();
 

function searchDepByMenu(){
	dealTheCommon(); // 通用模块的处理
	searchMenu(function(roleMenus){ // 调用DAO读取数据库，并传递回调函数	
		for (key in roleMenus) { // 针对每一个角色进行处理
			if (roleMenus.hasOwnProperty(key)) { // 获取每个角色的所有菜单
				getDepsByRoleMenus(key,roleMenus[key]);
			}
		}
		
	});
}

/**
* 注意，如果A类依赖B类（A->B），
* 那么在合并压缩的时候，一定要先处理B再处理A
* 否则，在解析A类的时候，找不到B类，会去动态加载
*/
function getDepsByRoleMenus(role,menus){
	var res = {}, // 存放依赖关系，启到去重的作用，按角色去重
		basePath = path.resolve(baseDir);
	
	clearFiles(role);
	menus.forEach(function(menu){
		if(menu in tree){ // 查找menu在dependence中的对应节点
			if(!res[menu]){ // 判断menu关联的类，是否已被压缩
				res[menu] = menu;
				/**
				* 注意下面两句的顺序，要先压缩依赖文件，再压缩主文件
				*/
				getRolePath(key,tree[menu],res);
				minify(basePath + '\\' + menu.replace(/\//g,'\\') + '.js',role + 'Mini'+'.js');
			}
		}
	});
}

/**
* 根据角色，清空文件内容
*/
function clearFiles(role){
	fs.writeFileSync(role+'Deps'+'.txt', '', 'utf-8'); // 清空文件
	fs.writeFileSync(role+'Mini'+'.js', '', 'utf-8');
}

/**
* 手动处理通用文件，就是根据Ext.application的依赖关系合并文件
*/
function dealTheCommon(){
	var role = 'common',deps = [],set = {},
		basePath = path.resolve(baseDir),
		i,len,relative,
		/**
		* 因为app不符合Ext类定义，需要特殊处理
		*
		* 另外，common模块的文件应该是根据依赖关系分析出来的，
		* 而不应该是手动指定的
		*
		*/
		app =[
			/**
			* override
			*/
			'Application/common/override/BasicFormOverride', // 注意，去掉文件后缀
			'Application/common/override/TreeStoreOverride',
			'Application/common/override/ModelOverride',
			'Application/common/override/FieldBaseOverride',
			/**
			* util
			*/
			'Application/common/src/MD5',
			'Application/common/src/Tools',
			'Application/common/src/Cookies',
			'Application/common/src/Boolean',
			/**
			* ux
			*/
			'Application/common/ext/src/ux/form/CheckCode',
			'Application/common/ext/src/ux/tabPanel/TabCloseMenu',
			'Application/common/ext/src/ux/grid/menu/StoreMenu',
			/**
			* app
			*/
			'Application/Soims',
			'Application/controller/notification/Notification',
			'Application/controller/login/Login',
			'Application/app' 
		];
	
	clearFiles(role);	
	
	for(i=0,len = app.length; i < len; i++){
		relative = app[i];
		deps = tree[relative] ? tree[relative]: [];
		relative = relative.replace(/\//g,'\\');
		
		getRolePath(role,deps,set);
		/**
		* app的路径中不包含Controller，特殊处理
		*/
		minify(basePath + '\\' + relative + '.js',role + 'Mini'+'.js');
	};
}

function getRolePath(role,deps,set){
	deps.forEach(function(dep){
		if(!set[dep.relative]){ // 去重
			set[dep.relative] = dep.relative;
			fs.appendFileSync(role+'Deps'+'.txt', dep.path + '\n', 'utf-8'); // 把依赖文件的路径保存到文件
			minify(dep.path,role + 'Mini'+'.js');
		}
	});
}



/**
* 相当于cd命令
*/
function resolveTargets(sources) {
	return sources.map(function (src) {
		return path.resolve(src);
	});
};

function getBaseDir(src) {
	var dir = commondir(src);

	if (!fs.statSync(dir).isDirectory()) {
		dir = path.dirname(dir);
	}
	return dir;
};

function replaceBackslashInPath(path) {
	return path.replace(/\\/g, '/');
};

/**
* 获得相对根路径的相对路径，并且去除文件后缀
* 例如：根路径baseDir:  c:\AmdDetect\test
*	     filename: c:\AmdDetect\test\User\Login.js
*
* 结果：User/Login.js
*/
function relativePath(filename) {
	return replaceBackslashInPath(path.relative(baseDir, filename).replace(sufferRegEx, ''));
};

/**
*注意：key的作用是标明引用的类型
* 例如：在dependence路径中不包含项目根路径的话，说明是缺省路径
*		那么可以根据key的类型补全路径
*/
function modifyDependence(dependence,key){
	var projectNameReg = new RegExp(PROJECT_NAME,"g");
	
	if(!projectNameReg.test(dependence)){ // 缺省路径,则补全路径
		switch(key){
			case extKeyword.DEPEND_STORE:
				dependence = PROJECT_NAME + '.store.' + dependence;
				break;
			case extKeyword.DEPEND_VIEW:
				dependence = PROJECT_NAME + '.view.' + dependence;
				break;
			case extKeyword.DEPEND_CONTRL:
				dependence = PROJECT_NAME + '.controller.' + dependence;
				break;
		}	
	}
	return dependence;
}

/**
*  得到依赖关系dependence的绝对路径
* dependence格式为：Project.view.xxx.Ywz 或者 Ext.abc.edf.  注意：暂时不管后者
* 1. 需要把点. 换成斜线/ 并且在最后加上文件后缀 .js
* 2. 把Project名替换成项目根路径,把Ext替换成ext根目录
* 3. 有些情况下，对store的引用没有是以store文件夹为路径写的
*     例如：store: ' user.AddSample' ,依赖文件的实际路径为 Project.store.user.AddSample.js. 注意：这种情况也暂时不处理
* 4. 拼接BaseDir
*
*/
function getPathByBaseDir(dependence,key){
	var basePath = path.resolve(baseDir),
		projectNameReg = new RegExp(PROJECT_NAME,"g"),
		extNameReg = new RegExp(EXT_NAME,"g");
		
	dependence = modifyDependence(dependence,key);
	dependence = dependence.replace(/\./g,'\\')
					.replace(projectNameReg,'\\' +APP_BASEPATH)
						.replace(extNameReg,'\\' +EXT_BASEPATH);
						
	return basePath + dependence + '.js';
}

/**
* 根据类名，得到相对路径
* 例如：Soims.store.user.AddSample  转换为 ->   Application/store/user/AddSample
*/
function getRelativePath(dependence,key){
	var projectNameReg = new RegExp(PROJECT_NAME,"g"),
		extNameReg = new RegExp(EXT_NAME,"g");
		
	dependence = modifyDependence(dependence,key);
	dependence = dependence.replace(projectNameReg,APP_BASEPATH)
					.replace(extNameReg,EXT_BASEPATH).replace(/\.|\\/g,'/');
						
	return replaceBackslashInPath(dependence);
}

function addModule(filename) {
	var id = relativePath(filename);

	if (fs.existsSync(filename)) {
		tree[id] = parseFile(filename);
	}
};

/**
* 循环获取目录（以及子目录）下所有文件
*/
function createDepency(sources) {
	sources.forEach(function (src) {
		if (fs.statSync(src).isDirectory()) {
			finder.sync(src).filter(function (filename) {
				return !filename.match(commonPathRegEx) && filename.match(sufferRegEx); // 排除common文件夹下的搜索
			}, this).forEach(function (filename) {
				addModule(filename);
			}, this);
		} else {
			addModule(src);
		}
	}, this);
};

/**
* 读取文件内容
*/
function getFileSource(filename) {
	return fs.readFileSync(filename, 'utf8');
};

/**
* 利用amdetective.js解析文件的依赖关系
* 返回的结构为：
*	[
*		{ "className": "Soims.model.applicationAccept.AcceptAction",
*			"keyword": "requires",
*			"relative": "Application/model/applicationAccept/AcceptAction",
*			"path": "C:\\Users\\zn\\Desktop\\bishe\\AmdDedective\\test\\Application\\model
*		},
*		{ "className": "Soims.view.application.common.ElectronicDocumentGrid",
*			"keyword": "extends",
*			"relative": "Application/view/application/common/ElectronicDocumentGrid",
*			"path": "C:\\Users\\zn\\Desktop\\bishe\\AmdDedective\\test\\Application\\model
*		}
*	]
*
*/
function parseFile(filename) {
	try {
		var dependencies = [],key,ids=[],
			content = getFileSource(filename);

		if (/Ext.define|define|require|Ext.application\s*\(/m.test(content)) { // 匹配以Ext.define开头的文件，不算注释
			detect(content,{findNestedDependencies: true}).forEach(function (module) {
				if(module['deps']){
					module['deps'].forEach(function(dep){
						for (key in dep) {
							if (dep.hasOwnProperty(key) && dep[key]) {
								ids = dep[key].map(function(id){
									return {className: id, // 这个字段只是方便我们看，在算法中，没有起到任何作用
											keyword: key, // 表明关键字require exteds
											relative: getRelativePath(id,key), // 相对路径既可以用作查找的主键，最重要的是用来获取文件绝对路径
											path: getPathByBaseDir(id,key)
										};
								});
							}
							dependencies = dependencies.concat(ids);
						}
					});
				}				
			}, this);

			return dependencies;
		}
	} catch (e) {
		console.log('解析依赖关系发生错误,文件名称:' + filename);
	}

	return [];
};

/**
* 判断某个类是否在另外一个类的依赖中
* 例如，deps：[ { className: 'Soims.controller.application.show.B1Tab',
*            	  	relative: 'Application/controller/application/show/B1Tab',
*       			path: 'C:\\Users\\zn\\Desktop\\bishe\\AmdDedective\\test\\Application\\controller\\application\\show\\B1Tab.js' 
*		      }],
* key: 'Application/controller/application/show/B1Tab'
* 返回 true
*/
function isDepArrayContainKey(depsArray,key){
	var i=0,len,node,res = false;
	
	for(i,len = depsArray.length;i < len; i++){
		node = depsArray[i];
		if(node.relative === key){  
			res = true;
			break;
		}
	}
	return res;
}


/**
* 根据关键字（类名）在生成依赖树中查找依赖关系
* 例如：输入 'Application/controller/application/ApplicationGrid'
*	     返回 [ { className: 'Soims.controller.application.show.B1Tab',
*			relative: 'Application/controller/application/show/B1Tab',
*			path: 'C:\\Users\\zn\\Desktop\\bishe\\AmdDedective\\test\\Application\\controller\\application\\show\\B1Tab.js' 
*		     } ]
*
* 因为合并、压缩文件的时候，会简单的按照deepDependence中存储的依赖关系，进行压缩合并，
* 所以，在搜索深度依赖关系的时候，一定要先递归处理child，然后处理当前节点值
*
*/
function searchDependency(key,treeObj,deps){
	var extraDeps=[];
	
	if(key in treeObj){ // 注意：这里区分大小写
		extraDeps = treeObj[key];
		extraDeps.forEach(function (item) { // 双重循环
			searchDependency(item.relative,treeObj,deps); // 递归,怎样优化?
			if(!isDepArrayContainKey(deps,item.relative)){
				deps.push(item);
			}
		}, this);
	}else{
		console.log('err: the key or className ' + key + ' not in the dependency.');
	}
}

/**
* 给依赖树中的每一个key-value，生成深度依赖关系
*/
function deepDependency(treeObj){
	var key,deps,extraDeps=[],
		copy = JSON.parse(JSON.stringify(treeObj)); // 副本 
	
	for (key in copy) {
		if (copy.hasOwnProperty(key)) {
			deps=[];
			searchDependency(key,copy,deps);
			treeObj[key] = deps;
		}
	}
}




