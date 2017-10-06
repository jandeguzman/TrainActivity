$(document).ready(function() {

    // var trainData = new Firebase("https://week-7-hw-6834a.firebaseio.com");

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

    var destination = "";
    var location = "";
    var firstTrain = "";
    var frequency = "";

    $("#submit").on("click", function() {

        destination = $("#destination").val().trim();
        location = $("#location").val().trim();
        firstTrain = $("#firstTrain").val().trim();
        frequency = $("#frequency").val().trim();

        var newData = {
            destination: destination,
            location: location,
            firstTrain: firstTrain,
            frequency: frequency,
        }

        database.ref().push(newData);

        $("#destination").val("");
        $("#location").val("");
        $("#frequency").val("");
        $("#firstTrain").val("");

        // Prevents page from refreshing
        return false;
    });


    database.ref().on("child_added", function(childSnapshot, prevChildKey) {

        var value = childSnapshot.val()

        var destination = value.destination;
        var location = value.location;
        var firstTrain = value.firstTrain;
        var frequency = value.frequency;

    var diffTime = moment().diff(moment.unix(firstTrain), "minutes");
    var timeRemainder = moment().diff(moment.unix(firstTrain), "minutes") % frequency ;
    var minutes = frequency - timeRemainder;

    var nextTrainArrival = moment().add(minutes, "m").format("hh:mm A"); 
    

    // Append train info to table on page
    $(".table > tbody").append("<tr><td>" + destination + "</td><td>" + location + "</td><td>"+ nextTrainArrival + "</td><td>" + minutes + "</td></tr>");



    });

});