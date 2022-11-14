/*
Members (Name - Student ID)
David Pietrocola –301247544 
Jacob Todasco – 301251200 
Jungyu Lee – 301236221 
Menal Humeda – 301160220 
Ryan Arafeh – 301239052 
Zack Havers – 301202845 
*/

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
const survey = require('../models/survey');

//Connect to survey Model
let Survey = require('../models/survey');

module.exports.displaysurveyList = (req, res, next) => {
    Survey.find((err, surveyList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            //console.log(surveyList);

            res.render('survey/list', 
            {title: 'Surveys', 
            surveyList: surveyList, 
            displayName: req.user ? req.user.displayName : ''});      
        }
    });
}

module.exports.displayAddPage = (req, res, next) => {
    res.render('survey/add', {title: 'Add survey', 
    displayName: req.user ? req.user.displayName : ''})          
}

module.exports.processAddPage = (req, res, next) => {
    let newsurvey = survey({
        "SurveyName": req.body.surveyName,
        "Question1": req.body.question1,
        "Answer1": req.body.answer1,
        "Question2": req.body.question2,
        "Answer2": req.body.answer2
    });

    Survey.create(newsurvey, (err, survey) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the survey list
            res.redirect('/survey-list');
        }
    });

}

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    survey.findById(id, (err, surveyToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            console.log(surveyToEdit);
            res.render('survey/edit', {title: 'Complete Survey', survey: surveyToEdit, 
            displayName: req.user ? req.user.displayName : ''})
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id

    let updatedsurvey = survey({
        "_id": id,
        "SurveyName": req.body.surveyName,
        "Question1": req.body.question1,
        "Answer1": req.body.answer1,
        "Question2": req.body.question2,
        "Answer2": req.body.answer2
    });

    survey.updateOne({_id: id}, updatedsurvey, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the survey list
            res.redirect('/survey-list');
        }
    });
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    survey.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
             // refresh the survey list
             res.redirect('/survey-list');
        }
    });
}