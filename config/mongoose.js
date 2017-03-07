var mongoose =  require('mongoose');
var config = require('./config');

module.exports = function(){
	var db = mongoose.connect(config.db);
	require('../server/models/campaignModel');
	require('../server/models/tagModel');
	require('../server/models/townModel');

	return db;
}