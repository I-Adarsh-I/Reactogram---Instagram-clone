var express = require('express');
var mongoose = require('mongoose');
var { ObjectId } = mongoose.Schema.Types

const postSchema = new mongoose.Schema({
    description: { 
        type: String,
        required: true
    },
    location: { 
        type: String,
        required: true
    },
    image: { 
        type: String,
    },
    author: {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'userModel'
        },
        name: String,
        profileImg:String
    },
    postedAt: {
        type: Date,
        default: Date.now
    }
})

const postModel = mongoose.model('post', postSchema);

module.exports = postModel;