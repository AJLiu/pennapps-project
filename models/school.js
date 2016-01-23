var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SchoolSchema = new Schema({
    school_name: {type:String, requred:true},
    students:[{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
});

var School = mongoose.model('School', SchoolSchema);
