// Put this at the top of index page
if ( document.cookie.indexOf("CrewCentreSession=Valid")  == -1 ) {
    location.href = "./login/index.html";
}