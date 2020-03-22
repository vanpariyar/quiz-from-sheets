var scriptURL = "https://script.google.com/macros/s/AKfycbyCxnTylZQBaf1DhaWvjF1g8FMlP_315wTIWRwbHBF8yMio56Fe/exec?action=getquiz";


function authUser (){
    (localStorage.getItem('login') == 'undefined') && (localStorage.setItem('login', '0')) ;
    (localStorage.getItem('login') == '0') && (window.location.href = '/login/');   
}
authUser();
$(document).ready(function(){
    //Prevent submit to form of user
    // $('#quiz-form').submit(function(e){
    //     e.preventDefault();        
    // });

    /**           
     * @param {type} type number
     * @param {data} data JSON
     */
    function setItem( type , data ){
        switch(type){
            case 1:
                localStorage.setItem('quiz', JSON.stringify(data));
                return true;

            case 2:
                if(localStorage.getItem('questionIndex')){
                    localStorage.setItem('questionIndex', data);
                    return true;
                }else{
                    localStorage.setItem('questionIndex', '0')
                    return true;
                }    
                case 3:
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
    function getItem( type = 0 ){
        switch(type){
            case 1:
                return JSON.parse(localStorage.getItem('quiz'));
            case 2:
                if(localStorage.getItem('questionIndex')){
                    return parseInt(localStorage.getItem('questionIndex'));
                }else{
                    localStorage.setItem('questionIndex', '0')
                    return parseInt(localStorage.getItem('questionIndex'));
                }
            case 3:
                if(localStorage.getItem('userAnswer')){
                    return JSON.parse(localStorage.getItem('userAnswer'));
                }else{
                    localStorage.setItem('userAnswer', '[""]')
                    return JSON.parse(localStorage.getItem('userAnswer'));
                }    
                
            default:
                return false;   
        }
    }

    function removeItem( type ){
        switch (type) {
            case 2:
                localStorage.removeItem('questionIndex');
                break;
        
            default:
                break;
        }
    }
    
    function increaseAnsIndex(questionIndex){
        var quiz = getItem(1);
        if(!(questionIndex+1 >= quiz.length) ){
            questionIndex++;
            setItem(2,questionIndex); 
            return questionIndex;  
        }
        return false;
    }

    function ShowResult(){
        var rightAnswer = [];
        var quiz = getItem(1);
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
            removeItem(2);
            var questionIndex = getItem(2);
            quizSetup(questionIndex);
            $(".quiz-body").show();
            $("#score").hide();
        });
        
    }

    function quizSetup(questionIndex){
        var quiz = getItem(1);
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
        if(!getItem(1)){
            $.ajaxSetup({
                async: false
            });
            $.getJSON( scriptURL, function( data ) {
                setItem(1, data);
                return data;
            });
        }
        
    } else {
    // Sorry! No Web Storage support..
    }

    getItem(1);
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
});