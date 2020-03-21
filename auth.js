var scriptURL = "https://script.google.com/macros/s/AKfycbyCxnTylZQBaf1DhaWvjF1g8FMlP_315wTIWRwbHBF8yMio56Fe/exec";
$(document).ready(function(){
    $('.login-form').submit(function(e){
        e.preventDefault();
        let user = {
            name: $('.login-form #email').val(),
            email: $('.login-form #email').val(),
            id: $('.login-form #password').val(),
        } 
        var url = scriptURL+"?id="+user.id+"&email="+user.email+"&name="+user.name+"&action=login";
        $.getJSON( url, function( data ) {
            console.log(data);
            return data;
        });
    });

    $('.signup-form').submit(function(e){
        e.preventDefault();
        let user = {
            name: "",
            email: $('.signup-form #email').val(),
            id: "fasdfsdf",
        } 
        var url = scriptURL+"?id="+user.id+"&email="+user.email+"&name="+user.name+"&action=login";
        $.getJSON( url, function( data ) {
            console.log(data);
            return data;
        });
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

    var url = scriptURL+"?id="+user.id+"&email="+user.email+"&name="+user.name+"&action=login";
//     var abc= jQuery.ajax({
//      crossDomain: true,
//      url: url ,
//      method: "GET",
//      dataType: "jsonp",
//      success: function(e,f){ 
//         alert(e);
//      },
//    });
    $.getJSON( url, function( data ) {
        console.log(data);
        return data;
    });

}