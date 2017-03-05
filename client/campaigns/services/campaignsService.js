angular.module('campaigns').service('campaignsService',['townsService','tagsService',function (townsService, tagsService) {
	this.loadCampaigns = function(){
	    var campaigns = localStorage.getItem("campaigns");
	    if(!campaigns){//If campaigns are not in localStorage then push them there
	    	var initCampaigns = [{id : 1, name: 'Kill Kirov', product : 'who knows why', status : 'on', keywords : [tagsService.getTagByValue("Stalin"), tagsService.getTagByValue("Kirov"), tagsService.getTagByValue("CCCP"), tagsService.getTagByValue("Sojuz Sowietskich Socjalisticzeskich Riespublik"),tagsService.getTagByValue("Stalingrad")], bidAmount : 10, fund: 10000, town: townsService.getTownByValue("Moskau"), radius: 300, edit: false},
								{id : 2, name: 'Kill Stalin', product : 'provocation', status : 'on', keywords : [tagsService.getTagByValue("Stalin"),tagsService.getTagByValue("CCCP"), tagsService.getTagByValue("Sojuz Sowietskich Socjalisticzeskich Riespublik")], bidAmount : 10, fund: 10000, town: townsService.getTownByValue("Moskau"), radius: 300, edit: false},
								{id : 3, name: 'Kill Trocki', product : 'always remember', status : 'off', keywords : [tagsService.getTagByValue("Stalin") , tagsService.getTagByValue("CCCP"), tagsService.getTagByValue("Sojuz Sowietskich Socjalisticzeskich Riespublik")], bidAmount : 10, fund: 10000, town: townsService.getTownByValue("Moskau"), radius: 300, edit: false},
								{id : 4, name: 'Collectivization', product : 'kill many people', status : 'on', keywords : [tagsService.getTagByValue("Stalin"), tagsService.getTagByValue("CCCP"), tagsService.getTagByValue("Sojuz Sowietskich Socjalisticzeskich Riespublik"), tagsService.getTagByValue("Cottage")], bidAmount : 10, fund: 10000, town: townsService.getTownByValue("Moskau"), radius: 300, edit: false},
								{id : 5, name: 'No, Germany won\'t attack us', product : 'Stalin the great', status : 'on', keywords : [tagsService.getTagByValue("Stalin"), tagsService.getTagByValue("Nazist"), tagsService.getTagByValue("CCCP"), tagsService.getTagByValue("Sojuz Sowietskich Socjalisticzeskich Riespublik"), tagsService.getTagByValue("Stalingrad"), tagsService.getTagByValue("Hitler"), tagsService.getTagByValue("Żukow")], bidAmount : 10, fund: 10000, town: townsService.getTownByValue("Moskau"), radius: 300, edit: false},
								{id : 6, name: 'Exterminate officers in army', product : 'We will win!', status : 'on', keywords : [tagsService.getTagByValue("Stalin"), tagsService.getTagByValue("CCCP"), tagsService.getTagByValue("Sojuz Sowietskich Socjalisticzeskich Riespublik")], bidAmount : 10, fund: 10000, town: townsService.getTownByValue("Moskau"), radius: 300, currency: 'pounds', edit: false},
								{id : 7, name: 'Brothers Help to Ukraine and Belarus', product : 'Nazi Killers', status : 'on', keywords : [tagsService.getTagByValue("Stalin"), tagsService.getTagByValue("Ukraine"), tagsService.getTagByValue("Belarus"), tagsService.getTagByValue("Minsk"), tagsService.getTagByValue("Kiev"),tagsService.getTagByValue("CCCP"), tagsService.getTagByValue("Sojuz Sowietskich Socjalisticzeskich Riespublik")], bidAmount : 10, fund: 10000, town: townsService.getTownByValue("Moskau"), radius: 300, edit: false},
								{id : 8, name: 'very very very very very very  long campaign name', product : 'Nazi Killers', status : 'on', keywords : tagsService.loadTags(), bidAmount : 10, fund: 10000, town: townsService.getTownByValue("Moskau"), radius: 300, edit: false}];
			localStorage.setItem("campaigns", JSON.stringify(initCampaigns));
			campaigns = localStorage.getItem("campaigns");
	    }
	    return JSON.parse(campaigns);
	}
    this.save = function (campaign) {
      var campaigns = this.loadCampaigns();
      campaign.id = this.getId();
      campaigns.push(campaign);
      localStorage.setItem("campaigns", JSON.stringify(campaigns));
      return campaigns;
    };
    this.delete = function (campaign) {
    	var campaigns = this.loadCampaigns();
        var i = this.getCampaignPositionById(campaign.id)
        campaigns.splice(i,1);
        localStorage.removeItem("campaigns");
        localStorage.setItem("campaigns", JSON.stringify(campaigns));
        return campaigns;
    };
    this.update = function(campaign){
    	var campaigns = this.loadCampaigns();
    	campaigns.splice(this.getCampaignPositionById(campaign),1);
    	campaigns.push(campaign);
      	localStorage.setItem("campaigns", JSON.stringify(campaigns));
    };
    this.getId = function(){//To give new campaign new, unique id, primitive becouse won't give deleted campaigns id but it's not task subject
		var lastGivenId = localStorage.getItem("lastGivenId");
		var campaigns = this.loadCampaigns();
		if(!lastGivenId){
			var max = 0;
			for (var i = 0; i < campaigns.length; i++) {
				if(campaigns[i].id > max){
					max = campaigns[i].id;
				}
			};
			localStorage.setItem("lastGivenId", max + 1);
			return max+1;
		}
		localStorage.setItem("lastGivenId", parseInt(lastGivenId + 1));
		return parseInt(lastGivenId + 1)
    };
    this.getCompanyFunds = function(){
    	var funds = localStorage.getItem("funds");
    	if(!funds){
    		var campaigns = this.loadCampaigns();
    		var sum = 0;
			for (var i = 0; i < campaigns.length; i++) {
				sum += campaigns[i].fund;
			}
			return sum * 10;
    	}
    	return parseInt(funds);
    }
    this.updateCompanyFunds = function(fund){
    	var last = localStorage.getItem("funds");
    	localStorage.setItem("funds", fund);
    }
    this.getCampaignPositionById = function(id){//To Check if Campaign is on Campaings list
    	var campaigns = this.loadCampaigns();
    	for(var i=0;i<campaigns.length;i++){
    		if(campaigns[i].id === id){
    			return i;
    		}
    	}
    	return -1;
    }
    this.checkCampaignName = function(campaign){//To Check if campaign name is not already used to prevent duplicates
    	var campaigns = this.loadCampaigns();
    	for(var i=0;i<campaigns.length;i++){
    		if(campaigns[i].name === campaign.name && campaigns[i].id !== campaign.id){
    			return false;
    		}
    	}
    	return true;
    }

}]);