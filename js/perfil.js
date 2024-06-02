let idUser = document.getElementById('id')
let nombreCompleto = document.getElementById('nombreCompleto')
let nombreYApellidos = document.getElementById('nombreYApellidos')
let fechaNacimiento = document.getElementById('fechaNacimiento')
let genero = document.getElementById('genero')
let correo = document.getElementById('correo')
let telefono = document.getElementById('telefono')
let direccion = document.getElementById('direccion')

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
            nombreCompleto.value = data.user.usu_nombre + " " + data.user.usu_apellidos
            nombreYApellidos.value = data.user.usu_nombre + " " + data.user.usu_apellidos 
            fechaNacimiento.value = data.user.usu_fechaNacimiento
            genero.value = data.user.usu_genero
            correo.value = data.user.usu_correo
            telefono.value = data.user.usu_telefono
            direccion.value = data.user.usu_direccion
        }
    })
    .catch((err) => {
        console.log('@@@ err => ', err)
    })
}

window.onload = () => {
    if (userID) {
        console.log('@@ id => ', userID)
        obtenerDatosUsuario(userID)
    }
}


const logout = () => {
    // Eliminar el ID del usuario de localStorage
    localStorage.removeItem('userID');
    
    // Redireccionar al usuario a la página de inicio de sesión
    window.location.href = 'login.html';
  }