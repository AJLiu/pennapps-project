var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Competition = mongoose.model('Competition');

router.get('/', function(req, res, next) {

    Competition.find(function(err, doc) {
        if (err) {
            console.error(err);
            res.send(err);
        }
        res.json(doc);
    });
});

router.get('/:id', function(req, res, next) {
    Competition.find({
        _id: req.param('id')
    }, function(err, doc) {
        if (err) {
            console.error(err);
            res.send(err);
        }
        res.json(doc);
    });
});

router.post('/', function(req, res, next) {
    Competition.create({
        name: req.body.name,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        prompt: req.body.prompt,
        students: req.body.students,
        submissions: req.body.submissions
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
    Competition.findByIdAndRemove(req.param('id'), function(err, doc) {
        if (err) {
            console.error(err);
            res.send(err);
        }
        res.json(doc);
    });
});

router.patch('/:id', function(req, res, next) {
    var update = {};
    if (req.body.name)
        update.name = req.body.name;
    if (req.body.start_date)
        update.start_date = req.body.start_date;
    if (req.body.end_date)
        update.end_date = req.body.end_date;
    if (req.body.prompt)
        update.prompt = req.body.prompt;
    if (req.body.students)
        update.students = req.body.students;
    if (req.body.submissions)
        update.submissions = req.body.submissions;

    Competition.findOneAndUpdate({
        _id: req.param('id')
    }, update, function(err, doc) {
        if(err){
            console.error(err);
            res.send(err);
        }
        res.send(doc);
    });
});

module.exports = router;
