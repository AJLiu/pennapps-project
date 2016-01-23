var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require('express-jwt');
var auth = jwt({
    secret: 'SECRET',
    userProperty: 'payload'
});

var mongoose = require('mongoose');
var Competition = mongoose.model('Competition');
var School = mongoose.model('School');
var Submission = mongoose.model('Submission');
var User = mongoose.model('User');

var auth = jwt({
    secret: 'SECRET',
    userProperty: 'payload'
});

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});

module.exports = router;
