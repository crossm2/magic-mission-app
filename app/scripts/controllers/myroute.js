'use strict';

/**
 * @ngdoc function
 * @name magicMissionAppApp.controller:MyrouteCtrl
 * @description
 * # MyrouteCtrl
 * Controller of the magicMissionAppApp
 */
angular.module('magicMissionAppApp')
  /**
   *  @ngcontroller cbTimerCtrl
   *  @params  $scope, $timeout, $initService
   *  handle toggling between modes, and binding data
   */
  myApp.controller('MyrouteCtrl', ['$scope', '$timeout','myservice', function ($scope, $timeout, myservice) {

      $scope.timeStart = 0;
      $scope.timeEnd = 0;
      $scope.timeSchedule = myservice.timeSchedule;
      $scope.mode = "Start";
      $scope.timer = "00:00:00";

      /**
       *  @func $scope.startTimer
       *  trigger timer to start,
       *  recursive, call again when timer expires
       */
      $scope.startTimer = function () {
          // toggle
          $scope.mode = "Stop";

          // compute for the duration,
          // normalize for the user
          var today = new Date();
          $scope.timeEnd = today.getTime();
          var ms = Math.floor(($scope.timeEnd - $scope.timeStart)/1000);
          var h =  checkTime(Math.floor(ms/3600));
              ms = Math.floor(ms%3600);
          var m = checkTime(Math.floor(ms/60));
              ms = Math.floor(ms%60);
          var s = checkTime(Math.floor(ms));
          // normalize time string
          $scope.timer = h + ":" + m + ":" + s;

          // timer expired, restart timer
          tmPromise = $timeout(function () {
              $scope.startTimer();
          }, 500);

      };

      /**
       * @func $scope.stopTimer
       * handle end of timer
       */
      $scope.stopTimer = function () {
          var dt = new Date();

          // toggle
          $scope.mode = "Start";

          // stop timeout service
          $timeout.cancel(tmPromise);

          // add to history
          $scope.timeSchedule.history.push([$scope.timeStart,
                                            $scope.timeEnd,
                                            ($scope.timeEnd-$scope.timeStart)/1000]);
      };

      /**
       *  @func $scope.toggleTimer
       *  toggle between modes
       */
      $scope.toggleTimer = function () {

          // handle modes
          if ($scope.mode === 'Start') {
              var today = new Date();
              $scope.timeStart = today.getTime(),
              $scope.startTimer();
          } else {
              $scope.stopTimer();
          }

      };


  }]);
