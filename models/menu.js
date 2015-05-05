var mongodb = require('../db/db'),
	BSON = require('mongodb').BSONPure,
	MongoClient = require('mongodb').MongoClient;

function Menu(menu) {
  this.Title = menu.Title;
  this.IconCls = menu.IconCls;
  this.Action = menu.Action;
  this.Child = menu.Child;
};

module.exports = Menu;


Menu.prototype.save = function(callback) {

  var menu = {
      Title: this.Title,
      IconCls: this.IconCls,
	  Action: this.Action,
	  Child: this.Child
  };

  mongodb.collection('menus', function (err, collection) {
      if (err) {
        return callback(err);//错误，返回 err 信息
      }
      collection.insert(menu, {
        safe: true
      }, function (err, menu) {
        if (err) {
          return callback(err);//错误，返回 err 信息
        }
        callback(null, menu[0]);//成功！err 为 null，并返回存储后的用户文档
      });
    });
};


Menu.get = function(title, callback) {
  mongodb.collection('menus', function (err, collection) {
      if (err) {
        return callback(err);//错误，返回 err 信息
      }

      collection.findOne({
        title: title
      }, function (err, role) {
        if (err) {
          return callback(err);//失败！返回 err 信息
        }
        callback(null, role);//成功！返回查询的用户信息
      });
    });
};

// 字符串类型ID转Object
function idHex2Object(id){
	return BSON.ObjectID(id);
}

// 把字符串类型ID数组，转成Object类型数组
function changeIDArry(idArray){
	var i,len=idArray.length,arr =[];
	
	for(i=0; i < len; i++){
		arr[i] = idHex2Object(idArray[i]);
	}
	return arr;
}
Menu.getByIDArray = function(idArray, callback) {
	
	MongoClient.connect("mongodb://localhost:27017/seed", function(err, db) {
		if(err) { 
			return callback(err); 
		}
		
		db.collection('menus', function (err, collection) {
		  if (err) {
			return callback(err);//错误，返回 err 信息
		  }
		  var ids = changeIDArry(idArray);
		  collection.find({
			'_id' : { $in: ids}
		  }).toArray(function (err, docs) {
			if (err) {
			  return callback(err);//失败！返回 err
			}
			callback(null, docs);//成功！以数组形式返回查询的结果
		  });
		});
		
	});
};