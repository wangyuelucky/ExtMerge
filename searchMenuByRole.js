var fs = require('fs'),
	Menu = require('./models/menu.js'),
	Role = require('./models/role.js');

	
var APP_BASEPATH = 'Application',
	MINIFY_FILE_NAME = 'minify.txt',
	DEPENDENCY_FILE_PATH ='./deepDependence.txt';





function getRoleMenu(callback){
	Role.getAll(function (err, roles) {
		var roleMenus = {};
		roles.forEach(function(role){
			console.log(role.code); // 角色代码
			roleMenus[role.code] = [];
			Menu.getByIDArray(role.menuIDs,function (err, menus) {
				menus.forEach(function(menu){
					if(menu.Action){
						var path = menu.Action.split('-');
						if(path[0]){
							roleMenus[role.code].push(APP_BASEPATH + '/controller/' + path[0].replace(/\./g,'/'));
						}
						if(path[2]){
							roleMenus[role.code].push(APP_BASEPATH + '/controller/' + path[2].replace(/\./g,'/'));
						}
						
					}
				});
				callback(roleMenus);
				fs.writeFileSync(role.code + '.txt',JSON.stringify(roleMenus[role.code],undefined,'\t'),'utf-8');
			});
		});
		
	});
}


module.exports = getRoleMenu;
