var scriptURL = "https://script.google.com/macros/s/AKfycbyCxnTylZQBaf1DhaWvjF1g8FMlP_315wTIWRwbHBF8yMio56Fe/exec";

/**
 * Initializations
 */
var startBtn =  document.getElementById('js-start-quiz');
var quizContainer = document.getElementById('quiz-container');
var startContainer = document.getElementById('start-container');
var loadingContainer = document.getElementById('loading-container');
var resultContainer = document.getElementById('result-container');
var question = document.getElementById('question');
var answers = document.getElementById('answers');
var questionIndex = document.getElementById('question-index');
var questionsAnswers;

/**
 * Adding Event Listners
 */
answersElement = Array.from(document.querySelectorAll('#answers a')).map(function(element){
    element.addEventListener('click', setNextQuestion);
}); 
startBtn.addEventListener('click',startQuiz);

function startQuiz(){
    startContainer.classList.toggle('d-none');
    loadingContainer.classList.toggle('d-none');
    localStorage.setItem('selectedAnswers',JSON.stringify([]));
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
            //console.log(e);
        },
        error: function( xhr,e ){
            console.log(e);
        },
    });
}

function setNextQuestion(event){
    let currentQuestionIndex = parseInt(questionIndex.innerHTML);
    let selectedAnswer = event.target.id;
    if( (questionsAnswers.length) > (currentQuestionIndex) ){
        saveAnswer(selectedAnswer);
        setQuestion(currentQuestionIndex);
    } else {
        saveAnswer(selectedAnswer);
        showResult();
    }
}

function setQuestion(index){
    let currentQuestion = questionsAnswers[index];
    questionIndex.innerHTML = ++index;
    question.innerHTML = currentQuestion.question;
    document.getElementById('answer1').innerHTML = currentQuestion.answer1;
    document.getElementById('answer2').innerHTML = currentQuestion.answer2;
    document.getElementById('answer3').innerHTML = currentQuestion.answer3;
    document.getElementById('answer4').innerHTML = currentQuestion.answer4;

    loadingContainer.classList.add('d-none');
    quizContainer.classList.remove('d-none');
}

function showQuestion(questions){
    /**
     * Internal Cachig for development
     */
    localStorage.setItem('quiz', JSON.stringify(questions));
    /*** */
    questionsAnswers = JSON.parse(questions);
    setQuestion(0);
}

function showResult(){
    quizContainer.classList.add('d-none');
    let result = document.querySelector('#result-container #result');
    let _calculatedScore = calculateResults();

    result.innerHTML = _calculatedScore;
    resultContainer.classList.remove('d-none');
}

function calculateResults(){
    let _questionsAnswers = questionsAnswers;
    let _rightAnswers = 0;
    let _localAnswer = JSON.parse(localStorage.getItem('selectedAnswers'));
    _questionsAnswers.map( function( answers, index ){
        if( 'answer'+answers.RightAnswer ==  _localAnswer[index] ){
            _rightAnswers++;
        }
    });
    return _rightAnswers+' / '+_questionsAnswers.length ;
}

function saveAnswer(selectedAnswer){
    let localAnswer;
    if( ! localStorage.getItem('selectedAnswers') ){
        localAnswer = [];
    } else {
        localAnswer = JSON.parse(localStorage.getItem('selectedAnswers'));
    }
    localAnswer.push(selectedAnswer);
    localStorage.setItem('selectedAnswers',JSON.stringify(localAnswer));
}