const userID = localStorage.getItem('userID')
const finalizarForm = document.getElementById('finalizarForm') || null

let diaInicio = document.getElementById('diaInicio')
let diaFin = document.getElementById('diaFin')
let finReal = document.getElementById('finReal')
let costoDia = document.getElementById('costoDia')
let costoEstimado = document.getElementById('costoEstimado')
let costoReal = document.getElementById('costoReal')

// Establecer campos para obtener el costo por dia
const idFormFinalizar = document.getElementById('idFormFinalizar')
let inputRentaId = document.getElementById('rentaID')
let inputAccion = document.getElementById('accion')

// Establecer campos para el auto
let asientos = document.getElementById('asientos')
let costoDiaNH = document.getElementById('costoDiaNH')
let modelo = document.getElementById('modelo')
let localizacion = document.getElementById('localizacion')
let transmision = document.getElementById('transmision')

// Form para obtener data del auto
const idFormAuto = document.getElementById('idFormAuto')
let inputAutoId = document.getElementById('autID')
let inputAccionAuto = document.getElementById('accionAuto')

const obtenerAllData = id => {
    inputRentaId.value = id
    inputAccion.value = 'obtenerAllData'
    const form = new FormData(idFormFinalizar)

    console.log('form id value =>', form.get('rentaID'))
    console.log('form accion value =>', form.get('accion'))
  
    return fetch('../rentaAutos-back/index.php', {
      method: 'POST',
      body: form
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('@@@ renta => ', data)
      return data.renta
      //return data
    })
    .catch((err) => {
      console.log('@@@ err => ', err)
      return null
    })
  }

document.addEventListener('DOMContentLoaded', async () => {
  // Obtener parámetros del URL
  const params = new URLSearchParams(window.location.search)
  const rentaId = params.get('renta')

  console.log(params)

  if (userID) {
      console.log('@@ idUser => ', userID)
  }

  if (rentaId) {
    console.log('@@ idRenta => ', rentaId)
    inputRentaId.value = rentaId

    try {
        const rentaData = await obtenerAllData(rentaId)
        pintarRentaData(rentaData)
        console.log(rentaData)
        const autoData = await obtenerAutoData(rentaData.rent_aut_id)
        pintarAutoData(autoData)
        calcularCostoReal()
      } catch (error) {
        console.log('Error al obtener datos de la renta:', error)
    }
    
  }
})

const pintarRentaData = (rentaData) => {
  diaInicio.value = rentaData.rent_diaInicio
  diaFin.value = rentaData.rent_diaFin
  costoEstimado.value = rentaData.rent_costoEstimado
}

const pintarAutoData = (auto) => {
  asientos.value = auto.auto.aut_asientos
  costoDiaNH.value = auto.auto.aut_costoDia
  modelo.value = auto.auto.aut_modelo
  localizacion.value = auto.auto.aut_localizacion
  transmision.value = auto.auto.aut_transmision
}

const obtenerAutoData = id => {
  inputAutoId.value = id
  inputAccionAuto.value = 'buscarAutoData'
  const form = new FormData(idFormAuto)

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

if (finalizarForm){
    finalizarForm.addEventListener('submit', (event) => {
      event.preventDefault()
      const form = new FormData(finalizarForm)
    
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

const calcularCostoReal = () => {
  const hoy = new Date()
  hoy.setHours(0, 0, 0, 0) // Establece la hora actual a medianoche
  const inicio = new Date(diaInicio.value + 'T00:00:00')
  const costo = costoDiaNH.value
  console.log('Inicio => ', inicio.getTime())
  console.log('Hoy => ', hoy.getTime())

  const differenceInTime = hoy.getTime() - inicio.getTime()
  const differenceInDays = differenceInTime / (1000 * 3600 * 24)
  console.log('Resta => ', differenceInDays)
  const resultado = differenceInDays
  finReal.value = hoy.getFullYear() + '-' + String(hoy.getMonth() + 1).padStart(2, '0') + '-' + String(hoy.getDate()).padStart(2, '0')
  costoReal.value = resultado * costo
}