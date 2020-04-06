var handleRequest = function(user, type){
    var ajaxRequest = function(user){
        var scriptURL = "https://script.google.com/macros/s/AKfycbyCxnTylZQBaf1DhaWvjF1g8FMlP_315wTIWRwbHBF8yMio56Fe/exec";
        // user = { data : user };
        $.ajax({
            type: "POST",
            url: scriptURL,
            async: true,
            data: user,
            headers: {
                // 'Content-Type': 'text/plain;charset=utf-8',
                'Content-type': 'application/x-www-form-urlencoded',
                // 'Content-type': 'application/json',
            },
            beforeSuccess: function(){
                setTimeout(function(){ alert("Hello"); }, 5000);
            },
            success: function (data)
            {
                switch(type){
                    case 'login':
                        (localStorage.getItem('login') == 'undefined') ? localStorage.setItem('login', '0') : '';
                        (localStorage.getItem('token') == 'undefined') ? localStorage.setItem('token', '') : '';
                        if(data[type]){
                            localStorage.setItem('login', '1');
                            data.token.length && localStorage.setItem('token', data.token);
                        }
                        alert(data.result);
                        return data;

                        break;
                    case 'signup':  
                        (localStorage.getItem('login') == 'undefined') ? localStorage.setItem('login', '0') : '';
                        (localStorage.getItem('token') == 'undefined') ? localStorage.setItem('token', '') : '';
                        console.log(data[type]);
                        if(data[type]){
                            data.token.length && localStorage.setItem('token', data.token);
                            (localStorage.getItem('login') == '0') && (window.location.href = '../');
                        }
                        alert(data.result);
                        return data;
        
                        break;
                    default:
                        console.log('Case default');    
                }
                console.log(data);
            }
        });
    } 
    ajaxRequest(user);
    
    
}
$(document).ready(function(){
    
    /**
     * @param {send request URL} url reqired
     * @param {Type for the request} type reqired
     */
    
    $('.login-form').submit(function(e){
        e.preventDefault();
        let user = {
            name: 'login',
            email: $('.login-form #email').val(),
            id: $('.login-form #password').val(),
            action: 'login',
        } 
        handleRequest(user, 'login');
    });

    $('.signup-form').submit(function(e){
        e.preventDefault();
        let user = {
            name: $('.signup-form #name').val(),
            email: $('.signup-form #email').val(),
            id: $('.signup-form #password').val(),
            action: "signup",
        } 
        console.log(user);
        handleRequest(user, 'signup');
    });

    
    
});

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    // console.log('Name: ' + profile.getName());
    // console.log('Image URL: ' + profile.getImageUrl());
    // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    var id_token = googleUser.getAuthResponse().id_token;
    // console.log("ID Token: " + id_token);
    let user = {
        name: profile.getName(),
        email: profile.getEmail(),
        id: profile.getId(),
        action: 'googleSignin',
    } 
    console.log(user);

    handleRequest(user, 'login');

}