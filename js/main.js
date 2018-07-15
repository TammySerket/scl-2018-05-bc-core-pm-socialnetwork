  // Deslogearse
  function signOut(){
    firebase.auth().signOut()
    .then(function (){
        console.log('Cerrando Sesion...')
        window.location.href = 'loginv2.html';
    })
    .catch(error=>{
        console.log(error)
    })
}


//rescata elemento contenedor 
const listaMensajes = document.getElementById("post")

// Ejecución eventos
eventListeners();

function eventListeners(){
    //cuando se envia el formilario
    document.getElementById("comparte").addEventListener("click", agregarComentario);
    //Borrar comnetarios
    document.addEventListener("click", borrarComentario);
    // Contenido cargado
    document.addEventListener("DOMContentLoaded", localStorageListo);
}

// Funciones
// Generar elementos del DOM
function generarDom(mensaje){
    //Crear elementos
  const itemTarea = document.createElement('div');
  const parrafo = document.createElement('p');
  const textTarea = document.createTextNode(mensaje);
  const botonBorrar = document.createElement('button');
  const textBoton = document.createTextNode('X')

 // Añadir atributos a elementos
  itemTarea.setAttribute("class", "col-12")
  parrafo.setAttribute("class", "d-inline-block")
  botonBorrar.setAttribute("class", "btn btn-dark");
 
  // añade texto al botón
  botonBorrar.appendChild(textBoton);
  // añade el mensaje al parrafo
  parrafo.appendChild(textTarea);
  // añade mensaje a la lista
  itemTarea.appendChild(parrafo);
  // añade el botón de borrar al mensaje
  itemTarea.appendChild(botonBorrar);
  // añade item con mensaje y botón a contendor padre
  listaMensajes.appendChild(itemTarea); 
}

// añadir mensajes al documento
function agregarComentario(){
     // leer el valor de textarea
    const mensajes = document.getElementById("post").value;
    // crear elementos en el DOM
    generarDom(mensajes)
    // añadir a Local Storage
    agregarMensajesLocalStorage(mensajes);
}

//eliminar mensajes del DOM
function borrarComentario(e) {
  if(e.target.className === "btn btn-dark"){
      e.target.parentElement.remove();
      borrarMensajesLocalStorage(e.target.parentElement.innerText);
  }
}

// mostrar datos de LocalStorage en la pagina
function localStorageListo(){
    let comentarios;
    comentarios = obtenerMensajesLocalStorage();
    comentarios.forEach(function(mensajes){
        generarDom(mensajes);
    });
}

// agrega mensaje a local storage
function agregarMensajesLocalStorage(textoMsj){
    let mensajes = obtenerMensajesLocalStorage();
    // añadir mensaje al arreglo
    mensajes.push(textoMsj);
    // convierte arreglo a sring para añadir a local storage
    localStorage.setItem("mensajes",JSON.stringify(mensajes));
}

// comprobar elementos en local storage y retorne arreglo
function obtenerMensajesLocalStorage() {
   let mensaje;
   // revisamos valores de local storage
   if(localStorage.getItem("mensajes") === null) {
       mensaje = [];
   }else{
       mensaje = JSON.parse(localStorage.getItem("mensajes"))
   }    
   return mensaje;
}

// eliminar mensajes de local storage
function borrarMensajesLocalStorage(comments) {
    //elimina la X del mensaje
    //la funcion recibe todo el texto del mensaje más la X y procede a cortar el texto, dejando solo el texto de la tarea, para eliminarla del localStorage
    let borrarComments = comments.substring(0, comments.length - 1);
    let comentario = obtenerMensajesLocalStorage();
    //en el forEach, compara el mensaje recibido con lo existente en local storage y quita la tarea a eliminar
    comentario.forEach(function(textoArr, index){
        if(borrarComments === textoArr) {
            comentario.splice(index, 1);
        }
    })
    //convierte el areglo nuevo (con la tarea eliminada) en string para volver a guardarlo en local storage
   localStorage.setItem("mensajes", JSON.stringify(comentario)); 
}

