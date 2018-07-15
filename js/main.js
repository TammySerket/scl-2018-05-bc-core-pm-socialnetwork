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
