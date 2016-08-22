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
       ** Create a Workout. Loop twice through each Section array.
       */
      for (var k= 0; k < 2; k++) {

        // Create random integer based on length of each array
        var randomIntCore = Math.floor((Math.random() * coreWorkout.length));
        var randomIntLower = Math.floor((Math.random() * lowerWorkout.length));
        var randomIntUpper = Math.floor((Math.random() * upperWorkout.length));
        var randomIntWhole = Math.floor((Math.random() * wholeBody.length));
        var randomIntRec = Math.floor((Math.random() * recovery.length));

        // Get object at index at random integer
        var randomCore = coreWorkout[randomIntCore];
        var randomLower = lowerWorkout[randomIntLower];
        var randomUpper = upperWorkout[randomIntUpper];
        var randomWholeBody = wholeBody[randomIntWhole];
        var randomRecovery = recovery[randomIntRec];

        // Push object to today's workout array
        todaysWorkout.push(randomCore);
        todaysWorkout.push(randomLower);
        todaysWorkout.push(randomUpper);
        todaysWorkout.push(randomWholeBody);
        todaysWorkout.push(randomRecovery);

        // Remove used exercises
        coreWorkout.splice(randomIntCore,1);
        lowerWorkout.splice(randomIntLower,1);
        upperWorkout.splice(randomIntUpper,1);
        wholeBody.splice(randomIntWhole,1);
        recovery.splice(randomIntRec,1);

        //TODO
        // fill index 4 and 9 with Recovery
        // fill index 0-3 with any
        // fill index 5-8 with any

      }
    });

    $scope.workoutTest = todaysWorkout;
      // $scope.testFunction = function(myItem) {
      //   console.log(myItem);
      // };



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
      //TODO change only this item's showDemo
      
      
      
    };


  }

]);
