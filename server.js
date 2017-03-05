var express = require("express");
var path = require("path");
var app = express();

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static('client'));

app.route('/').get(function(req,res){
	res.render(path.join(__dirname,'server','views','index'));
});
app.listen(3000);