const userID = localStorage.getItem('userID')
const finalizarForm = document.getElementById('finalizarForm') || null

// Establecer los campos del auto y para finalizar la renta
const idFormFinalizar = document.getElementById('idFormFinalizar')
let idFinalizar = document.getElementById('id')
let idAuto = document.getElementById('idAuto')
let diaInicio = document.getElementById('diaInicio')
let diaFin = document.getElementById('diaFin')
let finReal = document.getElementById('finReal')
let costoDia = document.getElementById('costoDia')
let costoEstimado = document.getElementById('costoEstimado')
let costoReal = document.getElementById('costoReal')

// Establecer campos para obtener el costo por dia
const idFormRenta = document.getElementById('idFormRenta')
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

// Form para pagar la renta
const pagarForm = document.getElementById('pagarForm') || null
let idRenta = document.getElementById('idRenta')
const monto = document.getElementById('monto')
const fecha = document.getElementById('fecha')
const metodo = document.getElementById('metodo')

let multa = document.getElementById('multa')

// Funciones para obtener información desde el back //
// Obtener información de la renta
const obtenerAllData = id => {
    inputRentaId.value = id
    inputAccion.value = 'obtenerAllData'
    const form = new FormData(idFormRenta)

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


// Obtiene todos los datos del auto
const obtenerAutoData = id => {
  inputAutoId.value = id
  idAuto.value = id
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
    idRenta.value = rentaId
    idFinalizar.value = rentaId

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

// Funciones para mandar información al back //
// Si se presiona el botón para pagar
if (pagarForm){
  pagarForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const form = new FormData(pagarForm)
  
    fetch('../rentaAutos-back/index.php', {
      method: 'POST',
      body: form
    })
    .then((response) => response.json())
    .then ((res) => {
      console.log('@@ res =>', res)
      if (res.message === 'Pago Registrado Satisfactoriamente') {
        console.log('Waos, se registro el pago')
        actualizarRenta()
        // window.location.href = `../rentaAutos-front/home.html`
    }
    })
    .catch((err) => {
      console.log('@@ err =>', err)
    }) 
  })
}

// Es parte del botón para pagar la renta; actualiza los datos para
  // agregar un fin a la renta y marcar el auto como disponible
const actualizarRenta = () => {
  const form = new FormData(finalizarForm)
    
  fetch('../rentaAutos-back/index.php', {
    method: 'POST',
    body: form
  })
  .then((response) => response.json())
  .then ((res) => {
    console.log('@@ res =>', res)
    if (res.message === 'Renta Actualizada Satisfactoriamente') {
      console.log('Waos, renta actualizada')
      // window.location.href = `../rentaAutos-front/home.html`
  }
  })
  .catch((err) => {
    console.log('@@ err =>', err)
  })   
}

// Funciones para mostrar los datos obtenidos en pantalla //
// Coloca la información de la renta en los inputs
const pintarRentaData = (rentaData) => {
  diaInicio.value = rentaData.rent_diaInicio
  diaFin.value = rentaData.rent_diaFin
  costoEstimado.value = rentaData.rent_costoEstimado
}

// Coloca la información del auto en los inputs
const pintarAutoData = (auto) => {
  asientos.value = auto.auto.aut_asientos
  costoDiaNH.value = auto.auto.aut_costoDia
  modelo.value = auto.auto.aut_modelo
  localizacion.value = auto.auto.aut_localizacion
  transmision.value = auto.auto.aut_transmision
}

// Funciones matemáticas para mostrar en pantalla //
// Calcula el costo finalizar el servicio hoy
const calcularCostoReal = () => {
  const hoy = new Date()
  hoy.setHours(0, 0, 0, 0) // Establece la hora actual a medianoche
  const inicio = new Date(diaInicio.value + 'T00:00:00')
  const fin = new Date(diaFin.value + 'T00:00:00')

  const diferenciaEnTiempo = hoy.getTime() - fin.getTime()
  const diferenciaEnDias = diferenciaEnTiempo / (1000 * 3600 * 24)

  console.log('Diferencia En Dias => ', diferenciaEnDias)
  if (diferenciaEnDias === 0) {
    multa.value = 0
  } else if (diferenciaEnDias < 0) {
    if (hoy < inicio) {
      multa.value = 0
    } else {
      multa.value = diferenciaEnDias * costoDiaNH.value * (-1.25)
    }
  } else if (diferenciaEnDias > 0) {
    multa.value = diferenciaEnDias * costoDiaNH.value * 1.50
  }

  finReal.value = hoy.getFullYear() + '-' + String(hoy.getMonth() + 1).padStart(2, '0') + '-' + String(hoy.getDate()).padStart(2, '0')
  fecha.value = finReal.value
  const costoFinal = Math.floor(parseFloat(costoEstimado.value)) + Math.floor(parseFloat(multa.value))
  
  if (hoy < inicio) {
    monto.value = 0.00
    costoReal.value = 0.00
  } else {
    costoReal.value = costoFinal + '.00'
    monto.value = costoReal.value
  }
}