/* global $ */
var provider = new firebase.auth.GoogleAuthProvider();
function handleClick(event) {
    var boxId=event.target.id.charAt(1);
    var currentId=document.getElementsByClassName("tabin")[0].id.charAt(7);
    if(boxId!=currentId) {
        boxId="content"+boxId;
        currentId="content"+currentId;
        console.log(currentId+" "+boxId);
        
        document.getElementById(currentId).className="tabout";
        setTimeout(function() {
            document.getElementById(boxId).className="tabin";
        },150);
    }
}
function createUser() {
    console.log("clicked");
    console.log(document.getElementById("Username").value+" "+ document.getElementById("Password").value);
    firebase.auth().createUserWithEmailAndPassword(document.getElementById("Username").value, document.getElementById("Password").value);
    console.log("SUCCESS");
    document.getElementById("successBool").innerHTML="Success";
}
function createUserwGoogle() {
    
    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log(user);
        window.location.replace("survey.html");
        document.getElementById("penguin").innerHTML="Welcome, "+user.displayName;
        // ...
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });
}
window.onload=function() {
    setTimeout(function() {
    document.getElementById("content0").className="tabin";
    for(var i=1; i<5; i++) {
        var f = "content"+i;
        document.getElementById(f).className="tabout";
    }
    },1000);
}
function signIn() {
    firebase.auth().signInWithEmailAndPassword(document.getElementById("Username2").value, document.getElementById("Password2").value).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });
    window.location.replace("survey.html");
}