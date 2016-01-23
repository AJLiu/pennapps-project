var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var VoteSchema = Schema({
    teamA : String,
    teamB : String,
    better : Boolean // whether team A is better than team B
});

var Vote = mongoose.model('Vote', VoteSchema);
module.exports = Vote;
