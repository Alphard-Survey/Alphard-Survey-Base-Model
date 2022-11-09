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