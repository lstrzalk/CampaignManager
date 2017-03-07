var Campaign = require('mongoose').model('Campaign');

exports.create = function(req, res){
	var campaign = new Campaign(req.body);
	user.save(function(err){
		if(err){
			return next(err);
		}else{
			res.json(user);
		}
	});
};