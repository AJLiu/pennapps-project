var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SubmissionSchema = new Schema({
    competition: {type: mongoose.Schema.Types.ObjectId, ref: 'Competition', required: true},
    student: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    link: {type: String, required: true},
    opponentRatingSum: Number,
    numMatches: Number,
    numWins: Number,
    numLosses: Number
});

SubmissionSchema.methods.rating = function() {
	return (this.opponentRatingSum + 400*(this.numWins - this.numLosses)) / this.numMatches;
};

var Submission = mongoose.model('Submission', SubmissionSchema);
module.exports = Submission;
