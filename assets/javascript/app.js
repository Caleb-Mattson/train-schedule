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

});