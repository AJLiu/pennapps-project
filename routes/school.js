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
    School.findOne({
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

router.get('/list/top', function(req, res, next) {
  School.find().then(function(schools) {
    Submission.find().then(function(submissions) {
      var studentPromises = [];
      for (var i=0; i<submissions.length; i++) {
        studentPromises.push(User.findOne({_id: submissions[i].student}));
      }
      Promise.all(studentPromises).then(function(students) {
        var studentSchoolPromises = [];
        for (var i=0; i<students.length; i++) {
          studentSchoolPromises.push(School.findOne({_id: students[i].school}));
        }
        Promise.all(studentSchoolPromises).then(function(studentSchools) {
          var schoolScorePairs = schools.map(function(school) {
            return {
              school: school,
              score: 0
            };
          });
          for (var i=0; i<studentSchools.length; i++) {
            for (var j=0; j<schoolScorePairs.length; j++) {
              if (studentSchools[i]._id == schoolScorePairs[j].school._id) {
                schoolScorePairs.score += submissions[i].rating();
              }
            }
          }
          schoolScorePairs.sort(function(a,b){
            if(a.score == b.score){
              return a.school.school_name > b.school.school_name ? 1 : a.school.school_name < b.school.school_name ? -1 : 0;
            }
            return a.score > b.score ? 1 : -1;
          });
          res.json(schoolScorePairs);
        });
      });
    });
  });
});

module.exports = router;
