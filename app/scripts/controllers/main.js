'use strict';

/**
 * @ngdoc function
 * @name magicMissionAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the magicMissionAppApp
 */
 angular.module('magicMissionAppApp')
.controller("MainCtrl", ["$scope", "$firebaseArray","$firebaseObject",
  function($scope, $firebaseArray, $firebaseObject) {

    var ref = new Firebase("https://magic-muscle-mission.firebaseio.com");
    $scope.data = $firebaseObject(ref);
    console.log($scope.data);

    // The obj variable will appear to be empty here and won't contain any remote data,
    // because the request to the server has not returned when we reach this line.
    /**
     * Change visibility for Circuits
     * @type {boolean}
     */

    //Set state for visibility for Circuits
    $scope.showCircuit1 = true;
    $scope.showCircuit2 = false;

    $scope.circuit_1= function() {
      //when button for circuit1 is clicked, hide cir2, show cir1
      $scope.showCircuit1 = true;
      $scope.showCircuit2 = false;
    };

    $scope.circuit_2 = function() {
      //when circuit2 is clicked, hide 1, show 2
      $scope.showCircuit1 = false;
      $scope.showCircuit2 = true;
    };

    /**
     * Show workout demo image
     */
    $scope.showDemo = false;

    //when parent workout-item is clicked, show child workout-visual


    /**
     * Next exercise
     * User can reject an exercise and get a new suggestion
     */
    $scope.next_Exercise = function() {
      // Call database and get another suggestion from same body category
      console.log("clicked icon");
    };

    /**
     * See Demo when user clicks Exercise
     */
    $scope.see_Demo = function() {
      console.log('clicked workout');
      // change toggle state for img
      $scope.showDemo = !$scope.showDemo;
    };


  }

]);
