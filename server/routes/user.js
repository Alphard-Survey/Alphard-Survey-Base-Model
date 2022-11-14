/*
Members (Name - Student ID)
David Pietrocola –301247544 
Jacob Todasco – 301251200 
Jungyu Lee – 301236221 
Menal Humeda – 301160220 
Ryan Arafeh – 301239052 
Zack Havers – 301202845 
*/

var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("Placeholder");
});

module.exports = router;
