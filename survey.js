var value1,value2,value3
function updateFireBase(use) {
    var toPush = firebase.database().ref("SurveyResponses/testUser/").set(
    {
        email:use.email,
        TutorScore:value1,
        HelpSubjects:value2,
        TeachingSubjects:value3
    });
    compareTutors();
}
function compareTutors() {
    var tutor = "";
    var val1,val2;
    firebase.database().ref("PeerResponses/Tutor1/").once().then(function(st) {
        val1=st.TutorScore;
    });
    firebase.database().ref("PeerResponses/Tutor2/").once().then(function(st) {
        val2=st.TutorScore;
    });
    console.log(val1+" "+val2+" "+value1);
    if(Math.abs(val2-value1)<Math.abs(val1-value1)) {
        tutor="Tutor2";
        alert("We found the perfect tutor for you! "+tutor+" had a TutorScore of "+val1+" compared to your score of "+value1+"!");
    }
    else {
        tutor="Tutor1";
        alert("We found the perfect tutor for you! "+tutor+" had a TutorScore of "+val2+" compared to your score of "+value1+"!");
    }
    
}
function initMap() {
    //https://developers.google.com/maps/documentation/javascript/distancematrix
}
function submitForm() {
    var score=0;
    if(document.getElementById("qu1").checked==1) {
        score++;
    }
    if(document.getElementById("qu3").checked==1) {
        score++;
    }
    var t= (document.getElementById("zero").value);
    if(t>5) {
        t=5;
    }
    if(t<0) {
        t=0;
    }
    score+=t;
    value1=score;
    value2=document.getElementById("subjtut").value.split(",");
    value3=document.getElementById("subjtea").value.split(",");
    var user;
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
        console.log("SUCC");
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        user = result.user;
        updateFireBase(user);
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