$(document).ready(function() {
               
    // Initialize Firebase
        var config = {
            apiKey: "AIzaSyAFUJ2a3Kj5kUJGRMvWMYMiL7YKyJn4lVk",
            authDomain: "train-scheduler-a841f.firebaseapp.com",
            databaseURL: "https://train-scheduler-a841f.firebaseio.com",
            projectId: "train-scheduler-a841f",
            storageBucket: "",
            messagingSenderId: "344256271643"
        };

        firebase.initializeApp(config);

        var database = firebase.database();

        // Add Train .on('click') function
        $('#add-train-btn').on('click', function(event) {
            event.preventDefault();

            // Capture form input
            var trainName = $('#train-name-input').val().trim();
            var trainDest = $('#destination-input').val().trim();
            var firstTrain = $('#firstTrain-input').val().trim();
            var trainFreq = $('#frequency-input').val().trim();

            // Create local temporary object to hold train data
            var newTrain = {
                name: trainName,
                destination: trainDest,
                start: firstTrain,
                frequency: trainFreq
            };

            // Push train data to Firebase
            database.ref().push(newTrain);
            console.log(newTrain.name);

            // Clears input fields
            $('#train-name-input').val('');
            $('#destination-input').val('');
            $('#firstTrain-input').val('');;
            $('#frequency-input').val('');
        });

        // Firebase event listener to add trains to database & HTML page
        database.ref().on('child_added', function(childSnapshot, prevChildKey){
            console.log(childSnapshot.val());

        //Store childSnapshot values to a variable
            var trainName = childSnapshot.val().name;
            var trainDest = childSnapshot.val().destination;
            var firstTrain = childSnapshot.val().start;
            var trainFreq = childSnapshot.val().frequency;

        // Declare variable
            var trainFreq;

        // Time to be entered on the entry form
            var firstTime = 0;

            var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, 'years');
            console.log(firstTimeConverted);

            // Current Time
            var currentTime = moment();
            console.log('Current time: ' + moment(currentTime).format('HH:mm'));

        // Difference between times
            var diffTime = moment().diff(moment(firstTimeConverted), 'minutes');
            console.log('Difference in time: ' + diffTime);

        // Time apart (remainder)
            var tRemainder = diffTime % trainFreq;
            console.log(tRemainder);

        // Minutes Until Train
            var tMinutesTillTrain = trainFreq - tRemainder;
            console.log('Minutes until train: ' + tMinutesTillTrain);

        // Next Train
            var nextTrain = moment().add(tMinutesTillTrain, 'minutes');
            console.log('Arrival Time: ' + moment(nextTrain).format('HH:mm'));

        // Add each train's data into the table
        $('#train-table > tbody').append('<tr><td>' + trainName + '</td><td>' + trainDest + '</td><td>' + trainFreq + '</td><td>' + moment(nextTrain).format('HH:mm') + '</td><td>' + tMinutesTillTrain + '</td></tr>');

        });

    });