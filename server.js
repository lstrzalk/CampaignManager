process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var mongoose = require("./config/mongoose.js");
var express = require("./config/express.js");

var db = mongoose();
var app = express();
app.listen(3000);
module.exports = app;