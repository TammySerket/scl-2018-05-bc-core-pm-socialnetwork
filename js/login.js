window.onload = ()=>{
    firebase.auth().onAuthStateChanged((user)=>{
       if(user){
        login.style.display = "block"
        logout.style.display = "none"
        username.innerText = user.displayName;
       }else{
         /*login.style.display = "none";
         logout.style.display = "block"*/
       } 
       console.log("user >"+JSON.stringify(user));
    });
}

//Registro
function registerWithFirebase(){
        
    const emailValue = emailRegister.value;
    const passwordValue = passwordRegister.value;

    firebase.auth().createUserWithEmailPassword(emailValue, passwordValue)
      .then(()=>{
          console.log("Usuario creado")
      })
      .catch((error)=>{
          console.log("Error de Firebase > código >"+error.code);
          console.log("Error de Firebase > Mensaje >"+error.mensaje);
      });
}
//Login
function loginWithFirebase(){
    const emailValue = email.value;
    const passwordValue = password.value;

    firebase.auth().signWithEmailAndPassword(emailValue, passwordValue)
      .then(()=>{
          console.log("Sesión Iniciada")
      })
      .catch((error)=>{
        console.log("Error de Firebase > código >"+error.code);
        console.log("Error de Firebase > Mensaje >"+error.mensaje);
      });
}

function logoutWithFireabse(){
    firebase.auth().signOut()
      .then(()=>{
          console.log("Finalisaste Sesion");
      })
      .catch((error)=>{
        console.log("Error de Firebase > código >"+error.code);
        console.log("Error de Firebase > Mensaje >"+error.mensaje);
      });
}

function facebookLoginWithFirebase(){
    const provider = new firebase.auth.FacebookAuthProvider(); // creamos un nuevo objeto 

    provider.setCustomParameters({ // le decimos que haga un login con facebook y enlace un popup
        'display' : 'popup'
    });

    firebase.auth().signInWithPopup(provider)
        .then(()=>{
            console.log("Login con facebook exitoso");
        })
        .catch((error)=>{
            console.log("Error de firebase > Código > "+error.code); //error.code nos mostrará el código de error para informarnos qué pasó
            console.log("Error de firebase > Mensaje > "+error.message); //error.message nos mostrará el mensaje de firebase del mismo error
        });                        
}
