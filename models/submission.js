var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SubmissionSchema = new Schema({
    competition: {type: mongoose.Schema.Types.ObjectId, ref: 'Competition', required: true},
    student: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    link: {type: String, required: true}
});

var Submission = mongoose.model('Submission', SubmissionSchema);
module.exports = Submission;
