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

let indexController = require("../controllers/index");

/* GET home page. */
router.get("/", indexController.displayHomepage);

/* GET home page. */
router.get("/home", indexController.displayHomepage);

/* GET About Us page. */
router.get("/about", indexController.displayaboutpage);

/* GET Contact Us page. */
router.get("/contact", indexController.displayContactpage);

/* GET Profile Page. */
router.get("/profile", indexController.displayProfilepage);

/* GET Route for displaying the Login page */
router.get("/login", indexController.displayLoginPage);

/* POST Route for processing the Login page */
router.post("/login", indexController.processLoginPage);

/* GET Route for displaying the Register page */
router.get("/register", indexController.displayRegisterPage);

/* POST Route for processing the Register page */
router.post("/register", indexController.processRegisterPage);

/* GET to perform UserLogout */
router.get("/logout", indexController.performLogout);

/* GET Update Profile Page */
router.get("/update", indexController.displayUpdateProfilePage);

router.post("/update", indexController.processUpdateProfilePage);



router.post('/contact', function(req, res){
    //do something
    res.jsonp("THANK YOU FOR VISTING OUR WEBSITE LOOKING FORWARD TO ASSIT YOU !")
    })


module.exports = router;
