angular.module('towns').service('townsService',function(){
	this.loadTowns = function(){
	    var towns = localStorage.getItem("towns");
	    if(!towns){
	    	var initTowns = ['Moskau', 'Leningrad', 'Stalingrad', 'Tula', 'Orzel', 'Alma-Aty', 'Murmansk', 'Wladiwostock'];
			localStorage.setItem("towns", JSON.stringify(initTowns));
			towns = localStorage.getItem("towns");
	    }
	    return JSON.parse(towns).map(function(town){
			return{
				key : town.toLowerCase(),//pair key value to prevent double towns with another case sensitive i.e. Moskau moskau mOskau
				value : town
			};
		});
	}
	this.getTownByValue = function(value){//To easier mocking campaigns objects
		var towns = this.loadTowns();	
    	for(var i=0;i<towns.length;i++){
    		if(towns[i].value === value){
    			return towns[i];
    		}
    	}
	}
	this.createTown = function(town){
		var towns = JSON.parse(localStorage.getItem("towns"));
		towns.push(town);
		localStorage.setItem("towns", JSON.stringify(towns));
		return {key : town.toLowerCase(), value : town};
	}	
});