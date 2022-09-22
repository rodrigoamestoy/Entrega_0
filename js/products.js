<<<<<<< Updated upstream
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
=======
'use strict';

const URL = 'https://japceibal.github.io/emercado-api/cats_products/' + localStorage.getItem('catID') + '.json';

// Display category name

const productName = document.getElementById('description')
>>>>>>> Stashed changes

function autosInfo(jsonObj) {
    const categoria = jsonObj;
    const productName = document.getElementById('description')
    productName.textContent += " " + categoria.catName;
} 
<<<<<<< Updated upstream

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

/* Display Products Cards */
=======
    
// Display products
>>>>>>> Stashed changes

const divPRODUCTS = document.getElementById('products')

function showCategoriesList(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentCategoriesArray.length; i++){
        let category = currentCategoriesArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(category.soldCount) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(category.soldCount) <= maxCount))){

            htmlContentToAppend += `
            <div class="first-div" id="myFirstDiv" onclick="localStorage.setItem('product', ${category.id}); window.location.href = 'product-info.html'">
                    <div class="products-img">
                        <img src="${category.image}" alt="${category.description}" class="img-thumbnail">
                    </div>
                    <div class="products-content">
                            <h2 id="myH2">${category.name} - $${category.currency} ${category.cost}</h2>
                            <h6 id="myH6">${category.soldCount} vendidos</h6>
                            <p id="myP">${category.description}</p>
                    </div>
                </div>
            `
        }

        divPRODUCTS.innerHTML = htmlContentToAppend;
    }
}

<<<<<<< Updated upstream


/* Real Time Search Bar */

=======
/* Real Time Search Bar */

>>>>>>> Stashed changes
function filter() {

    const searchBar = document.getElementById('search-bar').value.toUpperCase();
    const cards = document.getElementsByClassName('first-div');
    

    for(let i = 0; i < cards.length; i++) {
        let title = cards[i].querySelector('#myH2');
        let description = cards[i].querySelector('#myP');

        if(title.innerText.toUpperCase().indexOf(searchBar) > -1) {
            cards[i].style.display = "";
        } else if(description.innerText.toUpperCase().indexOf(searchBar) > -1) {
            cards[i].style.display = "";
        } else {
            cards[i].style.display = "none"
        }
    }
}

/* Filter */

const ORDER_ASC_BY_COST = "09";
const ORDER_DESC_BY_COST = "90";
const ORDER_BY_SOLD_COUNT = "Vendidos";
let currentCategoriesArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;
let minPrice = undefined;
let maxPrice = undefined;

function sortCategories(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_COST)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_COST){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_SOLD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

/* */

function sortAndShowCategories(sortCriteria, categoriesArray){
    currentSortCriteria = sortCriteria;

    if(categoriesArray != undefined){
        currentCategoriesArray = categoriesArray;
    }

    currentCategoriesArray = sortCategories(currentSortCriteria, currentCategoriesArray);

    showCategoriesList();
}

/* Buttons Onclick Events */

document.addEventListener("DOMContentLoaded", function(e){

    getJSONData(URL).then(function(resultObj){
        if (resultObj.status === "ok"){
<<<<<<< Updated upstream
            currentCategoriesArray = resultObj.data['products'];
            showCategoriesList()
        }
    });

=======
            catName = resultObj.data.catName;
            currentCategoriesArray = resultObj.data['products'];
            showCategoriesList();
            productsInfo();
        }
    });
             
>>>>>>> Stashed changes
    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_ASC_BY_COST);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_DESC_BY_COST);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowCategories(ORDER_BY_SOLD_COUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showCategoriesList();
    });

    /* Filter By Price */

    document.getElementById("rangeFilterCount").addEventListener("click", function(){

        minPrice = document.getElementById("rangeFilterCountMin").value;
        maxPrice = document.getElementById("rangeFilterCountMax").value;

        if ((minPrice != undefined) && (minPrice != "") && (parseInt(minPrice)) >= 0){
            minPrice = parseInt(minPrice);
        }
        else{
            minPrice = undefined;
        }

        if ((maxPrice != undefined) && (maxPrice != "") && (parseInt(maxPrice)) >= 0){
            maxPrice = parseInt(maxPrice);
        }
        else{
            maxPrice = undefined;
        }

        showCategoriesList2();
    });
});

function showCategoriesList2(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentCategoriesArray.length; i++){
        let category = currentCategoriesArray[i];

        if (((minPrice == undefined) || (minPrice != undefined && parseInt(category.cost) >= minPrice)) &&
            ((maxPrice == undefined) || (maxPrice != undefined && parseInt(category.cost) <= maxPrice))){

            htmlContentToAppend += `
                <div class="first-div" id="myFirstDiv">
                    <div class="products-img">
                        <img src="${category.image}" alt="${category.description}" class="img-thumbnail">
                    </div>
                    <div class="products-content">
                            <h2 id="myH2">${category.name} - $${category.currency} ${category.cost}</h2>
                            <h6 id="myH6">${category.soldCount} vendidos</h6>
                            <p id="myP">${category.description}</p>
                    </div>
                </div>
            `
        }
        divPRODUCTS.innerHTML = htmlContentToAppend;
    }
}
    }
}
