var app = angular.module('campaignManager', ['ngRoute', 'ngMaterial','ngMessages','towns','tags','campaigns']);
app.config(function($routeProvider){
  $routeProvider
      .when('/', {
          templateUrl:"../../client/campaigns/views/campaign.html",
          controller:'campaignCtrl'});
});
