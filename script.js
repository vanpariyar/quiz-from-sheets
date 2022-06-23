var scriptURL = "https://script.google.com/macros/s/AKfycbxQT9PVEaz6pVFcgAEnHUupuHykBZ08vxZhgDHijzOIn-O5qQDENqgNm3BmyRhNeowl/exec";

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
var quizStore = localStorage;
var answer1 = document.getElementById('answer1');
var answer2 = document.getElementById('answer2');
var answer3 = document.getElementById('answer3');
var answer4 = document.getElementById('answer4');
/**
 * Adding Event Listners
 */
answersElement = Array.from(document.querySelectorAll('#answers a')).map(function(element){
    element.addEventListener('click', isASelectedAnswerIsRight);
}); 
startBtn.addEventListener('click',startQuiz);

function startQuiz(){
    startContainer.classList.toggle('d-none');
    loadingContainer.classList.toggle('d-none');
    quizStore.setItem('selectedAnswers',JSON.stringify([]));
    fetchQuizQuestions();
}

function fetchQuizQuestions(){
    /**
     * TODO : remove this script
     */
    let demo = scriptURL+'?callback=showQuestion';

    quiz = JSON.parse(quizStore.getItem('quiz'));

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

function isASelectedAnswerIsRight( event ) {
    thisAnswer = this;
    thisAnswer.removeEventListener('click', isASelectedAnswerIsRight);

    event.target.innerHTML = '<div class="text-center"><div class="spinner-border" role="status"><span class="sr-only">Next Question in 3 Second </span></div></div>';

    setTimeout( function(){
        setNextQuestion(event);
        this.addEventListener('click', isASelectedAnswerIsRight);
    },1800 );
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
    answer1.innerHTML = currentQuestion.answer1;
    answer2.innerHTML = currentQuestion.answer2;
    answer3.innerHTML = currentQuestion.answer3;
    answer4.innerHTML = currentQuestion.answer4;

    loadingContainer.classList.add('d-none');
    quizContainer.classList.remove('d-none');
}

function showQuestion(questions){
    /**
     * Internal Cachig for development
     */
    quizStore.setItem('quiz', JSON.stringify(questions));
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

    sendResultToDatabase();
}

function calculateResults(){
    let _questionsAnswers = questionsAnswers;
    let _rightAnswers = getTotalScore();
    return _rightAnswers+' / '+_questionsAnswers.length ;
}

function getTotalScore() {
    let _questionsAnswers = questionsAnswers;
    let _rightAnswers = 0;
    let _localAnswer = JSON.parse(quizStore.getItem('selectedAnswers'));
    _questionsAnswers.map( function( answers, index ){
        if( 'answer'+answers.RightAnswer ==  _localAnswer[index] ){
            _rightAnswers++;
        }
    });
    return _rightAnswers;
}

function saveAnswer(selectedAnswer){
    let localAnswer;
    if( ! quizStore.getItem('selectedAnswers') ){
        localAnswer = [];
    } else {
        localAnswer = JSON.parse(quizStore.getItem('selectedAnswers'));
    }
    localAnswer.push(selectedAnswer);
    quizStore.setItem('selectedAnswers',JSON.stringify(localAnswer));
}

function sendResultToDatabase(){
    let userToken = quizStore.getItem('token');
    const sendObject = {
        'token': userToken,
        'action': 'result',
        'score': getTotalScore(),
    }

    console.log(sendObject);

    sendResultToGoogleSheet(sendObject)
} 

function sendResultToGoogleSheet(formData) {
    // var form_data = new FormData();

    // for ( var key in formData ) {
    //     form_data.append(key, formData[key]);
    // }
    let ajaxRequest = function(formData){
        // user = { data : user };
        $.ajax({
            type: "POST",
            url: scriptURL,
            async: true,
            data: formData,
            headers: {
                // 'Content-Type': 'text/plain;charset=utf-8',
                'Content-type': 'application/x-www-form-urlencoded',
                // 'Content-type': 'application/json',
            },
            beforeSuccess: function(){
                setTimeout(function(){ alert("Hello"); }, 5000);
            },
            success: function (data)
            {
              
                        console.log('Case default')
                console.log(data);
            }
        });
    } 
    ajaxRequest(formData);
}
