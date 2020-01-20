var scriptURL = "https://script.googleusercontent.com/macros/echo?user_content_key=pv30WIvh1efha4CiOWCAMl8Ims6nQvIx_55rsfi-Zrq6zOfbj9LVtIaLNMbLgBnXSxzOk3Ba4wOBbNAhX28i8aHovEZWy6Tmm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnKiVETP14lrnNGc4z7UnwmNyedJhO6PM3vO-zqYvLvh_E4zaIQ6VYVOWGGwbYae5_XiHpVOAX1lu&lib=MAx7Fe9quXaZoFeo9CoNgg_6H1RmW7M3x";

$(document).ready(function(){
    //Prevent submit to form of user
    $('.ansBtn').click(function(e){
        e.preventDefault();        
    });

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
                
            default:
                return false;   
        }
    }
    var quiz = getItem(1);
    
    function quizSetup(questionIndex){
        if(quiz[questionIndex].question == "undefined"){
            return false;
        }
        $("#question").text( quiz[questionIndex].question );
        $("label[for='radio1'] span").text(quiz[questionIndex].answer1);
        $("label[for='radio2'] span").text(quiz[questionIndex].answer2);
        $("label[for='radio3'] span").text(quiz[questionIndex].answer3);
        $("label[for='radio4'] span").text(quiz[questionIndex].answer4);
        $('.ansBtn').val(questionIndex);
        setItem(2,questionIndex);
    }
    
    /* ---------------------------------------------------------------------------- */
    if (typeof(Storage) !== "undefined") {

        // NOTE : Remove this if condiotion if found it is for testing purpose

        if(!getItem(1)){
            $.getJSON( scriptURL, function( data ) {
                setItem(1, data);
            });
        }
        
    } else {
    // Sorry! No Web Storage support..
    }

    var rightAnswer = [];
    var userAnswer = [];
    quiz.map(function(value){
        rightAnswer.push(value.RightAnswer);
    });
    var questionIndex = getItem(2);
    quizSetup(questionIndex);
    $('.ansBtn').click(function(e){
        userAnswer[questionIndex+1] = (parseInt($('input[name="optradio"]:checked').val()));
        questionIndex = getItem(2);
        console.log(rightAnswer.length);
        console.log(questionIndex);
        console.log(userAnswer);
        if(rightAnswer.length - 2 >= questionIndex ){
            quizSetup(questionIndex+1);
        }
    });
});