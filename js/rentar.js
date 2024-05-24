const rentarForm = document.getElementById('rentarForm') || null
const diaInicio = document.getElementById('diaInicio')
const diaFin = document.getElementById('diaFin')
const costoEstimado = document.getElementById('costoEstimado')
let idUser = document.getElementById('usuarioId')
let idAuto = document.getElementById('autoId')

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search)
  const userId = params.get('id')
  const autoId = params.get('auto')

  console.log(params)

  if (userId) {
      console.log('@@ idUser => ', userId)
      idUser.value = userId
  }

  if (autoId) {
    console.log('@@ idAuto => ', autoId)
    idAuto.value = autoId
  }
})

if (rentarForm){
    rentarForm.addEventListener('submit', (event) => {
      event.preventDefault() //para hacer refresh
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
  console.log(diaInicio.value)

  if (inicio && fin && !isNaN(inicio) && !isNaN(fin)) {
    const differenceInTime = fin.getTime() - inicio.getTime()
    const differenceInDays = differenceInTime / (1000 * 3600 * 24)
    const result = differenceInDays * 50
    costoEstimado.value = result
  } else {
    costoEstimado.value = ''
  }
}