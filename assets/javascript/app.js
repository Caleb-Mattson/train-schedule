$(document).ready(function () {
    console.log("ready!");
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCtREzTHNdIRBR3PRfwCOntxYwvQgLOLAc",
        authDomain: "school-stuffs-doing-things.firebaseapp.com",
        databaseURL: "https://school-stuffs-doing-things.firebaseio.com",
        projectId: "school-stuffs-doing-things",
        storageBucket: "school-stuffs-doing-things.appspot.com",
    };
    firebase.initializeApp(config);

    var database = firebase.database();

    $("#submit").on("click", function (event) {

        event.preventDefault();
        
        console.log("HELLO WORLD");

        database.ref().push({
            destination: $("#destination").val(),
            firstTrain: $("#firstTrainTime").val(),
            frequency: $("#frequency").val(),
            trainName: $("#trainName").val()
        });
        //   clears all text boxes
        $("#destination").val("");
        $("#firstTrainTime").val("");
        $("#frequency").val("");
        $("#trainName").val("");

    });

    database.ref().on("child_added", function (snapshot) {

        var destinationInput = snapshot.val().destination;
        var firstTrainInput = snapshot.val().firstTrain;
        var frequencyInput = snapshot.val().frequency;
        var trainNameInput = snapshot.val().trainName;

        var firstTimeConverted = moment(firstTrainInput, "HH:mm").subtract(1, "years");
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

        var timeRemaining = diffTime % frequencyInput;
        var tMinutesTillTrain = frequencyInput - timeRemaining;

        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        var formatNextTrain = nextTrain.format("h:mm a");

        var tr = $("<tr>");
        tr.append(
            $("<td>").text(trainNameInput),
            $("<td>").text(destinationInput),
            $("<td>").text(frequencyInput),
            $("<td>").text(formatNextTrain),
            $("<td>").text(tMinutesTillTrain)
        );
        $("#tbody").append(tr)


    });
    console.log(moment());

});