var esprima = require('esprima'),
    parse = require('./lib/parse.js');



/**
* ����ȥ�أ�����ֻ��������Ԫ���Ǽ�Ԫ�ص����
* �磺[1,2,3,4 ] [' a', ' b', ' c']
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
* ��������Ϊ��
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
		* �洢Controllers����
		* ��Ϊ���ж��ƥ�䣬������{}�������
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
			* 1. ��Ķ����У�û��ָ������,�������������ʱ�����ǡ����磺Ext.define( null, {} );
			* 2. �ڽ�������ڲ���ʱ���޷����name
			* ���ԣ�if���ᱻ���ִ�У���else���ִֻ��һ��
			*/
			if (!name) {
				if(depObj[deps.name]){
					depObj[deps.name] = uniqArr(depObj[deps.name].concat(deps.relations));
				}else{
					depObj[deps.name] = deps.relations;
				}
			} else {
				moduleList.push({ // ֻ��ִ��һ��
					name: name,
					deps: deps
				});
			}

			//If define was found, no need to dive deeper, unless
			//the config explicitly wants to dig deeper.
			return !!options.findNestedDependencies;
		}, options);
	}catch(e){
		console.log('�����ļ�AST����'+e.message);
	}

	// �Ѷ�Controllers�Ĳ�ѯ���ת��������
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
