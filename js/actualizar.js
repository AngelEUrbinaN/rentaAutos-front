document.addEventListener('DOMContentLoaded', function () {
    const editIcons = document.querySelectorAll('.edit-icon');

    editIcons.forEach(icon => {
        icon.addEventListener('click', function () {
            let textElement = this.previousSibling; // Selecciona el elemento hermano que contiene el texto
            if (!textElement.hasAttribute('contenteditable')) {
                let initialValue = textElement.textContent.trim();
                textElement.setAttribute('contenteditable', 'true');
                textElement.focus();
                textElement.onblur = () => {
                    textElement.removeAttribute('contenteditable');
                    // Aquí podrías añadir código para guardar los cambios en el servidor
                    if (textElement.textContent.trim() !== initialValue) {
                        console.log('El valor ha cambiado, guarda los cambios.');
                        // Aquí se podría llamar a una función para guardar los cambios
                    }
                };
            }
        });
    });
});
