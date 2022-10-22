"use strict";

const URL = 'https://japceibal.github.io/emercado-api/cats_products/' + localStorage.getItem('catID') + '.json';

async function CATEGORIES_LIST() {
    const RESPONSE = await fetch(URL);
        if (RESPONSE.ok) {
            const DATA = await RESPONSE.json();
            return DATA;
        } return '';
    };

document.addEventListener("DOMContentLoaded", async () => {

    const categories = await CATEGORIES_LIST();
    const categoryName = document.getElementById('description');
    const ProductsContainer = document.getElementById('products');
    categoryName.textContent += " " + categories.catName.toUpperCase();

    // Displays products 

    for (let j = 0; j < categories.products.length; j++) {
        let category = categories.products[j];
        ProductsContainer.innerHTML += `
        <div class="products-card"  onclick="localStorage.setItem('product', ${category.id}); window.location.href = 'product-info.html'">
                <img src="${category.image}" alt="${category.description}">
            <div class="card-content col">
                    <h2 id="product-name">${category.name} - $${category.currency} ${category.cost}</h2>
                    <p id="product-description">${category.description}</p>
                    <h6 id="sold-count">${category.soldCount} vendidos</h6>
            </div>
        </div>
    `
    }

    // Filter products acording to cost and sold count

    const ORDER_ASC_BY_COST = "09";
    const ORDER_DESC_BY_COST = "90";
    const ORDER_BY_SOLD_COUNT = "Vendidos";
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

    // Takes props given by the order functions and sends it to sortCreteria & showCategoriesList

    function sortAndShowCategories(sortCriteria, categoriesArray){
        currentSortCriteria = sortCriteria;

        if(categoriesArray != undefined){
            categories.products = categoriesArray;
        }
        console.log(categories.products)
        categories.products = sortCategories(currentSortCriteria, categories.products);

        showCategoriesList();
    }

    // Order functions

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


    // Orders Products Acording To Sold Count

    function showCategoriesList() {

        let htmlContentToAppend = "";
        for(let i = 0; i < categories.products.length; i++){
            let category = categories.products[i];

            if (((minCount == undefined) || (minCount != undefined && parseInt(category.soldCount) >= minCount)) &&
                ((maxCount == undefined) || (maxCount != undefined && parseInt(category.soldCount) <= maxCount))){

                htmlContentToAppend += `
                <div class="products-card"  onclick="localStorage.setItem('product', ${category.id}); window.location.href = 'product-info.html'">
                    <img src="${category.image}" alt="${category.description}">
                    <div class="card-content col">
                        <h2 id="product-name">${category.name} - $${category.currency} ${category.cost}</h2>
                        <p id="product-description">${category.description}</p>
                        <h6 id="sold-count">${category.soldCount} vendidos</h6>
                    </div>
                </div>
                `
            }

            ProductsContainer.innerHTML = htmlContentToAppend;
        }
    }

        // Filter by price

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

        function showCategoriesList2(){

            let htmlContentToAppend = "";
            for(let i = 0; i < categories.products.length; i++){
                let category = categories.products[i];
                if (((minPrice == undefined) || (minPrice != undefined && parseInt(category.cost) >= minPrice)) &&
                    ((maxPrice == undefined) || (maxPrice != undefined && parseInt(category.cost) <= maxPrice))){
                    
                    htmlContentToAppend += `
                    <div class="products-card"  onclick="localStorage.setItem('product', ${category.id}); window.location.href = 'product-info.html'">
                        <img src="${category.image}" alt="${category.description}">
                        <div class="card-content col">
                            <h2 id="product-name">${category.name} - $${category.currency} ${category.cost}</h2>
                            <p id="product-description">${category.description}</p>
                            <h6 id="sold-count">${category.soldCount} vendidos</h6>
                        </div>
                    </div>
                    `
                }
                ProductsContainer.innerHTML = htmlContentToAppend;
            }
        }
    });

    // Real time search bar

    function filter() {

        const searchBar = document.getElementById('search-bar').value.toUpperCase();
        const cards = document.getElementsByClassName('products-card');

        for(let i = 0; i < cards.length; i++) {
            let title = cards[i].querySelector('#product-name');
            let description = cards[i].querySelector('#product-description');

            if(title.innerText.toUpperCase().indexOf(searchBar) > -1) {
                cards[i].style.display = "";
            } else if(description.innerText.toUpperCase().indexOf(searchBar) > -1) {
                cards[i].style.display = "";
            } else {
                cards[i].style.display = "none"
            }
        }
};

