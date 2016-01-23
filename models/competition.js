var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CompetitionSchema = new Schema({
    name: String,
    start_date: Date,
    end_date: Date,
    prompt: String,
    participants: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    submissions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Submission'}]
});

var Competition = mongoose.model('Competition', CompetitionSchema);
module.exports = Competition;
