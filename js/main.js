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
const listaMensajes = document.getElementById("post");
const listaComentarios = document.getElementById("comentarios");

// Ejecución eventos
eventListeners();

function eventListeners(){
    //Post
    //cuando se envia el formulario
    document.getElementById("comparte").addEventListener("click", agregarPublicacion);
    //Borrar post
    document.addEventListener("click", borrarPublicacion);
    // Contenido cargado
    document.addEventListener("DOMContentLoaded", localStorageListo);

    //Comentarios
    //Cuando se envían comentarios
    document.getElementById("comenta").addEventListener("click", agergarComentarios);
    //Borrar comentarios
    document.addEventListener("click", borrarComentario);
    //Cargar comentarios
    document.addEventListener("DOMContentLoaded", localStorageComentariosListo);
}

// Funciones
// Generar elementos del DOM
function generarDom(post, comentario){
    //Crear elementos post
  const itemPost = document.createElement("div");
  const parrafo = document.createElement("p");
  const textPost = document.createTextNode(post);
  const botonBorrar = document.createElement("button");
  const textBoton = document.createTextNode("X")

  //Crear elementos comentarios
  const itemComment = document.createElement("div");
  const commentP = document.createElement("p");
  const textComment = document.createTextNode(comentario);
  const borrarComment = document.createElement("button");
  const textBtnComment = document.createTextNode("x");

 // Añadir atributos a elementos del Post
  itemPost.setAttribute("class", "col-12")
  parrafo.setAttribute("class", "d-inline-block")
  botonBorrar.setAttribute("class", "btn btn-dark");

  //Añadir atributos a elementos del comentario
  itemComment.setAttribute("class", "col-8")
  commentP.setAttribute("class", "d-inline-block")
  borrarComment.setAttribute("class", "btn btn-red");
 
  // añade texto al botón del post
  botonBorrar.appendChild(textBoton);
  // añade el mensaje al parrafo
  parrafo.appendChild(textPost);
  // añade mensaje a la lista
  itemPost.appendChild(parrafo);
  // añade el botón de borrar al mensaje
  itemPost.appendChild(botonBorrar);
  // añade item con mensaje y botón a contendor padre
  listaMensajes.appendChild(itemPost); 

 //añade texto al boton de commentarios
 borrarComment.appendChild(textBtnComment);
 //añade el comenatario al parrafo
 commentP.appendChild(textComment);
 //añade comentarios a la lista
 itemComment.appendChild(commentP);
 // añade el boton de borrar comentario
 itemComment.appendChild(borrarComment);
 //añade item con comentarios y boton a contenedor padre
 listaComentarios.appendChild(itemComment);
}


// añadir post al documento
function agregarPublicacion(){
     // leer el valor de textarea
    const mensajes = document.getElementById("cajaPost").value;
    // crear elementos en el DOM
    generarDom(mensajes)
    // añadir a Local Storage
    agregarMensajesLocalStorage(mensajes);
}
//Añadir comentarios al post
function agergarComentarios(){
    //leer el valor del textarea
    const comentario = document.getElementById("cajaComentario").value;
    //crea elementos en el DOM
    generarDom(comentario)
    //Añadir a Local Storage
    agregarComentariosLocalStorage(comentario);
}


//eliminar post del DOM
function borrarPublicacion(e) {
  if(e.target.className === "btn btn-dark"){
      e.target.parentElement.remove();
      borrarMensajesLocalStorage(e.target.parentElement.innerText);
  }
}
//Eliminar comentarios del DOM
function borrarComentario(e){
    if(e.target.className === "btn btn-red"){
        e.target.parentElement.remove();
        borrarComentarioLocalStorage(e.target.parentElement.innerText);
    }
}


// mostrar datos de LocalStorage en la pagina
function localStorageListo(){
    let posts;
    posts = obtenerMensajesLocalStorage();
    posts.forEach(function(mensajes){
        generarDom(mensajes);
    });
}
//Mostrar datos de LocalStorage comentarios en la pagina
function localStorageComentariosListo(){
    let comentarios;
    comentarios = obtenerComentariosLocalStorage();
    comentarios.forEach(function(comment){
        generarDom(comment)
    });
} 


// agrega mensaje a local storage
function agregarMensajesLocalStorage(textoMsj){
    let mensajes = obtenerMensajesLocalStorage();
    // añadir mensaje al arreglo
    mensajes.push(textoMsj);
    // convierte arreglo a string para añadir a local storage
    localStorage.setItem("mensajes",JSON.stringify(mensajes));
}
//Agrega comentarios a LocalStorage
function agregarComentariosLocalStorage(textoCmmnt){
    let comentario = obtenerComentariosLocalStorage();
    //añadir comentario al arreglo
    comentario.push(textoCmmnt);
    //convierte arreglo a string para añadir a LocalStorage
    localStorage.setItem("comentario", JSON.stringify(comentario));
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
//comprobar elemntos en LocalStorage y retorne arreglo
function obtenerComentariosLocalStorage(){
    let comentario;
    //revisamos valores de LocalStorage
    if(localStorage.getItem("comentario") === null){
        comentario = [];
    }else{
        comentario = JSON.parse(localStorage.getItem("comentario"))
    }
    return comentario;
}


// eliminar mensajes de local storage
function borrarMensajesLocalStorage(posts) {
    //elimina la X del mensaje
    //la funcion recibe todo el texto del mensaje más la X y procede a cortar el texto, dejando solo el texto de la tarea, para eliminarla del localStorage
    let borrarPost = posts.substring(0, posts.length - 1);
    let posteo = obtenerMensajesLocalStorage();
    //en el forEach, compara el mensaje recibido con lo existente en local storage y quita la tarea a eliminar
    posteo.forEach(function(textoArr, index){
        if(borrarPost === textoArr) {
            posteo.splice(index, 1);
        }
    })
    //convierte el areglo nuevo (con la tarea eliminada) en string para volver a guardarlo en local storage
   localStorage.setItem("posteo", JSON.stringify(posteo)); 
}
//Eliminar comentarios LocalStorage
function borrarComentarioLocalStorage(comments){
    //Elimina la x del comentario
    //la función recibe todo el texto del comentarios más la x y procede a cortar el texto, dejando solo el texto de la tarea, para eliminarla del Localstorage
    let borrarComment = comments.substring(0, comments.length - 1);
    let comentarios = obtenerComentariosLocalStorage();
    //en el forEach compara el comentario recibido con lo existente en local storage y quita el comentario a eliminar
    comentarios.forEach(function(textoArr, index){
        if(borrarComment === textoArr){
            comentarios.splice(index, 1);
        }
    })
    //Convierte el arreglo nuevo(con el comentario eliminado) en un string para volver a guardarlo en localStorage
    localStorage.setItem("comentarios", JSON.stringify(comentarios));
}

