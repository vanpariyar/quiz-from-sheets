var scriptURL = "https://script.google.com/macros/s/AKfycbyCxnTylZQBaf1DhaWvjF1g8FMlP_315wTIWRwbHBF8yMio56Fe/exec";
$(document).ready(function(){
    $('.resultBtn').click(function(){
        $(this).text('Loading...');
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
});