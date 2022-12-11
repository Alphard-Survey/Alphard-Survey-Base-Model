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
    startDate: {
      type: String,
      default: "",
      trim: true,
      min: Date.now,
      max: '2099-12-31',
      required: "Start Date is Required",
    },
    endDate: {
      type: String,
      default: "",
      trim: true,
      min: Date.now,
      max: '2099-12-31',
      required: "End Date is Required",
    },
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
