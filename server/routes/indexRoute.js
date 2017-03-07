module.exports = function(app){
	var index = require('../controllers/indexController.js');
	app.get('/', index.render);
}