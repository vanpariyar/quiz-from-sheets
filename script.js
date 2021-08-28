var scriptURL = "https://script.google.com/macros/s/AKfycbyCxnTylZQBaf1DhaWvjF1g8FMlP_315wTIWRwbHBF8yMio56Fe/exec";

var startBtn =  document.getElementById('js-start-quiz');
var quizContainer = document.getElementById('quiz-container');
var startContainer = document.getElementById('start-container');
var loadingContainer = document.getElementById('loading-container');
var question = document.getElementById('question');
var answers = document.getElementById('answers');
var questionIndex = document.getElementById('question-index');
var questionsAnswers;

startBtn.addEventListener('click',startQuiz);

function startQuiz(){
    startContainer.classList.toggle('d-none');
    loadingContainer.classList.toggle('d-none');
    fetchQuizQuestions();
}

function fetchQuizQuestions(){
    /**
     * TODO : remove this script
     */
    let demo = 'https://script.google.com/macros/s/AKfycbwjVmNYDngcqo0a2nyRzBeg-_rZYM05umGc5LEU6o7G/dev?callback=showQuestion';

    quiz = JSON.parse(localStorage.getItem('quiz'));

    if(quiz) {
        showQuestion(quiz);
        return;
    }

    var request = jQuery.ajax({
        crossDomain: true,
        url: demo,
        method: "GET",
        dataType: "jsonp",
        success : function( e ){
            console.log(e);
        },
        error: function( xhr,e ){
            console.log(e);
        },
    });
}


function setQuestion(index){
    let currentQuestion = questionsAnswers[index];
    console.log(questionsAnswers)

    questionIndex.innerHTML = ++index;
    question.innerHTML = currentQuestion.question;
    document.getElementById('answer1').innerHTML = currentQuestion.answer1;
    document.getElementById('answer2').innerHTML = currentQuestion.answer2;
    document.getElementById('answer3').innerHTML = currentQuestion.answer3;
    document.getElementById('answer4').innerHTML = currentQuestion.answer4;

    loadingContainer.classList.toggle('d-none');
    quizContainer.classList.toggle('d-none');
}

function showQuestion(questions){
    /**
     * Internal Cachig for development
     */
    console.log(questions);
    localStorage.setItem('quiz', JSON.stringify(questions));
    /*** */
    questionsAnswers = JSON.parse(questions);
    setQuestion(0);
}

