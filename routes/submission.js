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

module.exports = router;
