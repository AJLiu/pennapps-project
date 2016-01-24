var mongoose = require('mongoose');
var crypto = require('crypto');

var Schema = mongoose.Schema;

var JudgeSchema = Schema({
	first_name: String,
	last_name: String,
	email: String,
	hash: String,
	salt: String,

	previousMatches: [{type: mongoose.Schema.Types.ObjectId, ref: 'Match'}],
	currentMatches: [{type: mongoose.Schema.Types.ObjectId, ref: 'Match'}]
});

JudgeSchema.methods.setPassword = function(password) {
	this.salt = crypto.randomBytes(16).toString('hex');
	this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

JudgeSchema.methods.validPassword = function(password) {
	var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
	return this.hash === hash;
};

JudgeSchema.methods.generateJWT = function() {

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

var Judge = mongoose.model('Judge', JudgeSchema);
module.exports = Judge;
