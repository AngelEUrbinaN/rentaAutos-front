const autosBody = document.getElementById('autosBody')
const cardAutos = document.getElementById('cardAutos').content
const idForm = document.getElementById('idForm')
const inputId = document.getElementById('id')
const fragment = document.createDocumentFragment()

document.addEventListener('DOMContentLoaded', () => {
    loadAllAutos()
})

const loadAllAutos = () => {
    fetch('../rentaAutos-back/index.php?accion=todos')
        .then((res) => res.json())
        .then((data) => {
            console.log('@@@ data => ', data)
            if (data.autos && data.autos.length > 0) {
                pintarAutos(data.autos)
            }
        })
        .catch((err) => {
            console.log('@@@ err => ', err)
        })
}

const pintarAutos = (autos) => {
    autosBody.innerHTML = ''
    autos.forEach((auto) => {
        const clone = cardAutos.cloneNode(true)

        clone.querySelector('.card-img-top').src = auto.aut_imagen
        clone.querySelector('.card-title').textContent = auto.aut_modelo
        clone.querySelector('.asientos').textContent = auto.aut_asientos
        clone.querySelector('.transmision').textContent = auto.aut_transmision
        clone.querySelector('.costo').textContent = auto.aut_costoDia
        clone.querySelector('.disponible').textContent = auto.aut_disponible
        clone.querySelector('.localizacion').textContent = auto.aut_localizacion
        clone.querySelector('.btn-danger').dataset.id = auto.aut_id

        fragment.appendChild(clone)
    })
    autosBody.appendChild(fragment)
}
