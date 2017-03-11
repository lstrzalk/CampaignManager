var express = require('express');
var morgan = require("morgan");
var bodyParser = require("body-parser");
var path = require("path");
var config = require("./config")

module.exports = function(){
	var app = express();
	app.use(bodyParser.json());
	app.set('views', './server/views');
	app.engine('html', require('ejs').renderFile);
	app.set('view engine', 'html');
	require('../server/routes/indexRoute.js')(app);
	require('../server/routes/campaignRoute.js')(app);
	app.use(express.static('client'));

	return app;
}