//rescata elemento contenedor 
const listaMensajes = document.getElementById("post")

// Ejecución eventos
eventListeners();

function eventListeners(){
    //cuando se envia el formilario
    document.getElementById("comparte").addEventListener("click", agregarComentario);
    //Borrar comnetarios
    document.addEventListener("click", borrarComentario):
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

  //
}
