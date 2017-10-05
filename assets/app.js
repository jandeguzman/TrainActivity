
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCa_uVcN5vY_CeikZckluqjrvx2mHd8yRg",
    authDomain: "week-7-hw-6834a.firebaseapp.com",
    databaseURL: "https://week-7-hw-6834a.firebaseio.com",
    projectId: "week-7-hw-6834a",
    storageBucket: "week-7-hw-6834a.appspot.com",
    messagingSenderId: "182390229446"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

    var updateTime = function(){
    var now = moment().format('hh:mm');
    $('#currentTime').html(now);
  }

  $(document).ready(function(){
    updateTime();
    setInterval(updateTime, 1000);
});


  $("#submit").on("click", function(){


  var destination = $("#destination").val().trim();
  var location = $("#location").val().trim();
  var firstTrain = $("#firstTrain").val().trim();
  var frequency = $("#frequency").val().trim();


  var newData = {
    destination: destination,
    location: location,
    firstTrain: firstTrain,
    frequency: frequency
  }

  
  database.ref().push(newData);

  $("#destination").val("");
  $("#location").val("");
  $("#firstTrain").val("");
  $("#frequency").val("");



  return false;

});


database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  var destination = childSnapshot.val().destination;
  var location = childSnapshot.val().location;
  var firstTrain = childSnapshot.val().firstTrain;
  var frequency = childSnapshot.val().frequency;


  // var convertTime = moment(firstTrain, "hh:mm").subtract(1, "years");

  // var currentTime = moment();

  // var diffTime = moment().diff(moment(convertTime), "minutes");

  // var tRemainder = diffTime % frequency;

  // var tMinutesTillTrain = frequency - tRemainder;

  // var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  // var nextTrainConverted = moment(nextTrain).format("hh:mm");

  $(".table > tbody").append("<tr><td>" + location + "</td><td>" + destination + "</td><td>"
    + frequency + "</td><td>" + ""+ "</td><td>" + "" + "</td></tr>");


});
