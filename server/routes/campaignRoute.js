var campaign = require('../controllers/campaignController');
module.exports = function(app){
	app.route('/save').post(campaign.create);
}