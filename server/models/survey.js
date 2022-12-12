/*
Members (Name - Student ID)
David Pietrocola –301247544 
Jacob Todasco – 301251200 
Jungyu Lee – 301236221 
Menal Humeda – 301160220 
Ryan Arafeh – 301239052 
Zack Havers – 301202845 
*/

let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");
const { stringify } = require("querystring");

//create a model class
let surveyModel = mongoose.Schema(
  {
    name: String,
    owner: String,
    startDate: String,
    endDate:String,
    isActive:String,
    type: String,
    survey_id:String,
    q1: String,
    q2: String,
    q3: String,
    q4: String,
    q5: String,
    a1: String,
    a2: String,
    a3: String,
    a4: String,
    a5: String,  
  },

  {
    collection: "survey",
  }
);

//surveymodel to create new survey more powerful than just class
module.exports = mongoose.model("Survey", surveyModel);
