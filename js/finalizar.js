const userID = localStorage.getItem('userID')
const finalizarForm = document.getElementById('finalizarForm') || null
const diaInicio = document.getElementById('diaInicio')
const diaFin = document.getElementById('diaFin')

let finReal = document.getElementById('finReal')
let costoDia = document.getElementById('costoDia')
let costoEstimado = document.getElementById('costoEstimado')
let costoReal = document.getElementById('costoReal')

// Establecer campos para obtener el costo por dia
const idFormFinalizar = document.getElementById('idFormFinalizar')
let inputRentaId = document.getElementById('rentaID')
let inputAccion = document.getElementById('accion')

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
      //return data
    })
    .catch((err) => {
      console.log('@@@ err => ', err)
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
        const rentaData = await obtenerAllData(rentaId);
        console.log(rentaData)
      } catch (error) {
        console.log('Error al obtener datos de la renta:', error);
        
    }
    
  }
})

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