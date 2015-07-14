// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var taxi = angular.module('taxi', ['ngCordova','ionic', 'ngStorage', 'pusher-angular', 'ngResource', 'google.places','ngCordova','leaflet-directive']);

taxi.run(function ($ionicPlatform, $state, $rootScope) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
        if (window.localStorage.getItem("ngStorage-phone") === null || window.localStorage.getItem("ngStorage-phone") === "" || window.localStorage.getItem("ngStorage-phone") === undefined)
        {
            $rootScope.hideTabs = true;
            $state.go('check');
        } else {

            $state.go('home');
        }
    });
});

taxi.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $stateProvider
            .state('home', {
                cache: false,
                url: '/',
                templateUrl: 'pages/home.html'
            })
            .state('check', {
                cache: true,
                url: '/check',
                templateUrl: 'pages/check.html',
                controller: 'Check'
            })
            .state('history', {
                cache: false,
                url: '/history',
                templateUrl: 'pages/history.html'
            });

    //  $urlRouterProvider.otherwise('/check');
    $ionicConfigProvider.tabs.position("bottom"); //Places them at the bottom for all OS
    $ionicConfigProvider.tabs.style("standard"); //Makes them all look the same across all OS
    window.client = new Pusher('69184d320f45f3ebdd06');
});