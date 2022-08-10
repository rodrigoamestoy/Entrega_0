
    function redirect() {
        location.href = 'inicio.html';
    }

    const form = document.getElementById('login-form')
    form.addEventListener("submit", event => {
        event.preventDefault();
        redirect(event)
    });
