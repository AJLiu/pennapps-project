var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Competition = mongoose.model('Competition');
var School = mongoose.model('School');
var Submission = mongoose.model('Submission');
var User = mongoose.model('User');

/* GET users listing. */
router.get('/', function(req, res, next) {

    User.find(function(err, users) {
        if (err) {
            console.error(err);
            res.send(err);
        }
        res.json(users);
    });
});

router.get('/:id', function(req, res, next) {
    User.find({_id: req.param('id')}, function(err, user) {
        if (err) {
            console.error(err);
            res.send(err);
        }
        res.json(user);
    });
});

module.exports = router;
