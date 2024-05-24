const rentarForm = document.getElementById('rentarForm') || null
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