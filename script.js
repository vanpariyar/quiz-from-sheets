$(document).ready(function(){
    //Prevent submit to form of user
    $('button[type="submit"]').click(function(e){
        e.preventDefault();        
    });

    /**
     *                  
     * @param {type} type number
     * @param {data} data JSON
     */
    function setItem( type , data ){
        switch(type){
            case 1:
                localStorage.setItem('quiz', JSON.stringify(data));
                return true;

            default:
                return false;
        }
    }
    function getItem( type ){
        switch(type){
            case 1:
                return JSON.parse(localStorage.getItem('quiz'));
                
            default:
                return false;   
        }
    }
    /* ---------------------------------------------------------------------------- */

    if (typeof(Storage) !== "undefined") {
        $.getJSON( "https://script.googleusercontent.com/macros/echo?user_content_key=pv30WIvh1efha4CiOWCAMl8Ims6nQvIx_55rsfi-Zrq6zOfbj9LVtIaLNMbLgBnXSxzOk3Ba4wOBbNAhX28i8aHovEZWy6Tmm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnKiVETP14lrnNGc4z7UnwmNyedJhO6PM3vO-zqYvLvh_E4zaIQ6VYVOWGGwbYae5_XiHpVOAX1lu&lib=MAx7Fe9quXaZoFeo9CoNgg_6H1RmW7M3x", function( data ) {
            setItem(1, data);
        });
    } else {
    // Sorry! No Web Storage support..
    }
});