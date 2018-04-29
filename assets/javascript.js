
  $(document).ready(function(){

    var trainData = ("https://train-schedule-2aa6b.firebaseio.com/");


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCQr_RkQmPomZZ-gHvKAUtHmoDkkuvJoik",
    authDomain: "train-schedule-2aa6b.firebaseapp.com",
    databaseURL: "https://train-schedule-2aa6b.firebaseio.com",
    projectId: "train-schedule-2aa6b",
    storageBucket: "train-schedule-2aa6b.appspot.com",
    messagingSenderId: "681954895657"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

$("#submitButton").on("click", function(){
  var trainName = $("#trainNameInput").val().trim();
  var destination = $("#destinationInput").val.trim();
  var firstTime = moment($("#timeInput").val().trim(), "HH:mm").format("");
  var frequency = $("#frequencyInput").val().trim();


  var newTrains = {
    name: trainName,
    tdestination: destination,
    tFirst: firstTime,
    tFreq: frequency,
  }

  trainData.push(newTrains);

  alert("train added");

  $("#trainNameInput").val("")
  $("#destinationInput").val("");
  $('#timeInput').val("");
  $('#frequencyInput').val("");
  
  return false;

});

trainData.on("child_added", function(childSnapshot, prevChildKey){
  
  var trainName = childSnapshot.val().name;
	var destination = childSnapshot.val().tdestination;
	var firstTime = childSnapshot.val().tFirst;
	var frequency = childSnapshot.val().tfreq;


// First Time (pushed back 1 year to make sure it comes before current time)
var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
console.log(firstTimeConverted);

// Current Time
var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

// Difference between the times
var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);

// Time apart (remainder)
var tRemainder = diffTime % tFrequency;
console.log(tRemainder);

// Minute Until Train
var tMinutesTillTrain = tFrequency - tRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// Next Train
var nextTrain = moment().add(tMinutesTillTrain, "minutes");
console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));
// Add each train's data into the table
$("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + "Every " + frequency + " minutes" + "</td><td>" + nextTrainConverted + "</td><td>" + tMinutesTillTrain + "</td></tr>");

    });
  });