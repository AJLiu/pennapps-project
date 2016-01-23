var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Submission = mongoose.model('Submission');

/* GET users listing. */
router.get('/', function(req, res, next) {

    Submission.find(function(err, users) {
        if (err) {
            console.error(err);
            res.send(err);
        }
        res.json(users);
    });
});

router.get('/:id', function(req, res, next) {
    Submission.find({_id: req.param('id')}, function(err, user) {
        if (err) {
            console.error(err);
            res.send(err);
        }
        res.json(user);
    });
});

router.post('/', function(req, res, next) {
    Submission.create({
        competition: req.body.competition,
        student: req.body.student,
        link: req.body.link
    }, function(err, doc) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.send(doc);
        }
    });
});

router.delete('/:id', function(req, res, next) {
    Submission.findByIdAndRemove(req.param('id'), function(err, doc) {
        if (err) {
            console.error(err);
            res.send(err);
        }
        res.json(doc);
    });
});

router.patch('/:id', function(req, res, next) {
    var update = {};
    if (req.body.competition)
        update.competition = req.body.competition;
    if (req.body.student)
        update.student = req.body.student;
    if (req.body.link)
        update.link = req.body.link;

    Submission.findOneAndUpdate({
        _id: req.param('id')
    }, update, function(err, doc) {
        if (err) {
            console.error(err);
            res.send(err);
        }
        res.send(doc);
    });
});

module.exports = router;
