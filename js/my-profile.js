"use strict";

const getUser = localStorage.getItem('user'),
getUserName = localStorage.getItem('userName'),
getUserSecondName = localStorage.getItem('userSecondName'),
getUserLastname = localStorage.getItem('userLastname'),
getUserSecondLastname = localStorage.getItem('userSecondLastname'),
getUserPhone = localStorage.getItem('userPhone');

// Displays an error message if the user is not logged

function userAuth(status) {
    if (status == null) {
        let container = document.querySelectorAll('.container'),
        notLogedHTML =  `<h1 style="color: red; text-align: center; margin-top: 10%; border: 1px solid red; padding: 5%; background-color: rgb(214, 45, 45, 0.5);"> 
        Por favor primero ingrese a su cuenta</h1>`;
        container[1].innerHTML = notLogedHTML;
    }
}

userAuth(getUser)

const savedImg = localStorage.getItem('profile-img'),
img = document.getElementById('profile-img');

// Displays the image in the local storage if there is one

if (savedImg != undefined) {
    img.src = savedImg;
}

document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('data-form'),
    formInputs = document.querySelectorAll('input'),
    profileFile = document.getElementById('profile-file'),
    emailInput = document.getElementById('emailInput'),
    lastnameInput = document.getElementById('lastname'),
    nameInput = document.getElementById('first-name'),
    secondNameInput = document.getElementById('second-name'),
    secondLastnameInput = document.getElementById('second-lastname'),
    phoneInput = document.getElementById('contact-number'),
    succesAlert = document.getElementById('succes-alert'),
    saveDataBtn = document.getElementById('save-data-btn');

    // Default values in inputs if there they are saved in the local storage

    emailInput.defaultValue = getUser;

    if (getUserName != null) {
        nameInput.defaultValue = getUserName;
    }
    if (getUserSecondName != null) {
        secondNameInput.defaultValue = getUserSecondName;
    } 
    if (getUserSecondLastname != null) {
        secondLastnameInput.defaultValue = getUserSecondLastname;
    }
    if (getUserPhone != null) {
        phoneInput.defaultValue = getUserPhone;
    }
    if (getUserLastname != null) {
        lastnameInput.defaultValue = getUserLastname;
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
    });

    saveDataBtn.addEventListener('click', () => {
        if (nameInput.value != '' && lastnameInput.value != '' && emailInput.value != '') {
            setTimeout(() => {
                succesAlert.style.display = "none";
            }, 2000);
            localStorage.setItem('userName', nameInput.value);
            localStorage.setItem('userLastname', lastnameInput.value);
            localStorage.setItem('user', emailInput.value);
            localStorage.setItem('userSecondName', secondNameInput.value);
            localStorage.setItem('userSecondLastname', secondLastnameInput.value);
            localStorage.setItem('userPhone', phoneInput.value);
            succesAlert.style.display = "block";
        } else {

        }
    });

    function formValidation() {
        if (formInputs[0].value == '' || formInputs[1].value == '' || formInputs[2].value == '') {
            formInputs[0].style.border = "1px solid red";
            formInputs[1].style.border = "1px solid red";
            formInputs[2].style.border = "1px solid red";
        }
    }

    // Converts the img in a different type of data so it can be saved
    // in the local storage and then displayed in the user profile

    profileFile.addEventListener('change', () => {
        const reader = new FileReader();
        reader.addEventListener('load', () => {
            localStorage.setItem('profile-img', reader.result);
            img.src = reader.result;
        })
        reader.readAsDataURL(profileFile.files[0]);
    });
});