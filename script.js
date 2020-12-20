var scriptURL = "https://script.google.com/macros/s/AKfycbyCxnTylZQBaf1DhaWvjF1g8FMlP_315wTIWRwbHBF8yMio56Fe/exec";

var startBtn =  document.getElementById('js-start-quiz');
var quizContainer = document.getElementById('quiz-container');
var startContainer = document.getElementById('start-container');
var loadingContainer = document.getElementById('loading-container')

startBtn.addEventListener('click',startQuiz);

function startQuiz(){
    startContainer.classList.toggle('d-none');
    loadingContainer.classList.toggle('d-none');
}