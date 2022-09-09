'use strict';

/* Get Products Info */

const URL = 'https://japceibal.github.io/emercado-api/cats_products/' + localStorage.getItem('catID') + '.json';
const REQUEST = new XMLHttpRequest();
REQUEST.open('GET', URL);
REQUEST.responseType = 'json';
REQUEST.send();

REQUEST.onload = function() {
    const URL_RESPONSE = REQUEST.response;
    productsInfo(URL_RESPONSE);
}

/* Display Category */

function productsInfo(jsonObj) {
    const categoria = jsonObj;
    const productName = document.getElementById('description')
    productName.textContent += " " + categoria.catName;
} 
    
/* Display Products Cards */

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
                            <p id="myP">${category.description}</p>
                            <h6 id="myH6">${category.soldCount} vendidos</h6>
                    </div>
                </div>
            `
        }

        divPRODUCTS.innerHTML = htmlContentToAppend;
    }
}



/* Real Time Search Bar */

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
            currentCategoriesArray = resultObj.data['products'];
            showCategoriesList()
        }
    });

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
                <div class="first-div" id="myFirstDiv" onclick="localStorage.setItem('product', '${category.id}'">
                    <div class="products-img">
                        <img src="${category.image}" alt="${category.description}" class="img-thumbnail">
                    </div>
                    <div class="products-content">
                            <h2 id="myH2">${category.name} - $${category.currency} ${category.cost}</h2>
                            <p id="myP">${category.description}</p>
                            <h6 id="myH6">${category.soldCount} vendidos</h6>
                    </div>
                </div>
            `
        }

        divPRODUCTS.innerHTML = htmlContentToAppend;
    }
}
