"use strict";

const CART_URL = 'https://japceibal.github.io/emercado-api/user_cart/25801.json';

async function USER_CART() {
    const RESPONSE = await fetch(CART_URL);
    if (RESPONSE.ok) {
        const data = await RESPONSE.json();
        return data.articles;
    } return '';
};

document.addEventListener('DOMContentLoaded', async () => {

    const buyBtn = document.getElementById('buy');
    const CART_JSON = await USER_CART();
    const CART = localStorage.getItem(1234);
    const CART_PRODUCTS = JSON.parse(CART);

    // Number of items in the cart

    function numOfItems(items) {
        let sum = 0;
        let one = 1
        for (let i = 0; i < items; i++) {
            sum += one;
        }
        return sum;
    };
    document.getElementById('n-products').innerHTML = numOfItems(1 + (CART_PRODUCTS ? CART_PRODUCTS.length : 0));

    // Displays json cart product and the cart object

    const productContainer = document.getElementById('display-products');
    displayCart(CART_JSON);

    function displayCart(product) {
        

        // JSON product

        for (let i = 0; i < product.length; i++ ) {

            let htmlToAppend = `
            <div class="product-container">
            <div class="img-container col-sm-1"> 
                <img id="img" src="${product[i].image}" alt="">
            </div>
            <div class="p-name col-sm-2">
              <h6 id="name">${product[i].name}</h6>
            </div>
            <div class="price col-sm-2">
              <p id="price"> Price: ${product[i].currency}  ${setComa(product[i].unitCost)}</p>
            </div>
            <div class="quantity col-sm-2">
            <button type="button" id="btn-left"><i class="fa fa-minus"></i></button>
              <input id="quantity" min="1" max="999" type="number" oninput="validity.valid || (value = '1');" value="${product[i].count}">
              <button type="button" id="btn-right"><i class="fa fa-plus"></i></button>
            </div>
            <div class="sub-total col-sm-2">
              <p> Subtotal: ${product[i].currency} <span id="sub-total">${setComa(product[i].unitCost)}</span></p>
            </div>
            <div class="delete col-sm-1">
                <button><i class="fa fa-times"></i></button>
            </div>
            </div>
            ` 
            productContainer.innerHTML += htmlToAppend;
        }

        // CART products

        if (CART_PRODUCTS) {
            for (let j = 0; j < CART_PRODUCTS.length; j++) {
                let cart_product = CART_PRODUCTS;
                let htmlToAppend = `
                <div class="product-container">
                <div class="img-container col-sm-1"> 
                    <img id="img" src="${cart_product[j].image}" alt="">
                </div>
                <div class="p-name col-sm-2">
                  <h6 id="name">${cart_product[j].name}</h6>
                </div>
                <div class="price col-sm-2">
                  <p id="price"> Price: ${cart_product[j].currency}  ${setComa(cart_product[j].cost)}</p>
                </div>
                <div class="quantity col-sm-2">
                <button type="button" id="btn-left"><i class="fa fa-minus"></i></button>
                  <input id="quantity" min="1" max="999" type="number" oninput="validity.valid || (value = '1');" value="${cart_product[j].count}">
                  <button type="button" id="btn-right"><i class="fa fa-plus"></i></button>
                </div>
                <div class="sub-total col-sm-2">
                  <p> Subtotal: ${cart_product[j].currency} <span id="sub-total">${setComa((cart_product[j].cost * cart_product[j].count))}</span></p>
                </div>
                <div class="delete col-sm-1">
                    <button><i class="fa fa-times"></i></button>
                </div>
                </div>
                ` 
                productContainer.innerHTML += htmlToAppend; 
        }
        }
    }

    // Change input value 

    const productQuantity = document.querySelectorAll('#quantity'),
    quantityBtnLeft = document.querySelectorAll('#btn-left'),
    quantityBtnRight = document.querySelectorAll('#btn-right');

    for (let i = 0; i< productQuantity.length; i++) {

        // Refreshes the cart subtotal when there is a change in 
        // the inputs values

        productQuantity[i].addEventListener('change', () => {
            cartSubTotalRefresher(i);
        });

        // Decreases the inputs value and checks the value don´t
        // go to 0

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
    
            // Sends the new value to the display function and 
            // sends the shipment cost according to which checkbox
            // is checked

            if (checkbox1.checked == true) {
                displayCartTotal(shipmentCost(15));
            } else if (checkbox2.checked == true) {
                displayCartTotal(shipmentCost(7));
            } else { 
                displayCartTotal(shipmentCost(5));
            }
        });

        // Increases the inputs value and checks it doesn´t exceed 
        // the product availability

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

    // Refreshes the product subtotal value

    const cartSubTotal = document.querySelectorAll('#sub-total');

    // Server product function

    function cartSubTotalRefresherForJSON() {
        cartSubTotal[0].innerHTML = " " + (productQuantity[0].value * CART_JSON[0].unitCost);
    }

    // Cart object function
    
    function cartSubTotalRefresher(n) {
        if (n === 0) {
            cartSubTotalRefresherForJSON();
        } else {
            cartSubTotal[n].innerHTML = " " + (productQuantity[n].value * CART_PRODUCTS[n-1].cost);
        }
    }

    // Delete product 

    const deleteBtn = document.querySelectorAll('.delete');

    for (let j = 0; j < deleteBtn.length; j++) {

        if (j > 0) {
            deleteBtn[j].addEventListener('click', () => {
                deleteBtn[j].parentElement.remove();
                // Add CART.delete function with NodeJS or import method
            });
        } else {
            deleteBtn[j].addEventListener('click', () => {
                deleteBtn[j].parentElement.remove();
            });
        }
    }

    // Takes the innerHTML of all the products SubTotal and realizes
    // the sum 

    function productsSum() {
        let sum = 0;
        for (let i = 0; i < cartSubTotal.length; i++) {
            sum += parseInt(cartSubTotal[i].innerHTML.replace(/\./g,''));
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

    // Displays the cart total when the page loads

    cartTotal.innerHTML = " " + (productsSum() + shipmentCost(5));

    // Purchase options 

    const cardContainer = document.getElementById('card-container');
    const bankContainer = document.getElementById('bank-container');
    const cardPurchase = document.getElementById('card-transaction');
    const bankPurchase = document.getElementById('bank-transaction');

    cardPurchase.addEventListener('click', () => {
        bankPurchase.checked = false;
        cardContainer.style.visibility = "visible";
        bankContainer.style.visibility = "hidden";
    });
    bankPurchase.addEventListener('click', () => {
        cardPurchase.checked = false;
        bankContainer.style.visibility = "visible";
        cardContainer.style.visibility = "hidden";
    });

    function purchaseValidation() {

    }
});




