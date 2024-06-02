let idUser = document.getElementById('id')
let nombreCompleto = document.getElementById('nombreCompleto')
let nombreYApellidos = document.getElementById('nombreYApellidos')
let fechaNacimiento = document.getElementById('fechaNacimiento')
let genero = document.getElementById('genero')
let correo = document.getElementById('correo')
let telefono = document.getElementById('telefono')
let direccion = document.getElementById('direccion')

const actualizarForm = document.getElementById('actualizarForm') || null
const userID = localStorage.getItem('userID')

const idFormUpdate = document.getElementById('idFormUpdate')
let inputId = document.getElementById('idUpdate')
let inputAccion = document.getElementById('accion')

// Mostrar autos en renta
const autosEnDeudaBody = document.getElementById('autosEnDeudaBody')
const cardAutosEnDeuda = document.getElementById('cardAutosEnDeuda').content
const idForm = document.getElementById('idForm')
let inputUserId = document.getElementById('idUser')
let inputAccionAutos = document.getElementById('accionAutos')
const fragment = document.createDocumentFragment()

const verDetalles = document.getElementById('verDetalles')


document.addEventListener('DOMContentLoaded', () => {

    if (userID) {
        console.log('@@ id => ', userID)
        obtenerDatosUsuario(userID)
        loadAllAutosByUser(userID)
    }
})



const obtenerDatosUsuario = id => {
    inputId.value = id
    inputAccion.value = 'actualizar'
    const form = new FormData(idFormUpdate)
    
    fetch('../rentaAutos-back/index.php', {
        method: 'POST',
        body: form
    })
    .then((response) => response.json())
    .then((data) => {
        console.log('@@@ data => ', data)
        if (data.success) {
            idUser.value = data.user.usu_id
            nombreCompleto.value = data.user.usu_nombre + " " + data.user.usu_apellidos
            nombreYApellidos.value = data.user.usu_nombre + " " + data.user.usu_apellidos 
            fechaNacimiento.value = data.user.usu_fechaNacimiento
            genero.value = data.user.usu_genero
            correo.value = data.user.usu_correo
            telefono.value = data.user.usu_telefono
            direccion.value = data.user.usu_direccion
        }
    })
    .catch((err) => {
        console.log('@@@ err => ', err)
    })
}

window.onload = () => {
    if (userID) {
        console.log('@@ id => ', userID)
        obtenerDatosUsuario(userID)
    }
}


const logout = () => {
    // Eliminar el ID del usuario de localStorage
    localStorage.removeItem('userID');
    
    // Redireccionar al usuario a la página de inicio de sesión
    window.location.href = 'login.html';
  }

const loadAllAutosByUser = id => {
	inputUserId.value = id;
	inputAccionAutos.value = 'getRentasById';
	const form = new FormData(idForm);

	return fetch('../rentaAutos-back/index.php', {
			method: 'POST',
			body: form
	})
	.then((response) => response.json())
	.then((data) => {
		const rentasEnDeuda = []
			if (data.success) {
                const lista = document.getElementById('listaRentas')
                lista.innerHTML = ''
					data.rentas.forEach((renta) => {
							if (renta.rent_finReal === null) {
                                const elemento = document.createElement('li')
                                elemento.className = 'list-group-item d-flex justify-content-between align-items-center'
                                elemento.textContent =`${renta.aut_modelo}`
                                
                                const btn = document.createElement('button')
                                btn.textContent = 'Ver Detalles'
                                btn.style.marginLeft = '10px'
                                btn.className = 'btn btn-primary'
                                btn.addEventListener('click', (e) =>{
                                    e.preventDefault()
                                    mostrarDetalles(renta)
                                })
                                const separation = document.createElement('hr')

								rentasEnDeuda.push(renta)
                                elemento.appendChild(btn)
                                lista.appendChild(elemento)
							} else {
								console.log('Renta finalizada => ', renta.renta_id);
							}
					})
			} else {
					console.log('No se pudo obtener los datos')
			}
			console.log(rentasEnDeuda)
		pintarAutosByUser(rentasEnDeuda)
	})
	.catch((err) => {
			console.log('@@@ err => ', err);
	})
}

const pintarAutosByUser = (rentasEnDeuda) => {
	autosEnDeudaBody.innerHTML = ''
    rentasEnDeuda.forEach((renta) => {
        if (renta.rent_finReal != 'null') {
            const clone = cardAutosEnDeuda.cloneNode(true)

            clone.querySelector('.card-img-top').src = renta.aut_imagen
            clone.querySelector('.card-title').textContent = renta.aut_modelo
            clone.querySelector('.asientos').textContent = renta.aut_asientos
            clone.querySelector('.transmision').textContent = renta.aut_transmision
            clone.querySelector('.costo').textContent = renta.aut_costoDia
            clone.querySelector('.disponible').textContent = renta.aut_disponible 
            clone.querySelector('.localizacion').textContent = renta.aut_localizacion
            clone.querySelector('.btn-danger').dataset.id = renta.renta_id

            const btnFinalizar = clone.querySelector('.btn-danger')
            btnFinalizar.addEventListener('click', () => {
                const rentaId = btnFinalizar.dataset.id
                window.location.href = `../rentaAutos-front/finalizar.html?renta=${rentaId}`
            })

            fragment.appendChild(clone)
        } else {
            console.log ('@@@ Esta renta esta acabada => ', renta.renta_id)
        }
    })
    autosEnDeudaBody.appendChild(fragment)
}

const mostrarDetalles = (renta) => {
    const modalContent = document.getElementById('modalContent')
    modalContent.innerHTML = `Modelo del auto: ${renta.aut_modelo}<br>Fecha de inicio: ${renta.rent_diaInicio}<br>Fecha Estimada de entrega: ${renta.rent_diaFin}<br>Costo Estimado: $${renta.rent_costoEstimado}`
    var myModal = new bootstrap.Modal(document.getElementById('detallesModal'), {
        keyboard: false
    })
    myModal.show()
}