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
        var destination = $("#destination").val();
        var firstTrain = $("#firstTrainTime").val();
        var frequency = $("#frequency").val();
        var trainName = $("#trainName").val();
        console.log(destination, firstTrain, frequency, trainName);

        var employeeObj = {
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency,
            trainName: trainName
        }

        database.ref().push(employeeObj);
        //   clears all text boxes
        $("#destination").val("");
        $("#firstTrainTime").val("");
        $("#frequency").val("");
        $("#trainName").val("");

    });

    database.ref().on("child_added", function (snapshot) {

        var destination = snapshot.val().destination;
        var firstTrain = snapshot.val().role;
        var frequency = moment(snapshot.val().frequency);
        var trainName = snapshot.val().trainName;
        var formatFrequency = frequency.format("HH:mm");
        var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        var timeRemaining = diffTime % formatFrequency;
        var tMinutesTillTrain = formatFrequency - timeRemaining;
    
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");

        console.log(formatFrequency);
        console.log(frequency);


        var tr = $("<tr>");
        tr.append(
            $("<td>").text(trainName),
            $("<td>").text(destination),
            $("<td>").text(formatFrequency),
            $("<td>").text(moment(nextTrain).format("hh:mm")),
            $("<td>").text(tMinutesTillTrain),
            
            // $("<td>").text(totalBilled),
        )
        $("#tbody").append(tr)
        console.log(destination, firstTrain, frequency);

    });

});