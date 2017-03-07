var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CampaignSchema = new Schema({
	name: String, 
	product : String, 
	status : Boolean, 
	keywords : [Schema.Types.ObjectId], 
	bidAmount : Number, 
	fund: Number, 
	town: Schema.Types.ObjectId, 
	radius: Number
});

mongoose.model('Campaign', CampaignSchema);