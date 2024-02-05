var express = require("express");
var mongoose = require("mongoose");
var router = require("../routes/index");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var userModel = require("../models/user_model");

module.exports.signUpHandler = async (req, res) => {
  const { number, fullname, email, password } = req.body;
  try {
    const isExistingUser = await userModel.findOne({ email });
    if (isExistingUser) {
      res.status(404).json({ message: "User already exists" });
    } else{
        const hashedPass = await bcrypt.hash(password, 12);
        const newUser = await userModel.create({
          number,
          fullname,
          email,
          password: hashedPass,
        });
        console.log("New user created: ", newUser);
        res.status(200).json({message: 'User resgistered successfully!'})
    }

  } catch (err) {
    console.log("error while signing up: ", err);
  }
};

module.exports.loginHandler = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.status(404).json({ error: "User does not exist" });
    } else {
      res.status(200).json({ msg: "User successfully logged in" });
    }
  } catch (err) {
    console.log("error while logging in: ", err);
  }
};
