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
     * Playing with data
     * Create a WOD based on Firebase data
     */
    //Arrays to hold exercise objects
    var coreWorkout = [];
    var upperWorkout = [];
    var lowerWorkout = [];

  //loop through db
  //   for (var i=0; i<30; i++) {
  //     //search for 'core'
  //     // $scope.data.Exercises.indexOf('Core');
  //     //push to coreWorkout
  //
  //     if ($scope.data.Exercises[i].Section.indexOf('Core')) {
  //       console.log(coreWorkout);
  //       // coreWorkout.push($scope.data.Exercises[i]);
  //     }
  //   }

    // console.log(coreWorkout);

    // pull random objects from exercise array with Section: Core
    // Loop through DB for length of DB, looking for Section Core
    // Add each object to Array Workout




    /**
     * Setting underline under active Circuit
     */
    //Set visibility for Circuits
    $scope.showCircuit1 = true;
    $scope.showCircuit2 = false;

    //Set visibility for underline on Circuit 2
    $scope.circuit2Underline = {
      'background-color': 'transparent'
    };

    $scope.circuit1= function() {
      //when button for circuit1 is clicked, hide cir2, show cir1
      $scope.showCircuit1 = true;
      $scope.showCircuit2 = false;
      console.log('cir1 function run');

      //TODO this is the slow way. should have a toggle in HTML
      // Show underline under active Circuit
      $scope.circuit2Underline = {
        'background-color': 'transparent'
      };
      $scope.circuit1Underline = {
        'background-color': '$indigo'
      };
    };

    $scope.circuit2 = function() {
      //when circuit2 is clicked, hide 1, show 2
      $scope.showCircuit1 = false;
      $scope.showCircuit2 = true;

      // Show underline under active Circuit
      $scope.circuit2Underline = {
        'background-color': '$indigo'
      };
      $scope.circuit1Underline = {
        'background-color': 'transparent'
      };
    };

    /**
     * Show workout demo image
     */
    $scope.showDemo = false;

    //when parent workout-item is clicked, show child workout-visual


    /**
     * TODO Next exercise
     * User can reject an exercise and get a new suggestion
     */
    $scope.next_Exercise = function() {
      // Call database and get another suggestion from same body category
      console.log("clicked icon");
    };

    /**
     * See Demo when user clicks Exercise
     */
    $scope.seeDemo = function() {
      console.log('clicked workout');
      // change toggle state for img
      $scope.showDemo = !$scope.showDemo;
    };


  }

]);
