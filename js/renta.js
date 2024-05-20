const registrarRentaForm = document.getElementById('registrarRentaForm') || null 

if (registrarRentaForm){
  registrarRentaForm.addEventListener('submit', (event) => {
    event.preventDefault() //para hacer refresh
    const form = new FormData(registrarRentaForm)
  
    fetch('../rentaAutos-back/index.php', {
      method: 'POST',
      body: form
    })
    .then((response) => response.json())
    .then ((res) => {
      console.log('@@ res =>', res)
      if (res.message === 'Renta Registrada Satisfactoriamente') {
        'Si se pudo con muchas ganas'
      }
    })
    .catch((err) => {
      console.log('@@ err =>', err)
    })   
  })
  }