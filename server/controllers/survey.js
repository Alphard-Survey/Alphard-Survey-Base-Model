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

//create reference to the model (dbschema)
let Survey = require("../models/survey");
const { findById } = require("../models/survey");
const excelJS = require('exceljs');

module.exports.displaySurveyList = (req, res, next) => {
  Survey.find((err, surveyList) => {
    if (err) {
      return console.error(err);
    } else {
      ;
      res.render("survey/list", {
        title: "Surveys",
        SurveyList: surveyList,
        displayName: req.user ? req.user.displayName : "", 
      });
    }
  });
};

module.exports.addpage = (req, res, next) => {
  res.render("survey/add", {
    title: "Add Survey",
    displayName: req.user ? req.user.displayName : "",
  });
};

module.exports.addprocesspage = (req, res, next) => {
  let newSurvey = Survey({
    name: req.body.name,
    owner: req.body.owner,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    isActive: req.body.isActive,
    type: req.body.type,
    q1: req.body.q1,
    q2: req.body.q2,
    q3: req.body.q3,
    q4: req.body.q4,
    q5: req.body.q5,
  });
  Survey.create(newSurvey, (err, Survey) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      // refresh the survey list
      res.redirect("/survey-list");
    }
  });
};

module.exports.displayeditpage = (req, res, next) => {
  let id = req.params.id; //id of actual object

  Survey.findById(id, (err, surveytoedit) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //show the edit view
      res.render("survey/edit", {
        title: "Edit Survey",
        survey: surveytoedit,
        displayName: req.user ? req.user.displayName : "",
      });
    }
  });
};

module.exports.processingeditpage = (req, res, next) => {
  let id = req.params.id; //id of actual object

  let updatesurvey = Survey({
    _id: id,
    name: req.body.name,
    owner: req.body.owner,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    isActive: req.body.isActive,
    q1: req.body.q1,
    q2: req.body.q2,
    q3: req.body.q3,
    q4: req.body.q4,
    q5: req.body.q5,
  });
  Survey.updateOne({ _id: id }, updatesurvey, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //refresh the survey list
      res.redirect("/survey-list");
    }
  });
};

module.exports.deletepage = (req, res, next) => {
  let id = req.params.id;
  Survey.remove({ _id: id }, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //refresh survey list
      res.redirect("/survey-list");
    }
  });
};

module.exports.displayanswerpage = (req, res, next) => {
  let id = req.params.id;
  Survey.findById(id, (err, surveytoanswer) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.render("survey/answer", {
        title: "Answer Survey",
        survey: surveytoanswer,
        displayName: req.user ? req.user.displayName : "",
      });
    }
      //show the answer view
  });
};

module.exports.processinganswerpage = (req, res, next) => {
  let answersurvey = Survey({
    survey_id: req.params.id,
    a1: req.body.a1,
    a2: req.body.a2,
    a3: req.body.a3,
    a4: req.body.a4,
    a5: req.body.a5,
  });
  Survey.create(answersurvey, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //refresh the survey list
      res.redirect("/survey-list");
    }
  });
};

module.exports.displayresponsepage = (req, res, next) => {
  let survey_id = req.params.survey_id;
  let id = req.params.id;
  Survey.find((err, surveytoresponse) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //show the response view
      res.render("survey/response", {
        title: "Survey Response",
        ResponseList: surveytoresponse,
        displayName: req.user ? req.user.displayName : "",
        page: req.url,
      });
    }
  });
}

// export statistics
module.exports.exportResponse = async(req, res)=>{
  try{
    const workbook = new excelJS.Workbook();
    const worksheet = workbook.addWorksheet("My Responses");

    worksheet.columns = [
      { header: "Index", key: "Index"},
      { header: "Survey_id", key: "survey_id"},      
      { header: "Answer 1", key: "a1"},
      { header: "Answer 2", key: "a2"},
      { header: "Answer 3", key: "a3"},
      { header: "Answer 4", key: "a4"},
      { header: "Answer 5", key: "a5"},
    ]

    let counter = 1;
    const responseData = await Survey.find({});
      responseData.forEach((response)=> {
          response.Index = counter;
          worksheet.addRow(response);
          counter++;            
      })

    worksheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true };
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", `attachment; filename=statistics.xlsx`);

    return workbook.xlsx.write(res).then(()=>{
      res.status(200);
    });

  } catch (error) {
    console.log(error.message);
  }
}


