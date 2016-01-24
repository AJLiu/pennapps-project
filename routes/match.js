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

router.param('id', function(req, res, next, id) {
	Match.findOne({_id: id}).then(function(match) {
		req.match = match;
		return next();
	}, function(error) {
		res.status(400).send(error);
	});
});

router.post('/:id/vote', auth, function(req, res, next) {
  var winId;
  var lossId;
  if (req.body.choice == 'a') {
    winId = req.match.submissionA;
    lossId = req.match.submissionB;
  } else if (req.body.choice == 'b'){
    winId = req.match.submissionB;
    lossId = req.match.submissionA;
  } else {
    res.status(400).send('screw off');
  }
  Submission.find({_id: { $in: [winId, lossId] }}).then(function(submissions) {
    var winSub = submissions[0];
    var lossSub = submissions[1];

    var rating0 = winSub.rating();
    var rating1 = lossSub.rating();

    winSub.opponentRatingSum += rating1;
    lossSub.opponentRatingSum += rating0;

    winSub.numWins += 1;
    lossSubs.numLosses += 1;

    winSub.numMatches += 1;
    lossSub.numMatches += 1;

    var saves = [
      winSub.save(),
      lossSub.save()
    ];
    Promise.all(saves).then(function(subs) {
      Judge.update(
        {_id: req.payload._id,},
        {$pull: {currentMatches: req.match._id}}
      ).then(function() {
        return Judge.update(
          {_id: req.payload._id},
          {$push: {previousMatches: req.match._id}}
        ).then(function() {
          res.send('I\'m done.');
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

module.exports = router;
