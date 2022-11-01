"use strict";

const savedImg = localStorage.getItem('profile-img'),
img = document.getElementById('profile-img');

if (savedImg != undefined) {
    img.src = savedImg;
}

document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('data-form'),
    formInputs = document.querySelectorAll('input'),
    profileFile = document.getElementById('profile-file'),
    saveDataBtn = document.getElementById('save-data-btn');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
    });

    saveDataBtn.addEventListener('click', () => {
        formValidation();
    })

    function formValidation() {
        if (formInputs[0].value == '' || formInputs[1].value == '' || formInputs[2].value == '') {
            formInputs[0].style.border = "1px solid red";
            formInputs[1].style.border = "1px solid red";
            formInputs[2].style.border = "1px solid red";
        }
    }

    profileFile.addEventListener('change', () => {
        const reader = new FileReader();
        reader.addEventListener('load', () => {
            localStorage.setItem('profile-img', reader.result);
            img.src = reader.result;
        })
        reader.readAsDataURL(profileFile.files[0]);
    });
});