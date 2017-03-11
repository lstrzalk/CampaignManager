module.exports = function(app){
	var campaign = require('../controllers/campaignController');
	app.route('/save').post(campaign.create);
}