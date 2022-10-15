'use strict';

const CART_URL = 'https://japceibal.github.io/emercado-api/user_cart/25801.json';

async function USER_CART() {
    const RESPONSE = await fetch(CART_URL);
    if (RESPONSE.ok) {
        const data = await RESPONSE.json();
        return data.articles;
    } return '';
};

const buyBtn = document.getElementById('buy');

document.addEventListener('DOMContentLoaded', async () => {

    const CART_JSON = await USER_CART();
    const CART = localStorage.getItem(1234);
    const CART_PRODUCTS = JSON.parse(CART);
    // Number of items in the cart

    document.getElementById('n-products').innerHTML = CART_JSON.length + CART_PRODUCTS.length;

    // Displays json cart products

    displayCart(CART_JSON);

    function displayCart(product) {
        const productContainer = document.getElementById('display-products');

        for (let i = 0; i < product.length; i++ ) {

            let htmlToAppend = `
            <div class="product-container">
            <div class="img-container col-sm-1"> 
                <img id="img" src="${product[i].image}" alt="">
            </div>
            <div class="p-name col">
              <h6 id="name">${product[i].name}</h6>
            </div>
            <div class="price col">
              <p id="price"> Price: ${product[i].currency}  ${product[i].unitCost}</p>
            </div>
            <div class="quantity col-sm-2">
            <button type="button" id="btn-left"><i class="fa fa-minus"></i></button>
              <input id="quantity" min="1" max="999" type="number" oninput="validity.valid || (value = '1');" value="${product[i].count}">
              <button type="button" id="btn-right"><i class="fa fa-plus"></i></button>
            </div>
            <div class="sub-total col">
              <p> Precio: ${product[i].currency} <span id="sub-total">${product[i].unitCost + product[i].count}</span></p>
            </div>
            </div>
            ` 
            productContainer.innerHTML += htmlToAppend;
        }

        for (let j = 0; j < CART_PRODUCTS.length; j++) {
            let cart_product = CART_PRODUCTS;
            let htmlToAppend = `
            <div class="product-container">
            <div class="img-container col-sm-1"> 
                <img id="img" src="${cart_product[j].image}" alt="">
            </div>
            <div class="p-name col">
              <h6 id="name">${cart_product[j].name}</h6>
            </div>
            <div class="price col">
              <p id="price"> Price: ${cart_product[j].currency}  ${cart_product[j].cost}</p>
            </div>
            <div class="quantity col-sm-2">
            <button type="button" id="btn-left"><i class="fa fa-minus"></i></button>
              <input id="quantity" min="1" max="999" type="number" oninput="validity.valid || (value = '1');" value="${cart_product[j].count}">
              <button type="button" id="btn-right"><i class="fa fa-plus"></i></button>
            </div>
            <div class="sub-total col">
              <p> Precio: ${cart_product[j].currency} <span id="sub-total">${cart_product[j].cost + cart_product[j].count}</span></p>
            </div>
            </div>
            ` 
            productContainer.innerHTML += htmlToAppend;
        }
    }

    // Change input value 

    const productQuantity = document.querySelectorAll('#quantity'),
    quantityBtnLeft = document.querySelectorAll('#btn-left'),
    quantityBtnRight = document.querySelectorAll('#btn-right');

    for (let i = 0; i< productQuantity.length; i++) {

            productQuantity[i].addEventListener('change', () => {
                console.log(i);
                cartSubTotalRefresher(i);
            });

        quantityBtnLeft[i].addEventListener('click', () => {
            let sum = productQuantity[i].value - 1;
            if (sum <= 0 ) {
                productQuantity[i].focus();
                window.alert('Enter a valid number');
                return false;
            } else {
                productQuantity[i].value = sum;
            }
            cartSubTotalRefresher(i);
    
            if (checkbox1.checked == true) {
                displayCartTotal(shipmentCost(15));
            } else if (checkbox2.checked == true) {
                displayCartTotal(shipmentCost(7));
            } else { 
                displayCartTotal(shipmentCost(5));
            }
        });

        quantityBtnRight[i].addEventListener('click', () => {

        let sum = parseInt(productQuantity[i].value) + 1;
        if (sum === 1000) {
            productQuantity[i].focus();
            window.alert('You exceed the product availability');
        } else {
            productQuantity[i].value = sum;
        }
        cartSubTotalRefresher(i);

        if (checkbox1.checked == true) {
            displayCartTotal(shipmentCost(15));
        } else if (checkbox2.checked == true) {
            displayCartTotal(shipmentCost(7));
        } else { 
            displayCartTotal(shipmentCost(5));
        }
    });
    }

    // Change product subtotal value

    const cartSubTotal = document.querySelectorAll('#sub-total');

    function cartSubTotalRefresherForJSON() {
        cartSubTotal[0].innerHTML = " " + (productQuantity[0].value * CART_JSON[0].unitCost);
    }
    
    function cartSubTotalRefresher(n) {
        if (n === 0) {
            cartSubTotalRefresherForJSON();
        } else {
            cartSubTotal[n].innerHTML = " " + (productQuantity[n].value * CART_PRODUCTS[n-1].cost);
        }
    }


    function productsSum() {
        let sum = 0;
        for (let i = 0; i < cartSubTotal.length; i++) {
            sum += parseInt(cartSubTotal[i].innerHTML);
        }
        return sum;
    }

    // Checkboxes validation 

    const checkboxes = document.querySelectorAll('.tipo-list input'),
    checkbox1 = checkboxes[0],
    checkbox2 = checkboxes[1],
    checkbox3 = checkboxes[2];

    checkbox1.addEventListener('click', () => {
        checkbox2.checked = false;
        checkbox3.checked = false;
        displayCartTotal(shipmentCost(15));
    });
    checkbox2.addEventListener('click', () => {
        checkbox1.checked = false;
        checkbox3.checked = false;
        displayCartTotal(shipmentCost(7));
    });
    checkbox3.addEventListener('click', () => {
        checkbox1.checked = false;
        checkbox2.checked = false;
        displayCartTotal(shipmentCost(5));
    });

    // Shipment cost

    function shipmentCost(percentage) {
       let cost = (productsSum()) * (percentage / 100);
       cost = Math.round(cost);
       return cost;
    }

    // Direction validation 

    const directions = document.querySelectorAll('.direccion-envio input'),
    directionsContainer = document.getElementById('direccion'),
    street = directions[0],
    streetNumber = directions[1],
    streetCorner = directions[2];

    buyBtn.addEventListener('click', () => {

        if ( street.value == "" || streetNumber.value == "" || streetCorner.value == "" ) {
            directionsContainer.focus()
            window.alert("Fill all fields")
        } else {
            window.alert("Thanks for your purchase")
        }

    });    
    
    // Cart Total

    const cartTotal = document.getElementById('cart-total'),
    cartCurrency = document.getElementById('currency');

    cartCurrency.innerHTML = CART_JSON[0].currency;

    function displayCartTotal(shipment) {
        cartTotal.innerHTML = " " + (productsSum() + shipment);
    };

    cartTotal.innerHTML = " " + (productsSum() + shipmentCost(5));

    // displayCartTotal()

    // Buy

});




