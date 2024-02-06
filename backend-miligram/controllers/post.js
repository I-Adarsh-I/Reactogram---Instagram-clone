var express = require("express");
var mongoose = require("mongoose");
var userModel = require('../models/user_model')
var postModel = require("../models/post_model");
var protectedRoutes = require("../middlewares/protectedRoutes");

module.exports.createPostHandler = async (req, res) => {
  const { description, location, image } = req.body;
  try {
   const { _id, fullname, profileImg } = req.user;
    console.log("I am the author: ", req.user)
   // req.user.password = undefined;
    const postObj = new postModel({
      description: description,
      location: location,
      image: image,
      author:{
         id: _id,
         name: fullname,
         profileImg: profileImg
      }
    }); //creating instance of postModel for a new post object
    await postObj.save(); //saving the new post object in database using save method
    res.status(201).json({ post: postObj });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
