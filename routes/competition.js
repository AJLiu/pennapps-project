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

    Competition.find(function(err, doc) {
        if (err) {
            console.error(err);
            res.status(400).send(err);
        }
        var date = new Date();
        for(var i in doc) {
            if(date < doc[i].start_date)
                doc[i].prompt="Come back later"
            else if(date > doc[i].end_date)
                doc[i].prompt+="\nNOTE: THIS EVENT IS OVER."
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
            res.status(400).send(err);
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
            res.status(400).send(err);
        } else {
            res.send(doc);
        }
    });
});

router.delete('/:id', function(req, res, next) {
    Competition.findByIdAndRemove(req.param('id'), function(err, doc) {
        if (err) {
            console.error(err);
            res.status(400).send(err);
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
            res.status(400).send(err);
        }
        res.send(doc);
    });
});

router.param('id', function(req, res, next, id) {
	Competition.findOne({_id: id}).then(function(competition) {
		req.competition = competition;
		return next();
	}, function(error) {
		res.status(400).send(error);
	});
});

router.post('/:id/register', auth, function(req, res, next) {
	Competition.update(
		{_id: req.competition._id},
		{$push: {students: req.payload._id}}
	).then(function() {
		return User.update(
      {_id: req.payload._id},
      {$push: {live_competitions: req.competition._id}}
    );
	}).then(function() {
    res.send(req.competition);
  }, function(error) {
    res.status(400).send(error);
  });
});

router.post('/:id/withdraw', auth, function(req, res, next) {
  Competition.update(
    {_id: req.competition._id},
    {$pull: {students: req.payload._id}}
  ).then(function() {
    return User.update(
      {_id: req.payload._id},
      {$pull: {live_competitions: req.competition._id}}
    ).then(function() {
      res.send(req.competition);
    }, function(error) {
      res.status(400).send(error);
    });
  });
});

module.exports = router;
