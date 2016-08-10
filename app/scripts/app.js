'use strict';

/**
 * @ngdoc overview
 * @name magicMissionAppApp
 * @description
 * # magicMissionAppApp
 *
 * Main module of the application.
 */
 var myApp = angular.module('magicMissionAppApp',
   [
     'ngAnimate',
     'ngCookies',
     'ngMessages',
     'ngResource',
     'ngRoute',
     'ngSanitize',
     'ngTouch',
     'firebase',
     'firebase.ref',
     'firebase.auth'
   ])

   .constant('FIREBASE_URL', 'https://magic-muscle-mission.firebaseio.com/');


   myApp.config(function ($routeProvider) {
     $routeProvider
       .when('/', {
         templateUrl: 'views/login.html',
         controller: 'LoginCtrl'
       })
       .when('/register', {
         templateUrl: 'views/register.html',
         controller: 'RegistrationController'
       })
       .when('/main', {
         templateUrl: 'views/main.html',
         controller: 'MainCtrl',
         controllerAs: 'main',
         resolve: {
           currentAuth: function(Authentication) {
             return Authentication.requireAuth();
           }//current Auth
         }//resolve
       })
       .when('/chat', {
         templateUrl: 'views/chat.html',
         controller: 'chatCtrl',
         controllerAs: 'chat'
       })
       .when('/account', {
         templateUrl: 'views/account.html',
         controller: 'accountCtrl',
         controllerAs: 'account'
       })

       .when('/about', {
         templateUrl: 'views/about.html',
         controller: 'AboutCtrl',
         controllerAs: 'about'
       })

       .when('/browse', {
         templateUrl: 'views/browse.html',
         controller: 'BrowseCtrl',
         controllerAs: 'browse'
       })

       .otherwise({
         redirectTo: '/'
       });
   });
