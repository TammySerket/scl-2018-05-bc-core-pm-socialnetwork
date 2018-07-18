function register(){
    let email=document.getElementById('email1').value;
    let password=document.getElementById('password1').value;
    console.log(email)
    console.log(password)

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function(){
        document.getElementById(email).value="";
        document.getElementById(password).value="";
        verificando()
    })
    .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
    console.log(errorCode)
    alert(errorMessage)
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





function verificando(){
    var user = firebase.auth().currentUser;
    user.sendEmailVerification()
    .then(function() {
     console.log('enviando email')
    }).catch(function(error) {
        console.log(error)
});
}

function signInWithGoogle(){
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
    .then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // var token = result.credential.accessToken;
        // // The signed-in user info.
        // var user = result.user;
        var provider = new firebase.auth.GoogleAuthProvider();
        window.location.href = 'main.html';
        console.log (result.user);
        console.log('ya se ejecuto')
        
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
        console.log (error)
      });
     

}

function signInWithFacebook(){
    var provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('public_profile');
    firebase.auth().signInWithPopup(provider).then(function(result) {
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