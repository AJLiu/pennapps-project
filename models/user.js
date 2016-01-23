var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    grade: {type: Number, required: true},

    school: {type: Number, required: true}, // points to school
    live_competitions: [Number], // points to competition
    past_competitions: [Number]  // points to competition
});

var User = mongoose.model('User', userSchema);
module.exports = User;
