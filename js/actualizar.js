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

        const password = document.getElementById('password').value
        const fechaNacimientoInput = document.getElementById('fechaNacimiento').value
        const telefono = document.getElementById('telefono').value
        const fechaNacimiento = new Date(fechaNacimientoInput)
        const fechaActual = new Date()

        let edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear()
        const mes = fechaActual.getMonth() - fechaNacimiento.getMonth()
        if (mes < 0 || (mes === 0 && fechaActual.getDate()< fechaNacimiento.getDate())){
        edad--
        }

        console.log('Longitud de la contraseña: ', password.length)
        console.log('edad del usuario: ', edad)
        console.log('Número de teléfono: ', telefono)

        if (password.length < 8){
        alert('La contraseña debe contener al menos 8 caracteres')
        return
        }

        if (edad < 18 ){
        alert('Debes ser mayor edad para registrarte')
        return
        }

        if (telefono.length !== 10 || !/^\d{10}$/.test(telefono)) {
        alert('El teléfono debe contener 10 digitos')
        return
        }
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