var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TagSchema = new Schema({
	value: String,
	category:String
});

mongoose.model('Tag', TagSchema);