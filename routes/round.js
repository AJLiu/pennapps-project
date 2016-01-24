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

router.param('competitionId', function(req, res, next, id) {
	Competition.findOne({_id: id}).then(function(competition) {
		req.competition = competition;
		return next();
	}, function(error) {
		res.status(400).send(error);
	});
});

router.post('/generate/from/:competitionId', function(req, res, next) {
  Submission.find(
    {_id: { $in: req.competition.submissions }}
  ).then(function(submissions) {
    shuffle(submissions);
    var creates = [];
    for (var i=0; i<submissions.length; i+=2) {
      var submissionA = submissions[i];
      var submissionB;
      if (submissions[i+1]) {
        submissionB = submissions[i+1];
      } else {
        var randomIndex = Math.floor(Math.random() * submissions.length);
        submissionB = submissions[randomIndex];
      }
      creates.push(Match.create({
        submissionA: submissionA._id,
        submissionB: submissionB._id
      }));
    }
    Promise.all(creates).then(function(matches) {
      Judge.find().then(function(judges) {
        var updates = [];
        var saves = [];
        for (var i=0; i<matches.length; i++) {
          var judgeIndex = i % judge.length;
          updates.push(Judge.update(
            {_id: judges[judgeIndex]._id},
            {$push: {currentMatches: matches[i]._id}}
          ));
          judges[judgeIndex]
          matches[i].judge = judges[judgeIndex]._id;
          saves.push(matches[i].save());
        }
        Promise.all(updates).then(function() {
          return Promise.all(saves);
        }).then(function(matches) {
          var matchesId = matches.map(function(match) {
            return match._id;
          });
          Round.create({
            matches: matchesId,
            competition: req.competition._id
          }).then(function(round) {
            res.send(round);
          }, function(error) {
            res.status(400).send(error);
          });
        }, function(error) {
          res.status(400).send(error);
        });
      }, function(error) {
        res.status(400).send(error);
      });
    }, function(error) {
      res.status(400).send(error);
    });
  }, function(error) {
    res.status(400).send(error);
  });
});

router.get('/:id', function(req, res, next) {
  Round.findOne({
      _id: req.param('id')
  }, function(err, doc) {
      if (err) {
          console.error(err);
          res.status(400).send(err);
      }
      res.json(doc);
  });
});

module.exports = router;
