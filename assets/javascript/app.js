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
var timer = 31;
var midTimer = 7;
var nextQ = 0;
var intervalId;
var midId;

var audio1 = new Audio("../TriviaGame/assets/sounds/start.mp3");
var audio2 = new Audio("../TriviaGame/assets/sounds/burn.mp3");
var audio3 = new Audio("../TriviaGame/assets/sounds/crash.mp3");
var audio4 = new Audio("../TriviaGame/assets/sounds/OOOF.mp3");

var Question1 = 
    {question : "What does MPH stand for?",
    correct : "Miles per hour",
    wrong1 : "Miles per hover",
    wrong2 : "Mentions per hour",
    wrong3 : "Michigan plans honor"
    }

var Question2 =
    {question : "What is generally considered to be the first pony car?",
    correct : "Ford Mustang",
    wrong1 : "Buick Buckaroo",
    wrong2 : "Chevrolet Camaro",
    wrong3 : "GoGo Gadget Car"
    }

var Question3 =
    {question : "What year was the Corvette first introduced?",
    correct : "1953",
    wrong1 : "2000",
    wrong2 : "1853",
    wrong3 : "1970"
    }

var Question4 =
    {question : "What does RPM stand for?",
    correct : "Revolutions Per Minute",
    wrong1 : "Redundant Pineapple Men",
    wrong2 : "Really Persnickety Marsupials",
    wrong3 : "Run Pie Machine"
    }

var Question5 =
    {question : "Internal Combustion is a type of...",
    correct : "Engine",
    wrong1 : "Oil",
    wrong2 : "Plant",
    wrong3 : "Ailment"
    }    

var arrQuestion = [Question1 , Question2 , Question3 , Question4, Question5];

// functions
$(document).ready(function() {

function endgame() {
    $("#question").html("<h2> Congrats!  Let's look at your score. </h2>").attr("#gameover");
    $("#countDown").html(" ");
    $(".answer1").html("<h2>Correct Answers: " + correct + "</h2>").attr("id" , "#gameover");
    $(".answer2").html("<h2>Incorrect Answers: " + incorrect + "</h2>").attr("id" , "#gameover");
    $(".answer3").html("<h2>Unanswered Questions: " + unanswered + "</h2>").attr("id" , "#gameover");
    $(".answer4").html("<h2> </h2>").attr("id" , "#gameover");
    $(".outcome").html("<h2> </h2>");
    $("#startGame").fadeToggle(5000).text("Play Again?");
    stopTimer();
    $("#countDown").html("<h2> </h2>");
    $(".gif").html("<h2> </h2>");
}

    function emptyAnswer() {
        if (nextQ >= 4){
            endgame();
        }
        else {            
            $("#question").html(" ");
            $(".answer1").html(" ");
            $(".answer2").html(" ");
            $(".answer3").html(" ");
            $(".answer4").html(" ");
            midTimer = 11;
            clearInterval(midId);
            midId = setInterval(decMid, 1000);
        }      
    }

    function decMid () {
        midTimer--;
        $("#countDown").html("<h2>Next Question in: </h2>" + midTimer);
        if (midTimer === 0) {
            if (nextQ >= 4){
                endgame();
                
            }
            else{
                nextQ++;
                populateQA();
                stopTimer();
                runTimer();
            }
            
        }
    }

    function runTimer() {
            timer = 31;
            clearInterval(intervalId);
            intervalId = setInterval(decrement, 1000);
        }

    function decrement () {
        timer--;
        $("#countDown").html("<h2>Time left to answer: </h2>" + timer);
        if (timer === 0) {
            stopTimer();
            unanswered++;
            audio4.play();
            $(".outcome").html("<h2>Out of fuel brother, times up!<h2>");
            $(".gif").html('<img src="../TriviaGame/assets/images/OOOF.gif">');
            emptyAnswer();
        }
    }

    function stopTimer() {
        clearInterval(intervalId);
        clearInterval(midId);
        
        
    }

    function populateQA() {
        $("#question").html("<h2>" + arrQuestion[nextQ].question + "</h2>");
        $(".answer1").html("<h2>" + arrQuestion[nextQ].wrong1 + "</h2>").attr("id" , "incorrect");
        $(".answer2").html("<h2>" + arrQuestion[nextQ].wrong2 + "</h2>").attr("id" , "incorrect");
        $(".answer3").html("<h2>" + arrQuestion[nextQ].wrong3 + "</h2>").attr("id" , "incorrect");
        $(".answer4").html("<h2>" + arrQuestion[nextQ].correct + "</h2>").attr("id" , "correct");
        $(".outcome").html("<h2> <h2>");
        $(".gif").html(" ");
    }

    $(".answer").on("click",function(){
            
        if ($(this).is("#correct")){
            correct++;
            stopTimer();
            audio2.play();
            $(".outcome").html("<h2>Do a burn out!  You got that one correct!!<h2>");
            $(".gif").html('<img src="../TriviaGame/assets/images/Burn.gif">');
            emptyAnswer();            
        }

        if ($(this).is("#incorrect")){
            incorrect++;
            stopTimer();
            audio3.play();
            $(".outcome").html("<h2>Wait you didn't know that one?  Crash and burn...<h2>");
            $(".gif").html('<img src="../TriviaGame/assets/images/Crash.gif">');
            emptyAnswer();    
        }   
        });

    $("#startGame").on("click",function(){
        correct = 0;
        incorrect = 0;
        unanswered = 0;
        nextQ = 0;
        runTimer();
        populateQA();
        $("#startGame").fadeToggle(1000);
        audio1.play();
    });

    

    















});

// run game