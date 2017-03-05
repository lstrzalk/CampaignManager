angular.module('tags').service('tagsService',function(){
	this.loadTags = function(){
	    var tags = localStorage.getItem("tags");
	    if(!tags){
	    	var initTags = [{value: 'Stalin', category: 'Person'},
							{value: 'Kirov', category: 'Person'},
							{value: 'Hitler', category: 'Person'},
							{value: 'Żukow', category: 'Person'},
							{value: 'CCCP', category: 'Country'},
							{value: 'Sojuz Sowietskich Socjalisticzeskich Riespublik', category: 'Country'},
							{value: 'Stalingrad', category: 'Town'},
							{value: 'KC', category: 'Bad People'},
							{value: 'Nazist', category: 'Bad People'},
							{value: 'Cottage', category: 'Place'},
							{value: 'Ukraine', category: 'Country'},
							{value: 'Belarus', category: 'Country'},
							{value: 'Minsk', category: 'Town'},
							{value: 'Kiev', category: 'Town'},
							{value: 'Trocki', category: 'Person'},
							{value: 'Mexico', category: 'Country'}];
			localStorage.setItem("tags", JSON.stringify(initTags));//Have to stringfy array becouse local storage is only key : value pair, so all array have to be string
			tags = localStorage.getItem("tags");
	    }
	    return JSON.parse(tags).map(function(tag){//Have to parese data becouse as above
			tag.key = tag.value.toLowerCase();//pair key value to prevent double tags with another case sensitive i.e. CCCP cccp Cccp
			return tag;
		});
	}
	this.getTagByValue = function(value){//To easier mocking campaigns objects
		var tags = this.loadTags();
    	for(var i=0;i<tags.length;i++){
    		if(tags[i].value === value){
    			return tags[i];
    		}
    	}
	}	
	this.createTag = function(val, cat){
		var tags = JSON.parse(localStorage.getItem("tags"));
		tags.push({value : val, category : cat});
		localStorage.setItem("tags", JSON.stringify(tags));
		return {value : val, category : cat, key : val.toLowerCase()};
	}	
});