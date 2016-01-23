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

router.get('/', function(req, res, next) {

    School.find(function(err, doc) {
        if (err) {
            console.error(err);
            res.status(400).send(err);
        }
        res.json(doc);
    });
});

router.get('/:id', function(req, res, next) {
    School.find({
        _id: req.param('id')
    }, function(err, doc) {
        if (err) {
            console.error(err);
            res.status(400).send(err);
        }
        res.json(doc);
    });
});

router.post('/', function(req, res, next) {
    School.create({
        school_name: req.body.school_name,
        students: req.body.students,
        live_competitions: req.body.live_competitions,
        past_competitions: req.body.past_competitions
    }, function(err, doc) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        } else {
            res.send(doc);
        }
    });
});

router.delete('/:id', function(req, res, next) {
    School.findByIdAndRemove(req.param('id'), function(err, doc) {
        if (err) {
            console.error(err);
            res.status(400).send(err);
        }
        res.json(doc);
    });
});

router.patch('/:id', function(req, res, next) {
    var update = {};
    if (req.body.school_name)
        update.school_name = req.body.school_name;
    if (req.body.students)
        update.students = req.body.students;
    if (req.body.live_competitions)
        update.live_competitions = req.body.live_competitions;
    if (req.body.past_competitions)
        update.past_competitions = req.body.past_competitions;

    School.findOneAndUpdate({
        _id: req.param('id')
    }, update, function(err, doc) {
        if (err) {
            console.error(err);
            res.status(400).send(err);
        }
        res.send(doc);
    });
});

module.exports = router;
