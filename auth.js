var scriptURL = "https://script.googleusercontent.com/macros/echo?user_content_key=pv30WIvh1efha4CiOWCAMl8Ims6nQvIx_55rsfi-Zrq6zOfbj9LVtIaLNMbLgBnXSxzOk3Ba4wOBbNAhX28i8aHovEZWy6Tmm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnKiVETP14lrnNGc4z7UnwmNyedJhO6PM3vO-zqYvLvh_E4zaIQ6VYVOWGGwbYae5_XiHpVOAX1lu&lib=MAx7Fe9quXaZoFeo9CoNgg_6H1RmW7M3x";
$(document).ready(function(){
    $('.login-form').submit(function(e){
        e.preventDefault();

    });

    
});
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);
    let user = {
        name: profile.getName(),
        email: profile.getEmail(),
        id: profile.getId(),
    } 

    $.ajax({
        method: "POST",
        url: scriptURL,
        data: user,
        "async": true,
        "crossDomain": true,
        "headers": {
          "accept": "application/json",
          "Access-Control-Allow-Origin":"*"
        },
        success : function(response) {
            console.log(response);
        }
    })
}