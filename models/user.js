var mongodb = require('../db/db');

function User(user) {
  this.name = user.name;
  this.password = user.password;
  this.email = user.email;
  this.roleIDs = user.roleIDs;
};

module.exports = User;

// User实例也可以调用
User.prototype.save = function(callback) {
  //要存入数据库的用户文档
  var user = {
      name: this.name,
      password: this.password,
      email: this.email,
	  roleIDs: this.roleIDs
  };
  //打开数据库
  mongodb.collection('users', function (err, collection) {
      if (err) {
        return callback(err);//错误，返回 err 信息
      }
      //将用户数据插入 users 集合
      collection.insert(user, {
        safe: true
      }, function (err, user) {
        if (err) {
          return callback(err);//错误，返回 err 信息
        }
        callback(null, user[0]);//成功！err 为 null，并返回存储后的用户文档
      });
    });
};

// 用User类来查询
User.get = function(name, callback) {
  mongodb.collection('users', function (err, collection) {
      if (err) {
        return callback(err);//错误，返回 err 信息
      }
      //查找用户名（name键）值为 name 一个文档
      collection.findOne({
        name: name
      }, function (err, user) {
        if (err) {
          return callback(err);//失败！返回 err 信息
        }
        callback(null, user);//成功！返回查询的用户信息
      });
    });
};