var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SchoolSchema = new Schema({
    school_name: {type:String, requred:true},
    students:[{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    live_competitions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Competition'}], // points to competition
    past_competitions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Competition'}]  // points to competition
});

var School = mongoose.model('School', SchoolSchema);
