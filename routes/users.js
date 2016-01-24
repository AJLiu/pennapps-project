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

router.post('/register', function(req, res, next) {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({
            message: 'Please fill out all fields'
        });
    }

    var user = new User();

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
    User.findOne({
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
        competitions: req.body.competitions,
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
    if (req.body.competitions)
        update.competitions = req.body.competitions;

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

router.param('id', function(req, res, next, id) {
	User.findOne({_id: id}).then(function(user) {
		req.user = user;
		return next();
	}, function(error) {
		res.status(400).send(error);
	});
});

router.get('/:id/competitions/current', function(req, res, next) {
  var date = new Date();
  Competition.find({
    _id: { $in: req.user.competitions },
    start_date: { $lt: date },
    end_date: { $gt: date }
  }).then(function(competitions) {
    res.send(competitions);
  }, function(error) {
    res.status(400).send(error);
  });
});

router.get('/:id/competitions/past', function(req, res, next) {
  var date = new Date();
  Competition.find({
    _id: { $in: req.user.competitions },
    end_date: { $lt: date }
  }).then(function(competitions) {
    for (var i=0; i<competitions.length; i++) {
      competitions[i].prompt+="\nNOTE: THIS EVENT IS OVER.";
    }
    res.send(competitions);
  }, function(error) {
    res.status(400).send(error);
  });
});

router.get('/:id/competitions/upcoming', function(req, res, next) {
  var date = new Date();
  Competition.find({
    _id: { $in: req.user.competitions },
    start_date: { $gt: date },
  }).then(function(competitions) {
    for (var i=0; i<competitions.length; i++) {
      competitions[i].prompt = "Come back later";
    }
    res.send(competitions);
  }, function(error) {
    res.status(400).send(error);
  });
});

module.exports = router;
