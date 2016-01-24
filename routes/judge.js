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
var Judge = mongoose.model('Judge');
var Round = mongoose.model('Round');
var Match = mongoose.model('Match');

router.post('/register', function(req, res, next) {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({
            message: 'Please fill out all fields'
        });
    }

    var user = new Judge();

    user.first_name = req.body.first_name;
    user.last_name = req.body.last_name;
    user.email = req.body.email;
    user.grade = req.body.grade;

    user.setPassword(req.body.password);

    user.save(function(err) {
        if (err) {
            return next(err);
        }

        return res.json({
            token: user.generateJWT()
        });
    });
});

router.post('/login', function(req, res, next) {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({
            message: 'Please fill out all fields'
        });
    }

    passport.authenticate('local', function(err, user, info) {
  		if (err) { return next(err); }

  		if (user) {
  			return res.json({token: user.generateJWT()});
  		} else {
  			return res.status(401).json(info);
  		}
  	})(req, res, next);
});

router.get('/:id', function(req, res, next) {
    Judge.findOne({
        _id: req.param('id')
    }, function(err, user) {
        if (err) {
            console.error(err);
            res.status(400).send(err);
        }
        res.json(user);
    });
});

module.exports = router;
