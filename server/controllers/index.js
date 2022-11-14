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
let passport = require('passport');

//Define User Model Instance
let userModel = require('../models/user');
let User = userModel.User;

module.exports.displayHomePage = (req, res, next) => {
    res.render('index', {title: 'Home', displayName: req.user ? req.user.displayName: ""});
}

module.exports.displayAboutPage = (req, res, next) => {
    res.render('about', { title: 'About Us', displayName: req.user ? req.user.displayName: ""});
}

module.exports.displaySurveysPage = (req, res, next) => {
    res.render('surveys', { title: 'Surveys', displayName: req.user ? req.user.displayName: ""});
}

module.exports.displayLoginPage = (req, res, next) => {
    //Check If User Logged In
    if(!req.user)
    {
        res.render('auth/login',
        {
            title: "Login",
            messages: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName: ""
        })
    }
    else
    {
        return  res.redirect('/');
    }
};

module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate('local',
    (err, user, info) => {
        //Server Err
        if(err)
        {
            return next(err);
        }
        //Is There A Login Error
        if(!user)
        {
            req.flash('loginMessage', 'Authentication Error');
            return res.redirect('/login');
        }
        req.login(user, (err) => {
            //Server Error
            if(err)
            {
                return next(err);
            }
            return res.redirect('/survey-list')
        });
    })(req,res, next);
};

module.exports.displayRegisterPage = (req, res, next) => {
    //Check if the user is not already logged in
    if(!req.user)
    {
        res.render('auth/register',
        {
            title: 'Register',
            messages: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName: ""
        });
    }
    else
    {
        return res.redirect('/');
    }
}

module.exports.processRegisterPage = (req, res, next) => {
    //Initiate A User Object
    let newUser = new User({
        username: req.body.username,
        //password: rew.body.password
        email: req.body.email,
        displayName: req.body.displayName
    });

    User.register(newUser, req.body.password, (err) =>{
        if(err)
        {
            console.log('Error: Inserting New User');
            if(err.name == "UserExistsError")
            {   
                req.flash(
                    'registerMessage',
                    'Registration Error: User Already Exists'
                );
                console.log('Error: User Already Exists')
            }
            return res.render('auth/register', 
            {
                title: 'Register',
                messages: req.flash('registerMessage'),
                displayName: req.user ? req.user.displayName: ""
            });
        }
        else
        {
            //If No Error
            //Redirect And Authenticate
            return passport.authenticate('local')(req,res,()=>{
                res.redirect('/survey-list')
            });
        }
    });
}

module.exports.performLogout = (req,res,next) => {      
    req.logout(req.user, err => {
        if(err) return next(err);
        res.redirect("/");
    });
}