// Get a reference to the database service
let database = firebase.database();
//funcionalidad de bootstrap con jquery
$(function () {
  $('[data-toggle="popover"]').popover();
});

$('.popover-dismiss').popover({
  trigger: 'focus'
});
// ------------------------------------------------------------
// variables a validar y a  utilizar para validación de registro.

let nameInput = document.getElementById('inputNombre');
let validarName = false;
let lastInput = document.getElementById('inputApellido');
let validarLastName = false;
let emailInput = document.getElementById('inputEmail');
let validarEmail = false;
let passwordInput = document.getElementById('inputPassword');
let validarPassword = false;
let regBtn = document.getElementById('btnCrearCuenta');

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
nameInput.addEventListener('input', function () {
  if (nameInput.value.length >= 3) {
    validarName = true;
    validacionRegistroExitoso();
  } else {
    noValidarRegistroFallido()
  }
});

//validacion Apellido
lastInput.addEventListener('input', function () {
  if (lastInput.value.length >= 3) {
    validarLastName = true;
    validacionRegistroExitoso();
  } else {
    noValidarRegistroFallido();
  }
});


//validacion Email
emailInput.addEventListener('input', function () {
  let patron = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (patron.test(emailInput.value)) {
    validarEmail = true;
    validacionRegistroExitoso();
  } else {
    noValidarRegistroFallido();
  }
});

//validacion Contraseña
passwordInput.addEventListener('input', function () {
  let patronPass = /^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z\0-9]{6,}$/;
  if (patronPass.test(passwordInput.value)) {
    validarPassword = true;
    validacionRegistroExitoso();
  } else {
    noValidarRegistroFallido();
  }
});

//cuando se cumplen todas las validaciones se activa la fx
function register() {
  let emailRegister = emailInput.value;
  let passwordRegister = passwordInput.value;
  let nombre = nameInput.value;
  let apellido = lastInput.value;

  // Registro de Usuario (NUEVO) con FIREBASE
  firebase.auth().createUserWithEmailAndPassword(emailRegister, passwordRegister)
    .then(function (user) {
      let username = `${nombre} ${apellido}`;
      user = firebase.auth().currentUser;
      user.updateProfile({
        displayName: username,
        photoURL: "url(https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png)"
      });
      console.log(user.displayName);
      console.log(user.photoURL);
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(error);
      // ...
    });

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      firebase.database().ref('users/' + user.uid).set({
        name: user.displayName,
        email: user.email,
        uid: user.uid,
        profilePhoto: user.photoURL
      }).then(user => {
        verificando();
        window.location.href = 'main.html';
      });
      console.log('User is registered.');
    } else {
      console.log('Registration failed.');
    }
  });

  function verificando() {
    let user = firebase.auth().currentUser;
    user.sendEmailVerification()
      .then(function () {
        console.log('enviando email');
      }).catch(function (error) {
        console.log(error);
      });
  }
}