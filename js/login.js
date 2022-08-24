
const email = document.getElementById('email');
const password = document.getElementById('password');
const form = document.getElementById('myForm');
const passwordError = document.getElementById('password-error');
const emailError = document.getElementById('email-error');

/* Events */

email.addEventListener('textInput', emailVerify);
password.addEventListener('textInput', passwordVerify);

/* Login Verification */

    function redirect() {
        if (email.value.length < 6) {
            email.style.border = "1px solid red";
            emailError.style.display = "block";
            email.focus()
            return false;
        } else if (password.value.length < 6) {
            password.style.border = "1px solid red";
            passwordError.style.display = "block";
            password.focus();
            return false
        } else {
            window.location.href = "inicio.html"
        }
}
    
    form.addEventListener("submit", event => {
        event.preventDefault();
        redirect(event)
    })
    
function emailVerify() {
    if (email.value.length > 6) {
        email.style.border = "1px solid silver";
        emailError.style.display = "none";
        return true;
    }
}

function passwordVerify() {
    if (password.value.length >= 6) {
        password.style.border = "1px solid silver";
        passwordError.style.display = "none";
        return true;
    }
}

/* LocalStorage */

function storeEmail() {
    let getEmail = document.getElementById('email').value;
    localStorage.setItem('user', getEmail);
}

/* Google LogIn */

function onSuccess(googleUser) {
    console.log('Logged in as: ' + googleUser.getBasicProfile().getName());        
}
function onFailure(error) {
    console.log(error);
}
function renderButton() {
    gapi.signin2.render('my-signin2', {
        'scope': 'profile email',
        'width': 240,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': onSuccess,
        'onfailure': onFailure
    });
}
function onSignIn(googleUser) {        
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());

    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);       
  }