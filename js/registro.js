 // variables a validar y a  utilizar para validación de registro.

  let  nameInput = document.getElementById('inputNombre');
  let  validarName = false;
  let  lastInput = document.getElementById('inputApellido');
  let  validarLastName = false;
  let  emailInput = document.getElementById('inputEmail');
  let  validarEmail = false;
  let  passwordInput = document.getElementById('inputPassword');
  let  validarPassword = false;
  let  regBtn = document.getElementById('btnCrearCuenta');

 //para construir estructura de control
  function validacionRegistroExitoso() {
    if (validarName && validarLastName && validarEmail && validarPassword) {
      regBtn.removeAttribute('disabled');
    }
  }

  function noValidarRegistroFallido() {
    regBtn.setAttribute('disabled', true);
  }

// Funciones para los input de nombre, apellido,email y password
//validacion Nombre
   
   nameInput.addEventListener('input', function() {
    console.log('validando nombre');
    if (nameInput.val().length >= 3) {
      validarName = true;
      validacionRegistroExitoso();
      nameInput.popover('hide');
      console.log('Nombre valido');
    } else {
      noValidarRegistroFallido();
      nameInput.popover('show');
    }
  });

//validacion Apellido

  lastInput.addEventListener('input', function() {
    console.log('validando apellido');
    if (lastInput.val().length >= 3) {
      validarLastName = true;
      validacionRegistroExitoso();
      lastInput.popover('hide');
      console.log('Apellido valido');
    } else {
      noValidarRegistroFallido();
      lastInput.popover('show');
    }
  });


//validacion Email
  emailInput.addEventListener('input', function() {
    console.log('escribiendo email');
    let patron =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    
    if (patron.test(emailInput.val())) {
      validarEmail = true;
      validacionRegistroExitoso();
      emailInput.popover('hide');
      console.log('Email');
    } else {
      noValidarRegistroFallido();
      emailInput.popover('show');
    }
  });

  //validacion Contraseña

  passwordInput.addEventListener('input', function() {
    console.log('escribiendo password');
    let patronPass = /^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z\0-9]{6,}$/;
    
    if (patronPass.test(passwordInput.val())) {
      validarPassword = true;
      validacionRegistroExitoso();
      passwordInput.popover('hide');
      console.log('Password');
    } else {
      noValidarRegistroFallido();
      passwordInput.popover('show');
    }
  });
  
  //cuando se cumplen todas las validaciones se activa la fx
  function register() {
    let emailRegister = emailInput.val();
    let passwordRegister = passwordInput.val();

    // Registro de nuevos usuarios con firebase
    firebase.auth().createUserWithEmailAndPassword(emailRegister,passwordRegister)
    .then(function(){
      verificando()
    }).then(function(user) {
      let username = nameInput.val() + ' ' + lastInput.val();    
      return user.updateProfile({
        displayName: username,
        photoURL:'/img/user-profile.png'
      });
    }).catch(function(error) {
    // Handle Errors here.
    let errorCode = error.code;
    let errorMessage = error.message;
    // ...
    alert(errorMessage)
    });

  function verificando(){
    var user = firebase.auth().currentUser;
    user.sendEmailVerification()
    .then(function() {
     console.log('enviando email')
    }).catch(function(error) {
        console.log(error)
    });
  }

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      firebase.database().ref('users/' + user.uid).set({
      name: user.displayName,
      email: user.email,
      uid: user.uid,
      profilePhoto: user.photoURL
    }).then(user => {
      window.location.href ='loginv2.html';
    }); 
    console.log('User is registered.');
  } else {
    console.log('Registration failed.');   
  }
  });
}

//funcionalidad de bootstrap con jquery
$(function() {
  $('[data-toggle="popover"]').popover();
});

$('.popover-dismiss').popover({
  trigger: 'focus'
});
// ------------------------------------------------------------