let idUser = document.getElementById('id')
const userID = localStorage.getItem('userID')
const autosBody = document.getElementById('autosBody')
const cardAutos = document.getElementById('cardAutos').content
const fragment = document.createDocumentFragment()

const idForm = document.getElementById('idForm')
let inputUserId = document.getElementById('idUser')
let inputAccion = document.getElementById('accion')

document.addEventListener('DOMContentLoaded', () => {
    loadAllAutos()

    if (userID) {
        console.log('@@ id => ', userID)
        idUser = userID
        loadAllAutosByUser(idUser)
    }
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

const loadAllAutosByUser = id => {
	inputUserId.value = id;
	inputAccion.value = 'getRentasById';
	const form = new FormData(idForm);

	return fetch('../rentaAutos-back/index.php', {
			method: 'POST',
			body: form
	})
	.then((response) => response.json())
	.then((data) => {
			if (data.success) {
					data.rentas.forEach((renta) => {
							if (renta.rent_finReal === null) {
									console.log('Renta sin finalizar => ', renta.aut_id);
							} else {
									console.log('Renta finalizada => ', renta.renta_id);
							}
					})
			} else {
					console.log('No se pudo obtener los datos')
			}
	})
	.catch((err) => {
			console.log('@@@ err => ', err);
	})
}

const pintarAutos = (autos) => {
    autosBody.innerHTML = ''
    autos.forEach((auto) => {
        if (auto.aut_disponible == 'True') {
            const clone = cardAutos.cloneNode(true)

            clone.querySelector('.card-img-top').src = 'https://scontent.fbjx1-1.fna.fbcdn.net/v/t31.18172-8/17192380_1908830826070690_977825315259382856_o.jpg?_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGxgVijDVSla80geWoS7v3Pf7VR8tWb5yB_tVHy1ZvnIPWWg9OO5lQziPptsuZ4yHBKjpMljgstpgsBJGzmas05&_nc_ohc=slaHOJmBovcQ7kNvgGr1nhO&_nc_ht=scontent.fbjx1-1.fna&oh=00_AYA1VSTqgWlDXlEQfZcO7_JXDpgyXf7Tt57peGGhfNKhzw&oe=667B6EB9'
            clone.querySelector('.card-title').textContent = auto.aut_modelo
            clone.querySelector('.asientos').textContent = auto.aut_asientos
            clone.querySelector('.transmision').textContent = auto.aut_transmision
            clone.querySelector('.costo').textContent = auto.aut_costoDia
            clone.querySelector('.disponible').textContent = auto.aut_disponible 
            clone.querySelector('.localizacion').textContent = auto.aut_localizacion
            clone.querySelector('.btn-danger').dataset.id = auto.aut_id

            const btnRentar = clone.querySelector('.btn-danger')
            btnRentar.addEventListener('click', () => {
                console.log('user id => ', idUser)
                console.log('auto id => ', btnRentar.dataset.id)
                const autoId = btnRentar.dataset.id
                window.location.href = `../rentaAutos-front/rentar.html?auto=${autoId}`
            })

            fragment.appendChild(clone)
        } else {
            console.log ('@@@ Este auto esta ocupado => ', auto.aut_id)
        }
    })
    autosBody.appendChild(fragment)
}

