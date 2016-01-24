var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MatchSchema = Schema({
    submissionA : {type: mongoose.Schema.Types.ObjectId, ref: 'Submission'},
    submissionB : {type: mongoose.Schema.Types.ObjectId, ref: 'Submission'},
    judge: {type: mongoose.Schema.Types.ObjectId, ref: 'Judge'}
});

var Match = mongoose.model('Match', MatchSchema);
module.exports = Match;
