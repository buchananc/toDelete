// Initialize Firebase
// var apiKey = config.apiKey;
// var authDomain = config.authDomain;
// var databaseURL = config.databaseURL;
// var projectId = config.projectId;
// var storageBucket = config.storageBucket;
// var messagingSenderId = config.messagingSenderId;

var config = {
    apiKey: "AIzaSyA2_tnNsCgwOh6gNQIhuBPu5dzrtdctTEU",
    authDomain: "in-a-pinch-project-2.firebaseapp.com",
    databaseURL: "https://in-a-pinch-project-2.firebaseio.com",
    projectId: "in-a-pinch-project-2",
    storageBucket: "in-a-pinch-project-2.appspot.com",
    messagingSenderId: "674290992138"
};
firebase.initializeApp(config);
// Get a reference to the database service
var database = firebase.database(); //added

// Get elements
const userEmail = document.getElementById('userEmail');
const userPassword = document.getElementById('userPassword');
const txtUsername = document.getElementById('txtUsername');
const txtEmail = document.getElementById('txtEmail');
const txtPassword = document.getElementById('txtPassword');
const btnLogin = document.getElementById('btnLogin');
const btnRegister = document.getElementById('btnRegister');
const btnLogout = document.getElementById('btnLogout');


/////////////////////////////////////////////////////// 
//Add login event
///////////////////////////////////////////////////////

btnLogin.addEventListener('click', e => {
    // Get email and pass
    const email = userEmail.value;
    const pass = userPassword.value;
    const auth = firebase.auth();

    // Sign in
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(function (error) {
        // Handle error
        var errorCode = error.code;
        var errorMessage = error.message;

        $("#exampleModal").modal();
        // alert("You look a little flushed! The email you entered is not correct. Try again!");
        console.log(errorMessage);
    });
    // alert(errorMessage);
    console.log(errorMessage);
});

///////////////////////////////////////////////////////
// Facebook SignIn
// https://developers.facebook.com/docs/facebook-login/permissions
// User Attributes that can be used: (email, user_age_range, user_birthday, user_friends, user_gender, user_hometown, user_link, user_location)
// Fields that are properties on the User object: (id, first_name, last_name, middle_name, name, name_format, picture, short_name)
// The id field is an app-scoped ID.
///////////////////////////////////////////////////////
// Initialize Facebook
var provider = new firebase.auth.FacebookAuthProvider();

// Gives the basic version of the Facebook SDK
window.fbAsyncInit = function () {
    FB.init({
        appId: '416268245554196',
        cookie: true,
        xfbml: true,
        version: 'v3.0'
    });

    // FB.AppEvents.logPageView();

    // FB login status
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });

};

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function statusChangeCallback(response) {
    if(response.status === 'connected'){
        console.log('Logged into FB and authenticated');
    } else {
        console.log('FB Not Authenticated');
    }
}

// Callback to FB login btn
function checkLoginState() {
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
}



///////////////////////////////////////////////////////
// Add signup event
///////////////////////////////////////////////////////

btnRegister.addEventListener("click", e => {
    // Get email and pass
    // const username = txtUsername.value; //added
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();

    // Sign in
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));
});

btnLogout.addEventListener('click', e => {
    firebase.auth().signOut();
});


///////////////////////////////////////////////////////
// Add a realtime listener
///////////////////////////////////////////////////////

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        document.getElementById("user_div").style.display = "block";
        document.getElementById("main_div").style.display = "none";

        var user = firebase.auth().currentUser;

        if (user != null) {
            var email_id = user.email;

            document.getElementById("user_para").innerHTML = "Welcome User: " + email_id;
        }
    } else {
        // No user is signed in.
        console.log("not logged in");
        document.getElementById("user_div").style.display = "none";
        document.getElementById("main_div").style.display = "block";
    }
});


// firebase.auth().onAuthStateChanged(firebaseUser => {
//     if (firebaseUser) {
//         console.log(firebaseUser);
//         // Show logout btn
//         btnLogout.classList.remove('hide');
//     } else {
//         console.log('not logged in');
//         // Hide logout btn
//         btnLogout.classList.add('hide');
//     }
// });