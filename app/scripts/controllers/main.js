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
    var wholeBody = [];
    var recovery = [];

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
      //Fill arrays for Upper, Lower, Core, Whole body
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
        else if (exercisesDatabase[exerciseKey].Section === 'Whole Body') {
          wholeBody.push(exercisesDatabase[exerciseKey]);
        }
        else if (exercisesDatabase[exerciseKey].Section === 'Recovery') {
          recovery.push(exercisesDatabase[exerciseKey]);
        }
      }

      /**
       ** Create a Workout. 2 loops through each Section array.
       */
      // Loop through 2 times
      for (var k= 0; k < 2; k++) {

        // Pick Core
        var randomIntCore = Math.floor((Math.random() * coreWorkout.length));
        // Splice from array
        var randomCore = coreWorkout.splice(randomIntCore,1);
        // Push to todaysWorkout
        todaysWorkout.push(randomCore);

        // Pick Lower
        var randomIntLower = Math.floor((Math.random() * lowerWorkout.length));
        // Splice from array
        var randomLower = lowerWorkout.splice(randomIntLower,1);
        // Push to todaysWorkout
        todaysWorkout.push(randomLower);

        // Pick wholeBody
        var randomIntWhole = Math.floor((Math.random() * wholeBody.length));
        // Splice from array
        var randomWholeBody = wholeBody.splice(randomIntWhole,1);
        // Push to todaysWorkout
        todaysWorkout.push(randomWholeBody);

        // Pick recover
        var randomIntRec = Math.floor((Math.random() * recovery.length));
        // Splice from array
        var randomRecovery = recovery.splice(randomIntRec,1);
        // Push to todaysWorkout
        todaysWorkout.push(randomRecovery);
        

      }

      // Loop through Lower
      // for (var l= 0; l < 2; l++) {
      //   // Pick random number between 1 and array.length
      //   var randomIntLower = Math.floor((Math.random() * lowerWorkout.length));
      //
      //   // splice from array
      //   var randomLower = lowerWorkout.splice(randomIntLower,1);
      //   // push to todaysWorkout
      //   todaysWorkout.push(randomLower);
      //   console.log(lowerWorkout[l].Title);
      // }

      // pick random from Upper

      // pick random from wholebody
      // pick random from recovery

      // $scope.test = todaysWorkout.Title;

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
