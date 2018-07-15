function register(){
    let email=document.getElementById('email').value;
    let password=document.getElementById('password').value;
    console.log(email)
    console.log(password)

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function(){
        verificando()
    })
    .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
    console.log(errorCode)
    console.log(errorMessage)
    });

}

// funcion para Ingresar con usuario y contraseña ya hecho el registro
function signIn(){
    let email1=document.getElementById('email1').value;
    let password1=document.getElementById('password1').value;
    console.log(email1)
    console.log(password1)

    firebase.auth().signInWithEmailAndPassword(email1, password1)
    .then (function(){
        window.location.href = 'main.html';
    })
    .catch(function(error) {
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
      
    // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        console.log(emailVerified)
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
    // ...
    } else {
      console.log("No existe usuario activo")
    }
    });

}

observador();



function signOut(){
    firebase.auth().signOut()
    .then(function (){
        console.log('Cerrando Sesion...')
    })
    .catch(error=>{
        console.log(error)
    })
}

function verificando(){
    var user = firebase.auth().currentUser;
    user.sendEmailVerification()
    .then(function() {
     console.log('enviando email')
    }).catch(function(error) {
        console.log(error)
});
}