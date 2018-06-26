require('dotenv').config();

// Initialize Firebase
const config = {
    apiKey: process.env.APIKEY,
    authDomain: process.env.AUTHDOMAIN,
    databaseURL: process.env.DATABASEURL,
    projectId: process.env.PROJECTID,
    storageBucket: process.env.STORAGEBUCKET,
    messagingSenderId: process.env.MESSAGINGSENDERID
};
firebase.initializeApp(config);

// Get elements
const txtEmail = document.getElementById('email_field');
const txtPassword = document.getElementById('password_field');
const btnLogin = document.getElementById('btnLogin');
const btnSignUp = document.getElementById('btnSignUp');
const btnLogout = document.getElementById('btnLogout');

// Add login event
btnLogin.addEventListener('click', e => {
    // Get email and pass
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();

    // Sign in
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));

    console.log(promise);
});

// Add signup event
btnSignUp.addEventListener("click", e => {
    // Get email and pass
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

// Add a realtime 
firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser) {
        console.log(firebaseUser);
        // Show logout btn
        btnLogout.classList.remove('hide');
    } else {
        console.log('not logged in');
        // Hide logout btn
        btnLogout.classList.add('hide');
    }
});

function logout() {
    firebase.auth().signOut();
}

//////////////////////////working code below////////////////////////

// function signIn() {
//     firebase.auth().signInWithPopup(provider).then(function (result) {
//         // This gives you a Google Access Token. You can use it to access the Google API.
//         var token = result.credential.accessToken;
//         // The signed-in user info.
//         var user = result.user;
//         // ...
//         console.log(user.displayName);
//     }).catch(function (error) {
//         // Handle Errors here.
//         var errorCode = error.code;
//         var errorMessage = error.message;
//         // The email of the user's account used.
//         var email = error.email;
//         // The firebase.auth.AuthCredential type that was used.
//         var credential = error.credential;
//         // ...
//     });
// }

// firebase.auth().onAuthStateChanged(function (user) {
//     if (user) {
//         // User is signed in.
//         document.getElementById("user_div").style.display = "block";
//         document.getElementById("login_div").style.display = "none";

//         var user = firebase.auth().currentUser;

//         if(user != null) {
//             var email_id = user.email;

//             document.getElementById("user_para").innerHTML = "Welcome User: " + email_id;
//         }
//     } else {
//         // No user is signed in.
//         document.getElementById("user_div").style.display = "none";
//         document.getElementById("login_div").style.display = "block";
//     }
// });

// function login() {

//     var userEmail = document.getElementById("email_field").value;
//     var userPass = document.getElementById("password_field").value;

//     firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function (error) {
//         // Handle Errors here.
//         var errorCode = error.code;
//         var errorMessage = error.message;
//         // ...
//     });


//     window.alert("Error: " + errorMessage);
// }

// function logout() {
//     firebase.auth().signOut();
// }

