/*
Members (Name - Student ID)
David Pietrocola –301247544 
Jacob Todasco – 301251200 
Jungyu Lee – 301236221 
Menal Humeda – 301160220 
Ryan Arafeh – 301239052 
Zack Havers – 301202845 
*/

// require modules for the User Model
let mongoose = require("mongoose");
let passportLocalMongoose = require("passport-local-mongoose");

let User = mongoose.Schema(
  {
    username: {
      type: String,
      default: "",
      trim: true,
      required: "username is required",
    },

    /* password: {
      type: String,
      default: "",
      trim: true,
      required: "password is required",
    },*/

    email: {
      type: String,
      default: "",
      trim: true,
      required: "email address is required",
    },
    displayName: {
      type: String,
      default: "",
      trim: true,
      required: "Display Name is required",
    },
    birthDate: {
      type: String,
      default: "",
      trim: true,
      required: "Birth Date is Required",
    },
    phoneNumber: {
      type: String,
      default: "",
      trim: true,
      required: "Phone Number is Required",
    },
    created: {          //If this is for creating an Account, then it is okay to leave as is. - Jacob
      type: Date,       //If this is for creating a Survey, then swap the commented min/max.
      default: Date.now,
      min: '1900-01-01',
      max: Date.now,
      //min: Date.now,
      //max: '2099-12-31',
    },
    update: {     //If this is for updating profile birthday, then it's okay to leave as is.
      type: Date,
      default: Date.now,
      min: '1900-01-01',
      max: Date.now,
    },
  },
  {
    collection: "user",
  }
);

// configure options for User Model

let options = { missingPasswordError: "Wrong / Missing Password" };

User.plugin(passportLocalMongoose, options);

module.exports.User = mongoose.model("User", User);

//two parameters (user model and user object)
