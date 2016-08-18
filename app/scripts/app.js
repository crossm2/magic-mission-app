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



     // This is called with the results from from FB.getLoginStatus().
     function statusChangeCallback(response) {
       console.log('statusChangeCallback');
       console.log(response);
       // The response object is returned with a status field that lets the
       // app know the current login status of the person.
       // Full docs on the response object can be found in the documentation
       // for FB.getLoginStatus().
       if (response.status === 'connected') {
         // Logged into your app and Facebook.
         testAPI();
       } else if (response.status === 'not_authorized') {
         // The person is logged into Facebook, but not your app.
         document.getElementById('status').innerHTML = 'Please log ' +
           'into this app.';
       } else {
         // The person is not logged into Facebook, so we're not sure if
         // they are logged into this app or not.
         document.getElementById('status').innerHTML = 'Please log ' +
           'into Facebook.';
       }
     }

     // This function is called when someone finishes with the Login
     // Button.  See the onlogin handler attached to it in the sample
     // code below.
     function checkLoginState() {
       FB.getLoginStatus(function(response) {
         statusChangeCallback(response);
       });
     }

     window.fbAsyncInit = function() {
     FB.init({
       appId      : '1149221148476641',
       cookie     : true,  // enable cookies to allow the server to access
                           // the session
       xfbml      : true,  // parse social plugins on this page
       version    : 'v2.5' // use graph api version 2.5
     });

     // Now that we've initialized the JavaScript SDK, we call
     // FB.getLoginStatus().  This function gets the state of the
     // person visiting this page and can return one of three states to
     // the callback you provide.  They can be:
     //
     // 1. Logged into your app ('connected')
     // 2. Logged into Facebook, but not your app ('not_authorized')
     // 3. Not logged into Facebook and can't tell if they are logged into
     //    your app or not.
     //
     // These three cases are handled in the callback function.

     FB.getLoginStatus(function(response) {
       statusChangeCallback(response);
     });

     };

     // Load the SDK asynchronously
     (function(d, s, id) {
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) return;
       js = d.createElement(s); js.id = id;
       js.src = "//connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));


     // Here we run a very simple test of the Graph API after login is
     // successful.  See statusChangeCallback() for when this call is made.
     function testAPI() {
       console.log('Welcome!  Fetching your information.... ');
       FB.api('/me', function(response) {
         console.log('Successful login for: ' + response.name);
         document.getElementById('status').innerHTML =
           'Thanks for logging in, ' + response.name + '!';
       });
     }


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
