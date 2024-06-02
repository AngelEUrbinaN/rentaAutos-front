const passwordInput = document.getElementById('password')
const passwordToggleIcon = document.getElementById('togglePasswordIcon')

function togglePasswordVisibility() {
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        passwordToggleIcon.classList.remove('bxs-low-vision')
        passwordToggleIcon.classList.add('bxs-show')
    } else {
        passwordInput.type = 'password';
        passwordToggleIcon.classList.remove('bxs-show')
        passwordToggleIcon.classList.add('bxs-low-vision')
    }
}