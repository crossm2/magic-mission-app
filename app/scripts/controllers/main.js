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
    var exercisesDatabase = [];
    var coreWorkout = [];
    var upperWorkout = [];
    var lowerWorkout = [];
    var todaysWorkout = [];
    var circuitOneArray = [];
    var circuitTwoArray = [];

    //Fetch all exercises, put into array exercisesDatabase
    ref.on("child_added", function(snapshot, prevChildKey) {
      var newPost = snapshot.val();
      //Loop through each property of Exercises
      for (var i in newPost) {
        // console.log(newPost[i].Title);
        exercisesDatabase.push(newPost[i]);
      }
      //Fill arrays for Upper, Lower, Core
      for (var exerciseKey in exercisesDatabase) {
        if (exercisesDatabase[exerciseKey].Section === 'Core') {
          coreWorkout.push(exercisesDatabase[exerciseKey]);
        }
        else if (exercisesDatabase[exerciseKey].Section === 'Upper') {
          upperWorkout.push(exercisesDatabase[exerciseKey]);
        }
        else if (exercisesDatabase[exerciseKey].Section === 'Lower') {
          lowerWorkout.push(exercisesDatabase[exerciseKey]);
        }
      }

      // Create a Workout
      // Loop 3x:
      for (var k= 0; k < 3; k++) {
        // pick random number between 1 and coreWorkout.length
        var randomInt = Math.floor((Math.random() * coreWorkout.length));

        // splice from array
        var randomCore = coreWorkout.splice(randomInt,1);
        // push to todaysWorkout
        todaysWorkout.push(randomCore);
        console.log(todaysWorkout);
        // console.log(coreWorkout.length);
        // pick random from Lower
        // pick random from Upper

      }

      // Loop 1
      // pick random from any

    });



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
