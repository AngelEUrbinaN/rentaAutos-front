const userID = localStorage.getItem('userID')
const pagarForm = document.getElementById('pagarForm') || null
const monto = document.getElementById('monto')
const fecha = document.getElementById('fecha')
const metodo = document.getElementById('metodo')

document.addEventListener('DOMContentLoaded', async () => {

  if (userID) {
      console.log('@@ idUser => ', userID)
  }
})

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
          // window.location.href = `../rentaAutos-front/home.html`
      }
      })
      .catch((err) => {
        console.log('@@ err =>', err)
      })   
    })
}