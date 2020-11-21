var scriptURL = "https://script.google.com/macros/s/AKfycbyCxnTylZQBaf1DhaWvjF1g8FMlP_315wTIWRwbHBF8yMio56Fe/exec";


function authUser (){
    (localStorage.getItem('login') == 'undefined') && (localStorage.setItem('login', '0')) ;
    (localStorage.getItem('login') == '0') && (window.location.href = '/login/');   
}
authUser();

/**           
 * @param {type} type number
 * @param {data} data JSON
 */

class Quiz {
    setItem( type , data ){
        switch(type){
            case 'quiz':
                localStorage.setItem('quiz', JSON.stringify(data));
                return true;

            case 'questionIndex':
                if(localStorage.getItem('questionIndex')){
                    localStorage.setItem('questionIndex', data);
                    return true;
                }else{
                    localStorage.setItem('questionIndex', '0')
                    return true;
                }    
                case 'userAnswer':
                    if(localStorage.getItem('userAnswer')){
                        localStorage.setItem('userAnswer', JSON.stringify(data));
                        return true;
                    }else{
                        localStorage.setItem('userAnswer', '[""]')
                        return true;
                    }    
            default:
                return false;
        }
    }
    getItem( type = 0 ){
        switch(type){
            case 'quiz':
                return JSON.parse(localStorage.getItem('quiz'));

            case 'questionIndex':
                if(localStorage.getItem('questionIndex')){
                    return parseInt(localStorage.getItem('questionIndex'));
                }else{
                    localStorage.setItem('questionIndex', '0')
                    return parseInt(localStorage.getItem('questionIndex'));
                }
            case 'userAnswer':
                if(localStorage.getItem('userAnswer')){
                    return JSON.parse(localStorage.getItem('userAnswer'));
                }else{
                    localStorage.setItem('userAnswer', '[""]')
                    return JSON.parse(localStorage.getItem('userAnswer'));
                }
                
            case 'token':
                if(localStorage.getItem('token')){
                    return localStorage.getItem('token');
                }else{
                    localStorage.setItem('token', '')
                    return localStorage.getItem('token');
                }    
                
            default:
                return false;   
        }
    }

    removeItem( type ){
        switch (type) {
            case 'quiz':
                return localStorage.removeItem('quiz');

            case 'questionIndex':
                localStorage.removeItem('questionIndex');
                break;
        
            default:
                break;
        }
    }
}

function increaseAnsIndex(questionIndex){
    var quiz = getItem('');
    if(!(questionIndex+1 >= quiz.length) ){
        questionIndex++;
        setItem(2,questionIndex); 
        return questionIndex;  
    }
    return false;
}

/**
 *  Common Function  For send data via ajax.
 *  Send the data To doPost() appScript.
 */
function qfsSendData( data = {} ) {
    $.ajax({
        type: "POST",
        url: scriptURL,
        data: data,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded',
        },
        success: function (data)
        {
            alert(data);
        }
    });
}

/**
 * Show the result After Quiz answer done.
 * get the data from Local Storage
 */

function ShowResult(){
    var rightAnswer = [];
    var quiz = getItem('');
    quiz.map(function(value){
        rightAnswer.push(value.RightAnswer);
    });
    var totalScore = 0;
    let userAnswers = getItem(3);
    rightAnswer.map(function(answer, key){
        if(answer == userAnswers[key]){
            totalScore++;
        }
    });
    percentage =  ((totalScore / rightAnswer.length)*100).toFixed(2) ;

    $(".quiz-body").hide();
    $("#score").show();

    $("#score h3").text(`Your Total Score is: ${totalScore} out of ${rightAnswer.length} and ${percentage}%`);

    $(".restart-quiz").on('click', function(){
        $(this).prop('value', 'Loading Your quiz .....')
        removeItem(2);
        removeItem(1);
        var questionIndex = getItem(2);
        getQuiz();
        quizSetup(questionIndex);
        $(".quiz-body").show();
        $("#score").hide();
    });

    qfsSendData({ 
        score: totalScore,
        action: 'result',
        token: getItem(4),
    }); // send data to the s
}

function quizSetup(questionIndex){
    var quiz = getItem('');
    $("#quiz-form input[type=radio]").prop("checked",false);
    $("#question").text( quiz[questionIndex].question );
    $("label[for='radio1'] span").text(quiz[questionIndex].answer1);
    $("label[for='radio2'] span").text(quiz[questionIndex].answer2);
    $("label[for='radio3'] span").text(quiz[questionIndex].answer3);
    $("label[for='radio4'] span").text(quiz[questionIndex].answer4);
    
    $('.ansBtn').val(questionIndex);
}

/* ---------------------------------------------------------------------------- */
if (typeof(Storage) !== "undefined") {

    // NOTE : Remove this if condiotion if found it is for testing purpose
    function getQuiz(){
        if(!getItem('')){
            $.ajaxSetup({
                async: false
            });
            $.getJSON( scriptURL+"?action=getquiz", function( data ) {
                setItem(1, data);
                return data;
            });
        }
    }
    getQuiz();
    
    
} else {
// Sorry! No Web Storage support..
}

getItem('');
$("#start-btn").click(function(e){
    $('#rules').hide();
    $(".quiz-body").show();
    var questionIndex = getItem(2);
    var userAnswer = getItem(3);
    if(userAnswer.length == (questionIndex+1)){
        ShowResult();
    }else{
        quizSetup(questionIndex);
    }
});

$('#quiz-form').submit(function(e){
    e.preventDefault();   
    if($("#quiz-form input[type=radio]:checked").length == 0){
        alert('Select The Value Please');
    }else{
        var questionIndex = getItem(2);
        var userAnswer = getItem(3);
        userAnswer[questionIndex] = (parseInt($('input[name="optradio"]:checked').val()));
        setItem( 3, userAnswer);
        if(questionIndex = increaseAnsIndex(questionIndex)){
            quizSetup(questionIndex);
        }else{
            ShowResult();
        }
    }     
});