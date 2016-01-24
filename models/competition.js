var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CompetitionSchema = new Schema({
    name: {type: String, required: true},
	  description: {type: String, required: true},
    start_date: {type: Date, required: true},
    end_date: {type: Date, required: true},
    prompt: {type: String, required: true},
    image: {type: String, required: true},
    students: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    submissions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Submission'}]
});

var Competition = mongoose.model('Competition', CompetitionSchema);
module.exports = Competition;
