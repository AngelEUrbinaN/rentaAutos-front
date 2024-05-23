const rentarForm = document.getElementById('rentarForm') || null 

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