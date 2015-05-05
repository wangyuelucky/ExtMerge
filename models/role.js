var mongodb = require('../db/db'),
	BSON = require('mongodb').BSONPure,
	MongoClient = require('mongodb').MongoClient;

function Role(role) {
  this.name = role.name;
  this.code = role.code;
  this.menuIDs = role.menuIDs;
};

module.exports = Role;


Role.prototype.save = function(callback) {

  var role = {
      name: this.name,
      code: this.code,
	  menuIDs: this.menuIDs
  };
  //打开数据库
  mongodb.collection('roles', function (err, collection) {
      if (err) {
        return callback(err);//错误，返回 err 信息
      }
      collection.insert(role, {
        safe: true
      }, function (err, role) {
        if (err) {
          return callback(err);//错误，返回 err 信息
        }
        callback(null, role[0]);//成功！err 为 null，并返回存储后的用户文档
      });
    });

};


Role.get = function(name, callback) {
  //打开数据库
  mongodb.collection('roles', function (err, collection) {
      if (err) {
        return callback(err);//错误，返回 err 信息
      }
      //查找用户名（name键）值为 name 一个文档
      collection.findOne({
        name: name
      }, function (err, role) {
        if (err) {
          return callback(err);//失败！返回 err 信息
        }
        callback(null, role);//成功！返回查询的用户信息
      });
    });
};

Role.getByID = function(id, callback) {
  mongodb.collection('roles', function (err, collection) {
      if (err) {
        return callback(err);//错误，返回 err 信息
      }
		
      collection.findOne({
        '_id': BSON.ObjectID(id)
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
Role.getByIDArray = function(idArray, callback) {

  mongodb.collection('roles', function (err, collection) {
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
};

Role.getAll = function(callback) {
	MongoClient.connect("mongodb://localhost:27017/seed", function(err, db) {
  
		if(err) { 
			return callback(err); 
		}
	  
	  db.collection('roles', function (err, collection) {
		  if (err) {
			return callback(err);//错误，返回 err 信息
		  }
		  collection.find({}).toArray(function (err, docs) {
			if (err) {
			  return callback(err);//失败！返回 err
			}
			callback(null, docs);//成功！以数组形式返回查询的结果
		  });
		});
		
	});
};