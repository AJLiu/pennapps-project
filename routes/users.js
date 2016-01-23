var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var User = mongoose.model('User');

/* GET users listing. */
router.get('/', function(req, res, next) {

    User.find(function(err, users) {
        if (err) {
            console.error(err);
            res.status(400).send(err);
        }
        res.json(users);
    });
});

router.get('/:id', function(req, res, next) {
    User.find({
        _id: req.param('id')
    }, function(err, user) {
        if (err) {
            console.error(err);
            res.status(400).send(err);
        }
        res.json(user);
    });
});

/**
 * This is only for mass producing dummy users
 */
router.post('/', function(req, res, next) {
    User.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        grade: req.body.grade,
        school: req.body.school,
        live_competitions: req.body.live_competitions,
        past_competitions: req.body.past_competitions,
    }, function(err, doc) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        } else {
            User.setPassword(req.body.password);
            res.send(doc);
        }
    });
});

router.delete('/:id', function(req, res, next) {
    User.findByIdAndRemove(req.param('id'), function(err, doc) {
        if (err) {
            console.error(err);
            res.status(400).send(err);
        }
        res.json(doc);
    });
});

router.patch('/:id', function(req, res, next) {
    var update = {};
    if (req.body.first_name)
        update.first_name = req.body.first_name;
    if (req.body.last_name)
        update.last_name = req.body.last_name;
    if (req.body.email)
        update.email = req.body.email;
    if (req.body.grade)
        update.grade = req.body.grade;
    if (req.body.school)
        update.school = req.body.school;
    if (req.body.live_competitions)
        update.live_competitions = req.body.live_competitions;
    if (req.body.past_competitions)
        update.past_competitions = req.body.past_competitions;

    if(req.body.password)
        User.setPassword(req.body.password);

    User.findOneAndUpdate({
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
