var express = require('express');
var mongoose = require('mongoose');

const user = new mongoose.Schema({
    number:{type:Number, required:true},
    name:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true}
})

const userModel = mongoose.model('User', user)

module.exports = userModel;