//creando archivo común para no sobreescribir lo mismo en cada html
var config = {
    apiKey: "AIzaSyAWALtnmZiS_d4KhjIc79op-M8D4KDYNLo",
    authDomain: "trabun-socialmedia.firebaseapp.com",
    databaseURL: "https://trabun-socialmedia.firebaseio.com",
    projectId: "trabun-socialmedia",
    storageBucket: "trabun-socialmedia.appspot.com",
    messagingSenderId: "85322774721"
};
firebase.initializeApp(config);

    // let loginGoogle = document.querySelectorAll('#google-login');
    // let loginFb = document.querySelectorAll('#fb-login');
    // let signOut = document.querySelectorAll('#sign-out');
    // let loginEmail = document.querySelectorAll('#email-login');
    // let email = document.querySelectorAll('#email');
    // let password = document.querySelectorAll('#password');

    // let username = document.querySelectorAll('.displayUsername');
    // let userEmail = document.querySelectorAll('#displayEmail');
    // let profilePhoto = document.querySelectorAll('#profile-photo');


// funcion para Ingresar con usuario y contraseña ya hecho el registro
function signIn(){
    let email1=document.getElementById("email1").value;
    let password1=document.getElementById("password1").value;
    

    firebase.auth().signInWithEmailAndPassword(email1, password1)
   .then(user => {
        window.location.href = 'main.html';  
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        console.log(errorCode)
        console.log(errorMessage)
      });
}


function observador(){
    firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log ("Existe usuario activo")
    } else {
      console.log("No existe usuario activo")
    }
    });
}

observador();

function signInWithGoogle(){
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
    .then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // // The signed-in user info.
        var user = result.user;
        firebase.database().ref('users/' + user.uid).set({
            name: user.displayName,
            email: user.email,
            uid: user.uid,
            profilePhoto: user.photoURL
          }).then(user => {
            window.location.href = 'main.html';
          });
       
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
        console.log (error)
      });
}

function signInWithFacebook(){
    var provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('public_profile');
    firebase.auth().signInWithPopup(provider)
    .then(function(result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
        firebase.database().ref('users/' + user.uid).set({
            name: user.displayName,
            email: user.email,
            profilePhoto: user.photoURL,
          }).then(user => {
            window.location.href = 'main.html';
          });
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

//(funcionalidad boostrap&jquery)
$(function() {
    $('[data-toggle="popover"]').popover();
  });

  $('.popover-dismiss').popover({
    trigger: 'focus'
  });



//Link para tests
  module.exports = loginv2;