var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TownSchema = new Schema({
	name: String
});

mongoose.model('Town', TownSchema);