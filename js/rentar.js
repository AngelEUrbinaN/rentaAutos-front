const userID = localStorage.getItem('userID')
const rentarForm = document.getElementById('rentarForm') || null
const diaInicio = document.getElementById('diaInicio')
const diaFin = document.getElementById('diaFin')
const costoEstimado = document.getElementById('costoEstimado')

// Establecer campos que usuario no altera
let idUser = document.getElementById('usuarioId')
let idAuto = document.getElementById('autoId')

// Establecer campos para obtener el costo por dia
const idFormCosto = document.getElementById('idFormCosto')
let costoDia = document.getElementById('costoDia')
let inputAutoId = document.getElementById('autID')
let inputAccion = document.getElementById('accion')

// Establecer campos para el auto
let asientos = document.getElementById('asientos')
let costoDiaNH = document.getElementById('costoDiaNH')
let modelo = document.getElementById('modelo')
let localizacion = document.getElementById('localizacion')
let transmision = document.getElementById('transmision')

document.addEventListener('DOMContentLoaded', async () => {
  // Obtener parámetros del URL
  const params = new URLSearchParams(window.location.search)
  const autoId = params.get('auto')

  if (userID) {
      idUser.value = userID
  }

  if (autoId) {
    idAuto.value = autoId
    // Establecer el costo por día con una promesa
    try {
      const autoData = await obtenerAutoData(autoId)
      pintarAutoData(autoData)
    } catch (error) {
      console.log('Error al obtener el auto:', error)
    }
  }
})

if (rentarForm){
    rentarForm.addEventListener('submit', (event) => {
      event.preventDefault()
      const form = new FormData(rentarForm)
    
      fetch('../rentaAutos-back/index.php', {
        method: 'POST',
        body: form
      })
      .then((response) => response.json())
      .then ((res) => {
        if (res.message === 'Renta Registrada Satisfactoriamente') {
          window.location.href = `../rentaAutos-front/home.html`
      }
      })
      .catch((err) => {
        console.log('@@ err =>', err)
      })   
    })
}


pintarAutoData = (auto) => {
  document.getElementById('imgAuto').src = auto.auto.aut_imagen;
  document.getElementById('infoAsientos').textContent = auto.auto.aut_asientos;
  document.getElementById('infoCostoDia').textContent = auto.auto.aut_costoDia;
  document.getElementById('costoDia').value = auto.auto.aut_costoDia; // Si todavía necesitas este para otra lógica de formulario
  document.getElementById('infoModelo').textContent = auto.auto.aut_modelo;
  document.getElementById('infoLocalizacion').textContent = auto.auto.aut_localizacion;
  document.getElementById('infoTransmision').textContent = auto.auto.aut_transmision;
}

const calcularCostoEstimado = () => {
  const inicio = new Date(diaInicio.value + 'T00:00:00') // Asegura que la fecha se interprete correctamente en la zona horaria local
  const fin = new Date(diaFin.value + 'T00:00:00')
  const costo = Number(costoDia.value) // Convierte el costo a número para evitar errores en los cálculos
  const hoy = new Date()
  hoy.setHours(0, 0, 0, 0) // Establece la hora actual a medianoche
  const rentButton = document.getElementById('rentButton') // Obtener el botón por su ID

  if (inicio && fin && !isNaN(inicio.getTime()) && !isNaN(fin.getTime())) {
    if (inicio >= hoy && inicio < fin) {
      const differenceInTime = fin - inicio // Calcula la diferencia en milisegundos
      const differenceInDays = differenceInTime / (1000 * 3600 * 24) // Convierte la diferencia en milisegundos a días
      costoEstimado.value = differenceInDays * costo// Calcula el costo estimado
      rentButton.disabled = false // Habilita el botón si las fechas son correctas
    } else {
      alert('Las fechas proporcionadas no son válidas. Por favor revise que la fecha de inicio sea hoy o una fecha futura y que la fecha de fin sea posterior a la fecha de inicio.')
      costoEstimado.value = 0
      rentButton.disabled = true // Inhabilita el botón si las fechas son incorrectas
    }
  } else {
    costoEstimado.value = '';
    rentButton.disabled = true // Inhabilita el botón si hay algún problema con las fechas
  }
}

const obtenerAutoData = id => {
  inputAutoId.value = id
  inputAccion.value = 'buscarAutoData'
  const form = new FormData(idFormCosto)

  return fetch('../rentaAutos-back/index.php', {
    method: 'POST',
    body: form
  })
  .then((response) => response.json())
  .then((data) => {
    return data
  })
  .catch((err) => {
    console.log('@@@ err => ', err)
  })
}

function logout() {
  // Eliminar el ID del usuario de localStorage
  localStorage.removeItem('userID');
  
  // Redireccionar al usuario a la página de inicio de sesión
  window.location.href = 'login.html';
}

// Para actualizar el costo estimado cada vez que haya un cambio en las fechas
diaInicio.addEventListener('change', calcularCostoEstimado);
diaFin.addEventListener('change', calcularCostoEstimado);
