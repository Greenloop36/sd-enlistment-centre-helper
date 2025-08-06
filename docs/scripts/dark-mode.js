const button = document.getElementById("btn-dark-mode")
const body = document.body

button.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
});