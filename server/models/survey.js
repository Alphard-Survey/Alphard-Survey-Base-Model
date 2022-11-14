/*
Members (Name - Student ID)
David Pietrocola –301247544 
Jacob Todasco – 301251200 
Jungyu Lee – 301236221 
Menal Humeda – 301160220 
Ryan Arafeh – 301239052 
Zack Havers – 301202845 
*/
let mongoose = require('mongoose');
let express = require("express");
let router = express.Router();

//Create Model Class
let surveyModel = mongoose.Schema(
{
    SurveyName: String,
    Question1: String,
    Answer1: String,
    Question2: String,
    Answer2: String,
},
{
    collection: "Survey"
});

module.exports = mongoose.model('Survey', surveyModel);