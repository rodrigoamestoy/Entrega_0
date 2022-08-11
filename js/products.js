const CARSURL = 'https://japceibal.github.io/emercado-api/cats_products/101.json';
const request = new XMLHttpRequest();
request.open('GET', CARSURL);
request.responseType = 'json';
request.send();
const divAUTOS = document.getElementById('misautos')

request.onload = function() {
    const AUTOS = request.response;
    autosInfo(AUTOS);
    mostrarAutos(AUTOS);
}

function autosInfo(jsonObj) {
    const categoria = jsonObj;
    const productName = document.getElementById('description')
    productName.textContent += " " + categoria.catName;
} 
    

function mostrarAutos(jsonObj) {
    const autos = jsonObj['products'];

    for (let i = 0; i < autos.length; i++) {
        const myCarDiv = document.createElement('div');
        const img = document.createElement('img');
        const myH2 = document.createElement('h2');
        const myP = document.createElement('p');
        const myH6 = document.createElement('h6')
        const mySecDiv = document.createElement('div')
        const myThirdDiv = document.createElement('div')
        const myBtn = document.createElement('button')
        myBtn.classList.add('btn')
        myCarDiv.classList.add('autosdiv')
        mySecDiv.classList.add('imgautos')
        myThirdDiv.classList.add('contentautos')

        myH6.textContent = autos[i].soldCount + " " + "vendidos";
        myH2.textContent = autos[i].name + ' - ' + autos[i].currency + " " + autos[i].cost;
        myP.textContent = autos[i].description;
        img.src = autos[i].image;

        divAUTOS.appendChild(myCarDiv);
        myCarDiv.appendChild(mySecDiv)
        mySecDiv.appendChild(myBtn)
        myBtn.appendChild(img);
        myCarDiv.appendChild(myThirdDiv);
        myThirdDiv.appendChild(myH2);
        myThirdDiv.appendChild(myH6);
        myThirdDiv.appendChild(myP);
    }
}

/**/
