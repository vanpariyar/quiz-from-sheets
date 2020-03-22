var scriptURL = "https://script.google.com/macros/s/AKfycbyCxnTylZQBaf1DhaWvjF1g8FMlP_315wTIWRwbHBF8yMio56Fe/exec";
$(document).ready(function(){
    var sendRequest = function(url, type){
        switch(type){
            case 'login':
                $.getJSON( url, function( data ) {
                    (localStorage.getItem('login') == 'undefined') ? localStorage.setItem('login', '0') : '';
                    (localStorage.getItem('token') == 'undefined') ? localStorage.setItem('token', '') : '';
                    if(data[type]){
                        localStorage.setItem('login', '1');
                        var result = data.result;
                        data.token.length && localStorage.setItem('token', data.token);
                    }
                    alert(result);
                    return data;
                });
                break;
            case 'signup':    
                $.getJSON( url, function( data ) {
                    (localStorage.getItem('login') == 'undefined') ? localStorage.setItem('login', '0') : '';
                    (localStorage.getItem('token') == 'undefined') ? localStorage.setItem('token', '') : '';
                    console.log(data[type]);
                    if(data[type]){
                        var result = data.result;
                        data.token.length && localStorage.setItem('token', data.token);    
                    }
                    alert(data.result);
                    return data;
                });
                break;
            default:
                console.log('Case default');    
        }
        
    }
    $('.login-form').submit(function(e){
        e.preventDefault();
        let user = {
            name: 'login',
            email: $('.login-form #email').val(),
            id: $('.login-form #password').val(),
        } 
        var url = scriptURL+"?id="+user.id+"&email="+user.email+"&name="+user.name+"&action=login";
        sendRequest(url, 'login');
    });

    $('.signup-form').submit(function(e){
        e.preventDefault();
        let user = {
            name: $('.signup-form #name').val(),
            email: $('.signup-form #email').val(),
            id: $('.signup-form #password').val(),
        } 
        var url = scriptURL+"?id="+user.id+"&email="+user.email+"&name="+user.name+"&action=signup";
        sendRequest(url, 'signup');
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
        id: profile.id_token(),
    } 

    var url = scriptURL+"?id="+user.id+"&email="+user.email+"&name="+user.name+"&action=login";
    $.getJSON( url, function( data ) {
        console.log(data);
        return data;    
    });

}
