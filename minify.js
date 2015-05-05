var fs = require('fs'),
	uglifyJS = require("uglify-js");

	
var APP_BASEPATH = 'Application',
	DEPENDENCY_FILE_PATH ='./deepDependence.txt';


function pass(fn, file,dir, scope) {
	var args = [file,dir];

	return function(exists) {
		var fnArgs = [exists].concat(args);
		fnArgs.push.apply(fnArgs, arguments);
		return fn.apply(scope || this, fnArgs);
	};
}	

function existCallBack(exists,fp,dir){
	if(exists){
		var result = uglifyJS.minify(fp);
		fs.appendFile(dir, result.code, 'utf-8'); // 保存到文件
	}else{
		console.log('the file ' + fp + ' not exist, please check it');
	}
}

/**
* path 文件的绝对路径
* dir 合并到哪个文件中
*/
function minifyByPath(path,dir){
	fs.exists(path, pass(existCallBack,path,dir)); // pass的作用是，想给回调函数传参
}



module.exports = minifyByPath;
