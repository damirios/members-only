const signupForm = document.querySelector('form.user-form');
const password = signupForm.querySelector('input#password');
const confirmPassword = signupForm.querySelector('input#confirm');

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (password.value === confirmPassword.value) {
        password.setAttribute('style', '');
        confirmPassword.setAttribute('style', '');
        e.target.submit();
    } else {
        password.setAttribute('style', 'border: 2px solid red;');
        confirmPassword.setAttribute('style', 'border: 2px solid red;');
    }
});