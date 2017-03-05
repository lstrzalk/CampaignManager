angular.module('campaigns').controller('campaignCtrl', function($scope,$mdDialog,campaignsService, townsService, tagsService){
    $scope.campaignForm = {};//For submit button outside form to disable if data is not valid
    $scope.company={};//Company Funds holder
    $scope.company.fund = campaignsService.getCompanyFunds();
    $scope.campaigns = campaignsService.loadCampaigns();//For List all campaigns
    $scope.chooseCampaign = function(campaign){
        $scope.campaign = campaign;
    };
    $scope.deleteCampaign = function(campaign, ev){
        var confirm = $mdDialog.confirm()
          .title('Would you like to delete campaign?')
          .textContent('You will loose all your data')
          .targetEvent(ev)
          .ok('yes')
          .cancel('no');
        $mdDialog.show(confirm).then(function() {
            if(campaignsService.getCampaignPositionById(campaign.id) !== -1){
                $scope.campaigns = campaignsService.delete(campaign);
            }
            if(campaign === $scope.campaign){
                $scope.campaign = null;
            }
            }, function() {
             
            });
        
    };
    $scope.editCampaign = function(campaign){
        $scope.campaign = campaign;
        var originalFund = campaign.fund;
        $scope.company.updatedFund = campaignsService.getCompanyFunds()
        $scope.$watch('campaign.fund', function() {
            $scope.company.updatedFund = campaignsService.getCompanyFunds()+(originalFund - $scope.campaign.fund );
        });
        campaign.edit = true;
    }
    $scope.saveCampaign = function(campaign){
        if(campaignsService.checkCampaignName(campaign)){
            campaignsService.updateCompanyFunds($scope.company.updatedFund);
            campaign.edit = false;
            if(campaignsService.getCampaignPositionById(campaign.id) === -1){
                $scope.campaigns = campaignsService.save(campaign);
            }
        }
        else{
            $mdDialog.show(
                $mdDialog.alert()
                .clickOutsideToClose(true)
                .title('Name '+campaign.name+' is already used')
                .textContent('Insert another one')
                .ok('close')
            );
        }
    }
    $scope.createCampaign = function(){
        $scope.campaign = {id : -1,status : 'off', keywords : [], bidAmount : 1, fund: 1, radius: 1, edit: true};
        $scope.company.updatedFund = campaignsService.getCompanyFunds()-$scope.campaign.fund;
        $scope.$watch('campaign.fund', function() {
            $scope.company.updatedFund = campaignsService.getCompanyFunds()-$scope.campaign.fund;
        });
        $scope.campaign.edit = true;
    }
    $scope.findTowns = function(town){//Match towns for autocomplete
        return town ? townsService.loadTowns().filter(townsFilter(town)) : townsService.loadTowns();
    }
    $scope.findTags = function(tag){//Match tags for autocomplete
        return tag ? tagsService.loadTags().filter(tagsFilter(tag)) : tagsService.loadTags();
    }
    $scope.addTown = function(town){
        $scope.campaign.town = townsService.createTown(town);
    }
    $scope.addTag = function(tag,ev){
        var self = this;
        $mdDialog.show({// dialog for adding new keywords
            targetEvent: ev,
            template:
               '<md-dialog >' +
               '  <md-dialog-content>'+
               '    <md-content flex layout-padding>'+
               '        <form name="tagForm">'+
               '            <md-input-container class="md-block">'+
               '                <label>Tag Name</label>'+
               '                <input required type="text" name="tagName" ng-model="tag.value" minlength="1" maxlength="100"/>'+
               '                <div ng-messages="tagForm.tagName.$error" role="alert">'+
               '                    <div ng-message-exp="["required", "minlength", "maxlength"]">'+
               '                        Tag name must be between 1 and 100 characters long.'+
               '                    </div>'+
               '                </div>'+
               '            </md-input-container>'+
               '            <md-input-container class="md-block">'+
               '                <label>Tag Category</label>'+
               '                <input required type="text" name="tagCategory" ng-model="tag.category" minlength="1" maxlength="100"/>'+
               '                <div ng-messages="tagForm.tagCategory.$error" role="alert">'+
               '                    <div ng-message-exp="["required", "minlength", "maxlength"]">'+
               '                        Tag category must be between 1 and 100 characters long.'+
               '                    </div>'+
               '                </div>'+
               '            </md-input-container>'+
               '        </form>'+
               '    </md-content>'+
               '  </md-dialog-content>' +
               '  <md-dialog-actions>' +
               '    <md-button ng-click="confirm()" class="md-primary" ng-disabled = "tagForm.$invalid">' +
               '      Save' +
               '    </md-button>' +
               '    <md-button ng-click="closeDialog()" class="md-primary">' +
               '      Close' +
               '    </md-button>' +
               '  </md-dialog-actions>' +
               '</md-dialog>',
            controller: tagCtrl
        });
        function tagCtrl($scope, $mdDialog) {
            $scope.tag = {};
            $scope.tag.value = tag;
            $scope.confirm = function(){
                self.campaign.keywords.push(tagsService.createTag($scope.tag.value,$scope.tag.category))
                $mdDialog.hide();
            }
            $scope.closeDialog = function() {
                $mdDialog.hide();
            }
        }   
    }
    function townsFilter(query) {//Filter for towns autocomplete
        return function filterFn(town) {
            return (town.key.indexOf(angular.lowercase(query)) === 0);
        };
    }
    function tagsFilter(query) {//Filter for tags autocomplete
        return function filterFn(tag) {
            return (tag.key.indexOf(angular.lowercase(query)) === 0);
        };
    }
});
