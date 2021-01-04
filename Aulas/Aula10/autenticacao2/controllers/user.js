var mongoose = require('mongoose');
var User = require('../models/user');

module.exports.list = function () {
    return User.find().exec()
}

module.exports.lookUp = function(id){
    return User.findOne({id:id}).exec()
}

module.exports.insert = function(u){
    console.log(JSON.stringify(u));
    var newUser = new User(u);
    return newUser.save();
}

