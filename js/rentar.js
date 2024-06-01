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

  console.log(params)

  if (userID) {
      console.log('@@ idUser => ', userID)
      idUser.value = userID
  }

  if (autoId) {
    console.log('@@ idAuto => ', autoId)
    idAuto.value = autoId
    // Establecer el costo por día con una promesa
    try {
      const autoData = await obtenerAutoData(autoId)
      console.log('AutoData => ', autoData)
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
        console.log('@@ res =>', res)
        if (res.message === 'Renta Registrada Satisfactoriamente') {
          console.log('Maracatanga, sí se registró')
          window.location.href = `../rentaAutos-front/home.html`
      }
      })
      .catch((err) => {
        console.log('@@ err =>', err)
      })   
    })
}

pintarAutoData = (auto) => {
  asientos.value = auto.auto.aut_asientos
  costoDiaNH.value = auto.auto.aut_costoDia
  modelo.value = auto.auto.aut_modelo
  localizacion.value = auto.auto.aut_localizacion
  transmision.value = auto.auto.aut_transmision
}

const calcularCostoEstimado = () => {
  const inicio = new Date(diaInicio.value);
  const fin = new Date(diaFin.value);
  const costo = costoDia.value
  console.log(diaInicio.value)

  // Si la fecha de inicio y fin existen y no son nulos
  if (inicio && fin && !isNaN(inicio) && !isNaN(fin)) {
    const differenceInTime = fin.getTime() - inicio.getTime()
    const differenceInDays = differenceInTime / (1000 * 3600 * 24)
    const resultado = differenceInDays
    costoEstimado.value = resultado * costo
  } else {
    costoEstimado.value = ''
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



// Para actualizar el costo estimado cada vez que haya un cambio en las fechas
diaInicio.addEventListener('change', calcularCostoEstimado);
diaFin.addEventListener('change', calcularCostoEstimado);
