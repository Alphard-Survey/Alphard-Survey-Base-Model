var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

/* GET surveys page. */
router.get('/surveys', function(req, res, next) {
  res.render('surveys', { title: 'Surveys' });
});

module.exports = router;
