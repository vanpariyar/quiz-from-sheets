const resultAnalysis = document.getElementById('result-analysis')
const retakeQuizContainer = document.getElementById('retake-quiz-container')
const loadingContainer = document.getElementById('loading-container')
var quizeStore = localStorage;

resultInit();

function resultInit() {
    let _questionsAnswers, _localAnswer;
    _questionsAnswers = JSON.parse(quizeStore.getItem('quiz'));
    _localAnswer = JSON.parse(quizeStore.getItem('selectedAnswers'));
    console.log(_localAnswer)
    if( _questionsAnswers && _localAnswer && ( _questionsAnswers.length ) && (_localAnswer.length ) ){
        resultAnalysis.innerHTML = generateResultMarkup(_questionsAnswers, _localAnswer);
        resultAnalysis.classList.remove('d-none');
        loadingContainer.classList.add('d-none');
    } else {
        loadingContainer.classList.add('d-none');
        retakeQuizContainer.classList.remove('d-none');
    }

    resetQuizQuestion();
}

function generateResultMarkup(_questionsAnswers, _localAnswer){
    _questionsAnswers = JSON.parse(_questionsAnswers);
    let _returnHtml;
    _returnHtml = `<tr><td>SR. No</td><td>Question</td><td>Right Answer</td><td>Your Answer</td></tr>`;
    _questionsAnswers.map( function( answers, index ){
        let isCorrect = false;
        if( 'answer'+answers.RightAnswer ==  _localAnswer[index] ){
            isCorrect = true;
        }
       _returnHtml+= `<tr class="${ isCorrect ? 'table-success' : 'table-danger' }"><td>${index + 1}</td><td>${answers.question}</td><td>${answers['answer'+answers.RightAnswer]}</td><td>${answers[_localAnswer[index]]}</td></tr>`
    });
    return _returnHtml;
    
}

function resetQuizQuestion(){
    quizeStore.removeItem('quiz')
}

// resultAnalysis.innerHTML = 