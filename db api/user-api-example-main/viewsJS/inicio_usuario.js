document.addEventListener('DOMContentLoaded', function() {
    fetch('/get_user_email')
        .then(response => response.json())
        .then(data => {
            document.getElementById('userEmail').textContent = data.email;
            document.getElementById('userEmailHidden').value = data.email; // Agrega el correo a un campo oculto
        })
        .catch(error => console.error('Error:', error));
});