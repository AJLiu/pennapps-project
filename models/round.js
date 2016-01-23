var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var RoundSchema = Schema({
    submissions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Submission'}],
    numJudges: Number,
    numPeriods: Number,
    currentPeriod: Number,
    active: Boolean,
    votes: [vote],
    remaining: [String],
	competition: {type: mongoose.Schema.Types.ObjectId, ref: 'Competition'}
});

var Round = mongoose.model('Round', RoundSchema);
module.exports = Round;
