// alert("working!");
/*
user clicks start button
    start button hide
    30 second timer appears
    countdown by 1 second
        if timer = 0
            incorrect ++
            display timeOut gif
    Question populates
        Answers 1-4 populate
            if correctAnswer clicked
                correct ++
                display correct gif
            if wrongAnswer clicked
                incorrect ++
                display wrong gif
    final question answered
        show final screen with correct/incorrect/time out answers
        start button appears
            click to restart game (not reload page)
*/
// global variables
var correct = 0;
var incorrect = 0;
var unanswered = 0;
var timer = 30;
var intervalId;

// functions
$( document ).ready(function() {
    console.log( "ready!" );

    function runTimer() {
            clearInterval(intervalId);
            intervalId = setInterval(decrement, 1000);
        }

    function decrement () {
        timer--;
        $("#countDown").html("<h2>Time left to answer: </h2>" + timer);
        if (timer === 0) {
            stopTimer();
            $(".outcome").html("<h2>Out of fuel brother, times up!<h2>");
        }
    }

    function stopTimer() {
        clearInterval(intervalId);
    }

    $("#startGame").on("click",function(){
        // alert("working");
        runTimer();
        $("#startGame").fadeToggle(1000);
    })















});

// run game