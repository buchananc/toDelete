// Initialize Firebase
    var config = {
        apiKey: "AIzaSyA2_tnNsCgwOh6gNQIhuBPu5dzrtdctTEU",
        authDomain: "in-a-pinch-project-2.firebaseapp.com",
        databaseURL: "https://in-a-pinch-project-2.firebaseio.com",
        projectId: "in-a-pinch-project-2",
        storageBucket: "in-a-pinch-project-2.appspot.com",
        messagingSenderId: "674290992138"
    };
    firebase.initializeApp(config); 

// Get elements
const txtEmail = document.getElementById('txtEmail');
const txtPassword = document.getElementById('txtPassword');
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
    promise.catch(function (error) {
        // Handle error
        var errorCode = error.code;
        var errorMessage = error.message;
                
    });
    console.log(error.message);
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

// Add a realtime listener
firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        console.log(firebaseUser);
        // Show logout btn
        btnLogout.classList.remove('hide');
    } else {
        console.log('not logged in');
        // Hide logout btn
        btnLogout.classList.add('hide');
    }
});
