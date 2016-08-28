'use strict';

/**
 * @ngdoc service
 * @name magicMissionAppApp.myservice
 * @description
 * # myservice
 * Service in the magicMissionAppApp.
 */
 function checkTime(i) {
     i = (i < 1) ? 0 : i;
     if (i < 10) i = "0" + i;  // add zero in front of numbers < 10
     return i;
 }

 var tmPromise, myApp = angular.module('myroute',[]);

 /**
  * @ngservice initService
  * @param $rootScope
  */
angular.module('magicMissionAppApp')
  .service('myservice', function ($rootScope) {
    // AngularJS will instantiate a singleton by calling "new" on this function
      //initialize schedule list
      this.timeSchedule = {
          history: []
      };
  });
