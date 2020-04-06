var scriptURL = "https://script.google.com/macros/s/AKfycbyCxnTylZQBaf1DhaWvjF1g8FMlP_315wTIWRwbHBF8yMio56Fe/exec";
$(document).ready(function(){
    $('.resultBtn').click(function(){
        $(this).text('Loading...');
        $(this).attr('disabled', 'disabled')
        var request = scriptURL + '?action=result' 
        $.getJSON( request, function( data ) {
            return data;
        }).done(function(data){
            $('.resultBtn').hide();
            
            data = data.sort(function(a,b){
               return ( parseInt(a[2]) > parseInt(b[2]) ) ? -1 : 1;
            });
            data.forEach( function(row , index){
                $('.resultTable tbody').append(
                    `<tr>
                        <th scope="row">${index+1}</th>
                        <td>${row[1]}</td>
                        <td>${row[2]}</td>
                    </tr>`
                );
            });
            $('table').fadeIn(400);    
        });
    });
    function getItem( type = 0 ){
        switch(type){
            case 1:
                return JSON.parse(localStorage.getItem('quiz'));

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

    var quiz = getItem(1);
    var userAnswer = getItem(3);

    console.log(quiz)
    if(userAnswer.length>1){    
        $('.scoreTable').show();
        quiz.forEach(function(value, index){
            $('.scoreTable tbody').append(
                `<tr>
                    <th scope="row">${index+1}</th>
                    <td>${value.question}</td>
                    <td>${value["answer".concat(value.RightAnswer)]  }</td>
                    <td>${value["answer".concat(userAnswer[index])] }</td>
                </tr>`
            );
        });
    }else{
        alert("Please Attempt the Quiz to See results..")
    }

});