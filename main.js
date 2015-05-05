var fs = require('fs'),
	path = require('path'),
	util = require('util'),
	commondir = require('./lib/commondir.js'),
	finder = require('./lib/walkdir.js'),
    detect = require('./findDirectDependence.js'),
	extKeyword = require('./lib/keyword.js'),
	searchMenu = require('./searchMenuByRole.js'),
	minify = require('./minify.js');
	
var sufferRegEx = /\.(js|coffee|jsx)$/, // ƥ���ļ�����
	commonPathRegEx = /Application\/common/,
	JS_SUFFER = '.js';
	DEPS_FILE_NAME = 'dependence.txt',
	DEEP_DEPS_FILE_NAME = 'deepDependence.txt',
	MENU_DEPS_FILE_NAME = 'menuDependence.txt',
	PROJECT_NAME = 'Soims', // ��Ŀ����
	EXT_NAME = 'Ext', 
	APP_BASEPATH = 'Application', // ��Ŀ��·��
	EXT_BASEPATH = APP_BASEPATH + '\\common\\ext'; // ext��Ŀ¼,ע����������б�ߣ�һ����ת���ַ��ؼ���


/**
* ��JSON������ң��൱��map
* ��JSON���󷽱�������ļ�
* �������ս��,��ʽΪ
* {�ļ���-����-�����ļ���}
*/
var tree = {};

/**
* �ڶ����������磬node main.js src
* ע��������Ҫʹ�����·�������ҵ�һ��Ŀ¼ǰû��б��/
*/
var src = [process.argv[2]];
src = resolveTargets(src); // ��ȡ����·��

var baseDir = getBaseDir(src); // ���cmd��ǰĿ¼

/**
*  1. ����src�������ļ���������ϵ����������tree��
*/
var t1 = Date.now();
createDepency(src);
var dure = Date.now() - t1;
console.log('generate dependency tree using ' + dure + 'ms');
fs.writeFileSync(DEPS_FILE_NAME, JSON.stringify(tree,undefined,'\t'), 'utf-8'); // ���浽�ļ�
console.log('generate is ok,please check in ' + DEPS_FILE_NAME);




/**
*  2. ����ÿ���ڵ�����������ϵ
*/
deepDependency(tree);
console.log('generate is ok,please check in ' + DEEP_DEPS_FILE_NAME);
fs.writeFileSync(DEEP_DEPS_FILE_NAME, JSON.stringify(tree,undefined,'\t'), 'utf-8'); // ���浽�ļ�





/**
*  3. ���ݽ�ɫ-�˵�-��Ĺ�ϵ������ɫ�ϲ��ļ�
 */
searchDepByMenu();
 

function searchDepByMenu(){
	dealTheCommon(); // ͨ��ģ��Ĵ���
	searchMenu(function(roleMenus){ // ����DAO��ȡ���ݿ⣬�����ݻص�����	
		for (key in roleMenus) { // ���ÿһ����ɫ���д���
			if (roleMenus.hasOwnProperty(key)) { // ��ȡÿ����ɫ�����в˵�
				getDepsByRoleMenus(key,roleMenus[key]);
			}
		}
		
	});
}

/**
* ע�⣬���A������B�ࣨA->B����
* ��ô�ںϲ�ѹ����ʱ��һ��Ҫ�ȴ���B�ٴ���A
* �����ڽ���A���ʱ���Ҳ���B�࣬��ȥ��̬����
*/
function getDepsByRoleMenus(role,menus){
	var res = {}, // ���������ϵ������ȥ�ص����ã�����ɫȥ��
		basePath = path.resolve(baseDir);
	
	clearFiles(role);
	menus.forEach(function(menu){
		if(menu in tree){ // ����menu��dependence�еĶ�Ӧ�ڵ�
			if(!res[menu]){ // �ж�menu�������࣬�Ƿ��ѱ�ѹ��
				res[menu] = menu;
				/**
				* ע�����������˳��Ҫ��ѹ�������ļ�����ѹ�����ļ�
				*/
				getRolePath(key,tree[menu],res);
				minify(basePath + '\\' + menu.replace(/\//g,'\\') + '.js',role + 'Mini'+'.js');
			}
		}
	});
}

/**
* ���ݽ�ɫ������ļ�����
*/
function clearFiles(role){
	fs.writeFileSync(role+'Deps'+'.txt', '', 'utf-8'); // ����ļ�
	fs.writeFileSync(role+'Mini'+'.js', '', 'utf-8');
}

/**
* �ֶ�����ͨ���ļ������Ǹ���Ext.application��������ϵ�ϲ��ļ�
*/
function dealTheCommon(){
	var role = 'common',deps = [],set = {},
		basePath = path.resolve(baseDir),
		i,len,relative,
		/**
		* ��Ϊapp������Ext�ඨ�壬��Ҫ���⴦��
		*
		* ���⣬commonģ����ļ�Ӧ���Ǹ���������ϵ���������ģ�
		* ����Ӧ�����ֶ�ָ����
		*
		*/
		app =[
			/**
			* override
			*/
			'Application/common/override/BasicFormOverride', // ע�⣬ȥ���ļ���׺
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
		* app��·���в�����Controller�����⴦��
		*/
		minify(basePath + '\\' + relative + '.js',role + 'Mini'+'.js');
	};
}

function getRolePath(role,deps,set){
	deps.forEach(function(dep){
		if(!set[dep.relative]){ // ȥ��
			set[dep.relative] = dep.relative;
			fs.appendFileSync(role+'Deps'+'.txt', dep.path + '\n', 'utf-8'); // �������ļ���·�����浽�ļ�
			minify(dep.path,role + 'Mini'+'.js');
		}
	});
}



/**
* �൱��cd����
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
* �����Ը�·�������·��������ȥ���ļ���׺
* ���磺��·��baseDir:  c:\AmdDetect\test
*	     filename: c:\AmdDetect\test\User\Login.js
*
* �����User/Login.js
*/
function relativePath(filename) {
	return replaceBackslashInPath(path.relative(baseDir, filename).replace(sufferRegEx, ''));
};

/**
*ע�⣺key�������Ǳ������õ�����
* ���磺��dependence·���в�������Ŀ��·���Ļ���˵����ȱʡ·��
*		��ô���Ը���key�����Ͳ�ȫ·��
*/
function modifyDependence(dependence,key){
	var projectNameReg = new RegExp(PROJECT_NAME,"g");
	
	if(!projectNameReg.test(dependence)){ // ȱʡ·��,��ȫ·��
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
*  �õ�������ϵdependence�ľ���·��
* dependence��ʽΪ��Project.view.xxx.Ywz ���� Ext.abc.edf.  ע�⣺��ʱ���ܺ���
* 1. ��Ҫ�ѵ�. ����б��/ �������������ļ���׺ .js
* 2. ��Project���滻����Ŀ��·��,��Ext�滻��ext��Ŀ¼
* 3. ��Щ����£���store������û������store�ļ���Ϊ·��д��
*     ���磺store: ' user.AddSample' ,�����ļ���ʵ��·��Ϊ Project.store.user.AddSample.js. ע�⣺�������Ҳ��ʱ������
* 4. ƴ��BaseDir
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
* �����������õ����·��
* ���磺Soims.store.user.AddSample  ת��Ϊ ->   Application/store/user/AddSample
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
* ѭ����ȡĿ¼���Լ���Ŀ¼���������ļ�
*/
function createDepency(sources) {
	sources.forEach(function (src) {
		if (fs.statSync(src).isDirectory()) {
			finder.sync(src).filter(function (filename) {
				return !filename.match(commonPathRegEx) && filename.match(sufferRegEx); // �ų�common�ļ����µ�����
			}, this).forEach(function (filename) {
				addModule(filename);
			}, this);
		} else {
			addModule(src);
		}
	}, this);
};

/**
* ��ȡ�ļ�����
*/
function getFileSource(filename) {
	return fs.readFileSync(filename, 'utf8');
};

/**
* ����amdetective.js�����ļ���������ϵ
* ���صĽṹΪ��
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

		if (/Ext.define|define|require|Ext.application\s*\(/m.test(content)) { // ƥ����Ext.define��ͷ���ļ�������ע��
			detect(content,{findNestedDependencies: true}).forEach(function (module) {
				if(module['deps']){
					module['deps'].forEach(function(dep){
						for (key in dep) {
							if (dep.hasOwnProperty(key) && dep[key]) {
								ids = dep[key].map(function(id){
									return {className: id, // ����ֶ�ֻ�Ƿ������ǿ������㷨�У�û�����κ�����
											keyword: key, // �����ؼ���require exteds
											relative: getRelativePath(id,key), // ���·���ȿ����������ҵ�����������Ҫ����������ȡ�ļ�����·��
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
		console.log('����������ϵ��������,�ļ�����:' + filename);
	}

	return [];
};

/**
* �ж�ĳ�����Ƿ�������һ�����������
* ���磬deps��[ { className: 'Soims.controller.application.show.B1Tab',
*            	  	relative: 'Application/controller/application/show/B1Tab',
*       			path: 'C:\\Users\\zn\\Desktop\\bishe\\AmdDedective\\test\\Application\\controller\\application\\show\\B1Tab.js' 
*		      }],
* key: 'Application/controller/application/show/B1Tab'
* ���� true
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
* ���ݹؼ��֣��������������������в���������ϵ
* ���磺���� 'Application/controller/application/ApplicationGrid'
*	     ���� [ { className: 'Soims.controller.application.show.B1Tab',
*			relative: 'Application/controller/application/show/B1Tab',
*			path: 'C:\\Users\\zn\\Desktop\\bishe\\AmdDedective\\test\\Application\\controller\\application\\show\\B1Tab.js' 
*		     } ]
*
* ��Ϊ�ϲ���ѹ���ļ���ʱ�򣬻�򵥵İ���deepDependence�д洢��������ϵ������ѹ���ϲ���
* ���ԣ����������������ϵ��ʱ��һ��Ҫ�ȵݹ鴦��child��Ȼ����ǰ�ڵ�ֵ
*
*/
function searchDependency(key,treeObj,deps){
	var extraDeps=[];
	
	if(key in treeObj){ // ע�⣺�������ִ�Сд
		extraDeps = treeObj[key];
		extraDeps.forEach(function (item) { // ˫��ѭ��
			searchDependency(item.relative,treeObj,deps); // �ݹ�,�����Ż�?
			if(!isDepArrayContainKey(deps,item.relative)){
				deps.push(item);
			}
		}, this);
	}else{
		console.log('err: the key or className ' + key + ' not in the dependency.');
	}
}

/**
* ���������е�ÿһ��key-value���������������ϵ
*/
function deepDependency(treeObj){
	var key,deps,extraDeps=[],
		copy = JSON.parse(JSON.stringify(treeObj)); // ���� 
	
	for (key in copy) {
		if (copy.hasOwnProperty(key)) {
			deps=[];
			searchDependency(key,copy,deps);
			treeObj[key] = deps;
		}
	}
}




