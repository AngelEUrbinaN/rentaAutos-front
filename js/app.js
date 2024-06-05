const loginForm = document.getElementById('loginForm') || null 
const registrarForm = document.getElementById('registrarForm') || null
const signUpButton = document.getElementById('signUp') || null

document.addEventListener('DOMContentLoaded', function () {
  // Limpiar el localStorage
  localStorage.clear();
});

if (loginForm) {
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault() //para hacer refresh
    const form = new FormData(loginForm)

    fetch('../rentaAutos-back/index.php', {
      method: 'POST',
      body: form
    })
    .then((response) => response.json())
    .then ((res) => {
      if (res.message === 'Inicio Satisfactorio') {
        localStorage.setItem("userID",res.data.usu_id)
        window.location.href = `../rentaAutos-front/home.html`
    }
    })
    .catch((err) => {
      console.log('@@ err =>', err)
    }) 
  })
}

if (registrarForm){
  registrarForm.addEventListener('submit', (event) => {
    event.preventDefault() //para hacer refresh
    const password = document.getElementById('password').value
    const fechaNacimientoInput = document.getElementById('fechaNacimiento').value
    const confirmPassword = document.getElementById('confirmPassword').value
    const telefono = document.getElementById('telefono').value
    const fechaNacimiento = new Date(fechaNacimientoInput)
    const fechaActual = new Date()

    let edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear()
    const mes = fechaActual.getMonth() - fechaNacimiento.getMonth()
    if (mes < 0 || (mes === 0 && fechaActual.getDate()< fechaNacimiento.getDate())){
      edad--
    }

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

    if (confirmPassword != password) {
      alert('Las contraseñas no coinciden')
      return
    }

    const form = new FormData(registrarForm)
  
    fetch('../rentaAutos-back/index.php', {
      method: 'POST',
      body: form
    })
    .then((response) => response.json())
    .then ((res) => {
      if (res.message === 'Usuario Registrado Satisfactoriamente') {
        window.location.href = '../rentaAutos-front/index.html'
    }
    })
    .catch((err) => {
      console.log('@@ err =>', err)
    })   
  })
}

if (signUpButton) {
  signUpButton.addEventListener('click', (event) => {
    event.preventDefault()
    window.location.href = './registrar.html'
  })
}