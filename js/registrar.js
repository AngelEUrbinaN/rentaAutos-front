const passwordInput = document.getElementById('password')
const passwordToggleIcon = document.getElementById('togglePasswordIcon')

function togglePasswordVisibility() {
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        passwordToggleIcon.classList.remove('bi-eye')
        passwordToggleIcon.classList.add('bi-eye-slash')
    } else {
        passwordInput.type = 'password';
        passwordToggleIcon.classList.remove('bi-eye-slash')
        passwordToggleIcon.classList.add('bi-eye')
    }
}