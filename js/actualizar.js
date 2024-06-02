let idUser = document.getElementById('id')
let nombre = document.getElementById('nombre')
let apellidos = document.getElementById('apellidos')
let fechaNacimiento = document.getElementById('fechaNacimiento')
let genero = document.getElementById('genero')
let correo = document.getElementById('correo')
let telefono = document.getElementById('telefono')
let direccion = document.getElementById('direccion')
let passowrd = document.getElementById('password')

const actualizarForm = document.getElementById('actualizarForm') || null
const userID = localStorage.getItem('userID')

const idForm = document.getElementById('idFormUpdate')
let inputId = document.getElementById('idUpdate')
let inputAccion = document.getElementById('accion')

document.addEventListener('DOMContentLoaded', () => {

    if (userID) {
        console.log('@@ id => ', userID)
        obtenerDatosUsuario(userID)
    }
})

const obtenerDatosUsuario = id => {
    inputId.value = id
    inputAccion.value = 'actualizar'
    const form = new FormData(idForm)
    
    fetch('../rentaAutos-back/index.php', {
        method: 'POST',
        body: form
    })
    .then((response) => response.json())
    .then((data) => {
        console.log('@@@ data => ', data)
        if (data.success) {
            idUser.value = data.user.usu_id
            nombre.value = data.user.usu_nombre
            apellidos.value = data.user.usu_apellidos
            fechaNacimiento.value = data.user.usu_fechaNacimiento
            genero.value = data.user.usu_genero
            correo.value = data.user.usu_correo
            telefono.value = data.user.usu_telefono
            direccion.value = data.user.usu_direccion
            passowrd.value = data.user.usu_password
        }
    })
    .catch((err) => {
        console.log('@@@ err => ', err)
    })
}

if (actualizarForm){
    actualizarForm.addEventListener('submit', (event) => {
      event.preventDefault() //para hacer refresh
      const form = new FormData(actualizarForm)
    
      fetch('../rentaAutos-back/index.php', {
        method: 'POST',
        body: form
      })
      .then((response) => response.json())
      .then ((res) => {
        console.log('@@ res =>', res)
        if (res.message === 'Usuario Actualizado Satisfactoriamente') {
          window.location.href = '../rentaAutos-front/perfil.html'
      }
      })
      .catch((err) => {
        console.log('@@ err =>', err)
      })   
    })
}