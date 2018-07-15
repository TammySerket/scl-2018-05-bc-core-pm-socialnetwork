// window.onload = ()=>{
//     firebase.auth().onAuthStateChanged(function(user) {
//         if (user) {
//           // User is signed in.
//         } else {
//           // No user is signed in.
//         }
//       });
// }

// //Registro
// function registerWithFirebase(){
        
//     const emailValue = emailRegister.value;
//     const passwordValue = passwordRegister.value;

//     firebase.auth().createUserWithEmailAndPassword(emailValue, passwordValue)
//       .then(()=>{
//           console.log("Usuario creado")
//       })
//       .catch((error)=>{
//           console.log("Error de Firebase > código >"+error.code);
//           console.log("Error de Firebase > Mensaje >"+error.mensaje);
//       });
// }
// //Login
// function loginWithFirebase(){
//     const emailValue = email.value;
//     const passwordValue = password.value;

//     firebase.auth().signInWithEmailAndPassword(emailValue, passwordValue)
//       .then(()=>{
//           console.log("Sesión Iniciada")
//       })
//       .catch((error)=>{
//         console.log("Error de Firebase > código >"+error.code);
//         console.log("Error de Firebase > Mensaje >"+error.mensaje);
//       });
// }

// function logoutWithFireabse(){
//     firebase.auth().signOut()
//       .then(()=>{
//           console.log("Finalisaste Sesion");
//       })
//       .catch((error)=>{
//         console.log("Error de Firebase > código >"+error.code);
//         console.log("Error de Firebase > Mensaje >"+error.mensaje);
//       });
// }

// function facebookLoginWithFirebase(){
//     const provider = new firebase.auth.FacebookAuthProvider(); // creamos un nuevo objeto 

//     provider.setCustomParameters({ // le decimos que haga un login con facebook y enlace un popup
//         'display' : 'popup'
//     });

//     firebase.auth().signInWithPopup(provider)
//         .then(()=>{
//             console.log("Login con facebook exitoso");
//         })
//         .catch((error)=>{
//             console.log("Error de firebase > Código > "+error.code); //error.code nos mostrará el código de error para informarnos qué pasó
//             console.log("Error de firebase > Mensaje > "+error.message); //error.message nos mostrará el mensaje de firebase del mismo error
//         });                        
// }


function register(){
    let email=document.getElementById('email').value;
    let password=document.getElementById('password').value;
    console.log(email)
    console.log(password)

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
    console.log(errorCode)
    console.log(errorMessage)
    });

}