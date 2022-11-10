var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


//Modules For Authentication
let session = require('express-session');
let passport = require('passport');
let passportlocal = require('passport-local');
let localStrategy = passportlocal.Strategy;
let flash = require('connect-flash');

//Database Setup
let mongoose = require('mongoose');
let DB = require('./db');

//Point Mongoose To The DB URI
mongoose.connect(DB.URI, {useNewUrlParser: true});

let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Connection Error'));
mongoDB.once('open', ()=>{
  console.log('Connected To Mongo');
});

var indexRouter = require('../routes/index');
var usersRouter = require('../routes/users');
var surveyRouter = require('../routes/survey');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

//Setup Express Session
app.use(session({
  secret: "SomeSecret",
  saveUninitialized: false,
  resave: false 
}));

//Initialize Flash
app.use(flash());

//Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

//Passport User Configuration

//Create User Model Instance
let userModel = require('../models/user');
let User = userModel.User;

//Impliment A User Authentication Strategy
passport.use(User.createStrategy());

//Serialize And Deserialize The User Infro
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/survey-list', surveyRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

