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
let passport = require("passport");

//create the user model instance
let userModel = require("../models/user");
let User = userModel.User; //alias

module.exports.displayHomepage = (req, res, next) => {
  res.render("index", {
    title: "Home",
    displayName: req.user ? req.user.displayName : "",
  });
};

module.exports.displayaboutpage = (req, res, next) => {
  res.render("about", {
    title: "About",
    displayName: req.user ? req.user.displayName : "",
  });
};

module.exports.displayContactpage = (req, res, next) => {
  res.render("contact", {
    title: "Contact",
    displayName: req.user ? req.user.displayName : "",
  });
};

module.exports.displayProfilepage = (req, res, next) => {
  res.render("profile", {
    title: "Profile",
    username: req.user ? req.user.username : "",
    email: req.user ? req.user.email : "",
    displayName: req.user ? req.user.displayName : "",
    birthDate: req.user ? req.user.birthDate : "",
    phoneNumber: req.user? req.user.phoneNumber : "",
  });
};

module.exports.displayLoginPage = (req, res, next) => {
  // check if the user is already logged in
  if (!req.user) {
    res.render("auth/login", {
      title: "Login",
      messages: req.flash("loginMessage"),
      displayName: req.user ? req.user.displayName : "",
    });
  } else {
    return res.redirect("/");
  }
};

module.exports.processLoginPage = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    // server err?
    if (err) {
      return next(err);
    }
    // is there a user login error?
    if (!user) {
      req.flash("loginMessage", "Authentication Error");
      return res.redirect("/login");
    }
    req.login(user, (err) => {
      // server error?
      if (err) {
        return next(err);
      }
      return res.redirect("/survey-list");
    });
  })(req, res, next);
};

module.exports.displayRegisterPage = (req, res, next) => {
  // check if the user is not already logged in
  if (!req.user) {
    res.render("auth/register", {
      title: "Register",
      messages: req.flash("registerMessage"),
      displayName: req.user ? req.user.displayName : "",
    });
  } else {
    return res.redirect("/");
  }
};

module.exports.processRegisterPage = (req, res, next) => {
  // instantiate a user object
  let newUser = new User({
    username: req.body.username,
    //password: req.body.password
    email: req.body.email,
    displayName: req.body.displayName,
    birthDate: req.body.birthDate,
    phoneNumber: req.body.phoneNumber,
  });

  User.register(newUser, req.body.password, (err) => {
    if (err) {
      console.log("Error: Inserting New User");
      if (err.name == "UserExistsError") {
        req.flash(
          "registerMessage",
          "Registration Error: User Already Exists!"
        );
        console.log("Error: User Already Exists!");
      }
      return res.render("auth/register", {
        title: "Register",
        messages: req.flash("registerMessage"),
        displayName: req.user ? req.user.displayName : "",
      });
    } else {
      // if no error exists, then registration is successful

      // redirect the user and authenticate them

      return passport.authenticate("local")(req, res, () => {
        res.redirect("/survey-list");
      });
    }
  });
};

module.exports.displayUpdateProfilePage = (req, res, next) => {
  res.render("auth/update", {
    title: "Edit Profile",
    username: req.user ? req.user.username : "",
    email: req.user ? req.user.email : "",
    displayName: req.user ? req.user.displayName : "",
    birthDate: req.user ? req.user.birthDate : "",
    phoneNumber: req.user? req.user.phone : "",
  });
};

//Testing post request from edit user
module.exports.processUpdateProfilePage = (req, res, next) => {
  let updatedUser = User({
    _id: req.user._id,
    username: req.body.username,
    email: req.body.email,
    displayName: req.body.displayName,
    birthDate: req.body.birthDate,
    phoneNumber: req.body.phoneNumber,
  });

  User.updateOne({ _id: req.user._id }, updatedUser, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      // refresh the user list
      res.redirect("/profile");
    }
  });
};

module.exports.performLogout = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};
