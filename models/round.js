var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var RoundSchema = Schema({
  matches: [{type: mongoose.Schema.Types.ObjectId, ref: 'Match'}],
	competition: {type: mongoose.Schema.Types.ObjectId, ref: 'Competition'}
});

var Round = mongoose.model('Round', RoundSchema);
module.exports = Round;
