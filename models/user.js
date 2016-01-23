var mongoose = require('mongoose');
var crypto = require('crypto');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    hash: {type: String, required: true},
    salt: {type: String, required: true},
    grade: {type: Number, required: true},
    school: {type: mongoose.Schema.Types.ObjectId, ref: 'School'},
    // school: {type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true}, // points to school
    live_competitions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Competition'}], // points to competition
    past_competitions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Competition'}]  // points to competition
});

UserSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

UserSchema.methods.validPassword = function(password) {
	var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
	return this.hash === hash;
};

UserSchema.methods.generateJWT = function() {

	// set expiration to 60 days
	var today = new Date();
	var exp = new Date(today);
	exp.setDate(today.getDate() + 60);

	return jwt.sign({
		_id: this._id,
		username: this.username,
		exp: parseInt(exp.getTime() / 1000)
	}, 'SECRET');
};

var User = mongoose.model('User', UserSchema);
