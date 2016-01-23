var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    school: {type: String, required: true},
    grade: {type: Number, required: true},
    live_competitions: [String],
    past_competitions: [String]
});

var User = mongoose.model('User', userSchema);
module.exports = User;
