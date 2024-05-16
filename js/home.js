const autosBody = document.getElementById('autosBody')
const rowAutos = document.getElementById('rowAutos').content
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

const pintarAutos = autos => {
    autosBody.innerHTML = ''
    autos.forEach((auto) => {
        const clone = rowAutos.cloneNode(true)

        clone.querySelectorAll('td')[0].textContent = auto.aut_id
        clone.querySelectorAll('td')[1].textContent = auto.aut_modelo
        clone.querySelectorAll('td')[2].textContent = auto.aut_asientos
        clone.querySelectorAll('td')[3].textContent = auto.aut_transmision
        clone.querySelectorAll('td')[4].textContent = auto.aut_costoDia
        clone.querySelectorAll('td')[5].textContent = auto.aut_disponible
        clone.querySelectorAll('td')[6].textContent = auto.aut_localizacion
        clone.querySelectorAll('td')[7].textContent = auto.aut_imagen
        clone.querySelector('.btn-danger').dataset.id = auto.aut_id

        fragment.appendChild(clone)
    })
    autosBody.appendChild(fragment)
}