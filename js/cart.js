"use strict";

import {CART} from "../js/cartobject.js";

const CART_URL = 'https://japceibal.github.io/emercado-api/user_cart/25801.json';

async function USER_CART() {
    const RESPONSE = await fetch(CART_URL);
    if (RESPONSE.ok) {
        const data = await RESPONSE.json();
        return data.articles;
    } return '';
};

document.addEventListener('DOMContentLoaded', async () => {

    const productContainer = document.getElementById('display-products');
    const CART_JSON = await USER_CART();
    const cart = localStorage.getItem(1234);
    const CART_PRODUCTS = JSON.parse(cart);

    CART.init();
    displayCart(CART_JSON);

    function displayCart(product) {
        
        // JSON product

        for (let i = 0; i < product.length; i++ ) {

            let htmlToAppend = `
            <div class="product-container">
            <div class="img-container col-sm-2"> 
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
              <input id="quantity" min="1" max="99" type="number" oninput="validity.valid || (value = '1');" value="${product[i].count}">
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
                <div class="img-container col-sm-2"> 
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
                  <input id="quantity" min="1" max="99" type="number" oninput="validity.valid || (value = '1');" value="${cart_product[j].count}">
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
    };

    // Number of items in the cart

    let productsInCart = document.getElementById('n-products');
    productsInCart.innerHTML = numOfItems();

    function numOfItems() {
        let productsInCart = document.querySelectorAll('.product-container');
        return productsInCart.length;
    };

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

        // Decreases the inputs value and checks the value is not
        // less than 0

        quantityBtnLeft[i].addEventListener('click', () => {
            let sum = productQuantity[i].value - 1;
            if (sum <= 0 ) {
                productQuantity[i].focus();
                window.alert('Enter a valid number');
                return false;
            } else {
                productQuantity[i].value = sum;
                CART.reduce(CART.contents[i-1].id);
            }

            // Refreshes the cart subtotal for the JSON and the Object

            cartSubTotalRefresher(i);
            subTotal();
    
            // Sends the new value to the display function and 
            // sends the shipment cost according to which checkbox
            // is checked

            if (checkbox1.checked == true) {
                displayCartTotal(shipmentCost(15));
                shipmentTotal(15);
            } else if (checkbox2.checked == true) {
                displayCartTotal(shipmentCost(7));
                shipmentTotal(7);
            } else { 
                displayCartTotal(shipmentCost(5));
                shipmentTotal(5);
            }
        });

        // Increases the inputs value and checks it doesn´t exceed 
        // the product availability

        quantityBtnRight[i].addEventListener('click', () => {

        let sum = parseInt(productQuantity[i].value) + 1;
        if (sum === 100) {
            productQuantity[i].focus();
            window.alert('You exceed the product availability');
        } else {
            productQuantity[i].value = sum;
            CART.increase(CART.contents[i-1].id);
        }

        // Refreshes the cart subtotal for the JSON and the Object

        cartSubTotalRefresher(i);
        subTotal();

        if (checkbox1.checked == true) {
            displayCartTotal(shipmentCost(15));
            shipmentTotal(15);
        } else if (checkbox2.checked == true) {
            displayCartTotal(shipmentCost(7));
            shipmentTotal(7);
        } else { 
            displayCartTotal(shipmentCost(5));
            shipmentTotal(5);
        }
        });
    };

    // Refreshes the product subtotal value

    let cartSubTotal = document.querySelectorAll('#sub-total');

    // Server product function

    function cartSubTotalRefresherForJSON() {
        cartSubTotal[0].innerHTML = " " + setComa(productQuantity[0].value * CART_JSON[0].unitCost);
    };

    // Cart object function
    
    function cartSubTotalRefresher(n) {
        if (n === 0) {
            cartSubTotalRefresherForJSON();
        } else {
            cartSubTotal[n].innerHTML = " " + setComa(productQuantity[n].value * CART_PRODUCTS[n-1].cost);
        }
    };

    // Deletes product 

    const deleteBtn = document.querySelectorAll('.delete');

    for (let j = 0; j < deleteBtn.length; j++) {

        if (j > 0) {
            deleteBtn[j].addEventListener('click', () => {
                deleteBtn[j].parentElement.remove();
                CART.remove(CART.contents[j-1].id);
                let shipment = document.querySelectorAll('#envio-checked');
                let x = [];
                for (let i = 0; i < shipment.length; i++) {
                    if (shipment[i].checked) {
                        x.push(shipment[i]);
                    };
                };
                cartSubtotal.innerHTML = " " + setComa(productsTotal());
                cartShipment.innerHTML = " " + setComa(shipmentCartTotal(x[0].value));
                cartTotal.innerHTML = " " + setComa((productsTotal() + shipmentCartTotal(x[0].value)));
                productsInCart.innerHTML = numOfItems();
            });
        } else {
            deleteBtn[j].addEventListener('click', () => {
                deleteBtn[j].parentElement.remove();
                cartSubtotal.innerHTML = 0;
                cartShipment.innerHTML = 0;
                cartTotal.innerHTML = 0;
                productsInCart.innerHTML = numOfItems();
            });
        }
    };

    // Takes the innerHTML of all the products SubTotal and realizes
    // a sum 

    function productsSum() {
        let cartSubTotal = document.querySelectorAll('#sub-total')
        let sum = 0;
        for (let i = 0; i < cartSubTotal.length; i++) {
            sum += parseInt(cartSubTotal[i].innerHTML.replace(/\./g,''));
        }
        return sum;
    };

    // Functions for CART objects

    function productsTotal() {
        let sum = 0;
        for (let i = 0; i < CART.contents.length; i++) {
            sum = (CART.contents[i].cost * CART.contents[i].count) + sum;
        }
        return parseInt(sum + CART_JSON[0].unitCost);
    }
    function shipmentCartTotal(percentage) {
        let cost = (productsTotal()) * (percentage / 100);
        cost = Math.round(cost);
        return cost;
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
        shipmentTotal(15);
        shipmentCartTotal(15)
    });
    checkbox2.addEventListener('click', () => {
        checkbox1.checked = false;
        checkbox3.checked = false;
        displayCartTotal(shipmentCost(7));
        shipmentTotal(7);
        shipmentCartTotal(7)
    });
    checkbox3.addEventListener('click', () => {
        checkbox1.checked = false;
        checkbox2.checked = false;
        displayCartTotal(shipmentCost(5));
        shipmentTotal(5);
        shipmentCartTotal(5)
    });

    // Shipment cost

    function shipmentCost(percentage) {
       let cost = (productsSum()) * (percentage / 100);
       cost = Math.round(cost);
       return cost;
    };
    
    // Cart Total, Subtotal & Shipment

    const cartSubtotal = document.getElementById('cart-sub-total');
    const cartShipment = document.getElementById('shipment-total');
    const cartTotal = document.getElementById('cart-total');

    function displayCartTotal(shipment) {
        cartTotal.innerHTML = " " + setComa((productsSum() + shipment));
    };
    function shipmentTotal(shipment) {
        cartShipment.innerHTML = setComa(shipmentCost(shipment));
    };
    function subTotal() {
        cartSubtotal.innerHTML = " " + setComa(productsSum());
    };

    cartSubtotal.innerHTML = " " + setComa(productsSum());
    cartShipment.innerHTML = " " + setComa(shipmentCost(5));
    cartTotal.innerHTML = " " + setComa((productsSum() + shipmentCost(5)));

    // Purchase options 

    const cardContainer = document.getElementById('card-container');
    const bankContainer = document.getElementById('bank-container');
    const cardPurchase = document.getElementById('card-transaction');
    const bankPurchase = document.getElementById('bank-transaction');

    cardPurchase.addEventListener('click', () => {
        bankPurchase.checked = false;
        cardContainer.style.visibility = "visible";
        bankContainer.style.visibility = "hidden";
        bankAccount.value = "";
    });
    bankPurchase.addEventListener('click', () => {
        cardPurchase.checked = false;
        bankContainer.style.visibility = "visible";
        cardContainer.style.visibility = "hidden";
        cardNumber.value = "";
        cardExpiration.value = "";
        cardSecurityCode.value = "";
    });

    // Purchase Validations

    const cardNumber = document.getElementById('card-number'),
    cardSecurityCode = document.getElementById('security-code'),
    cardExpiration = document.getElementById('expiration'),
    savePuchase = document.getElementById('save-purchase'),
    bankAccount = document.getElementById('bank-account'),
    purchaseMethod = document.getElementById('purchase-method'),
    succesAlert = document.getElementById('succes-alert'),
    errorAlert = document.getElementById('error-alert'),
    directions = document.querySelectorAll('.direccion-envio input'),
    street = directions[0],
    streetNumber = directions[1],
    streetCorner = directions[2];

    function shipmentValidation() {
        if (street.value != "" && streetNumber.value != "" && streetCorner.value != "") {
            return true;
        } else if ( street.value == "" ) {
            setTimeout( () => {
            street.style.outline = "1px solid red";;
            street.focus();
            street.placeholder = "Ingrese un valor";
            }, 0);
            setTimeout( () => {
                street.blur();
                street.style.outline = "none"
                street.placeholder = "";
            }, 4000)
            return false;
        } else if ( streetNumber.value == "" ) {
            setTimeout( () => {
                streetNumber.style.outline = "1px solid red";;
                streetNumber.focus();
                streetNumber.placeholder = "Ingrese un valor";
                }, 0);
                setTimeout( () => {
                    streetNumber.blur();
                    streetNumber.style.outline = "none"
                    streetNumber.placeholder = "";
                }, 4000)
                return false;
        } else {
            setTimeout( () => {
                streetCorner.style.outline = "1px solid red";;
                streetCorner.focus();
                streetCorner.placeholder = "Ingrese un valor";
                }, 0);
                setTimeout( () => {
                    streetCorner.blur();
                    streetCorner.style.outline = "none"
                    streetCorner.placeholder = "";
                }, 4000)
                return false;
        }
    };
    function cardValidation() {
        if (cardNumber.value > 6 && cardExpiration.value != "" && cardSecurityCode.value.length == 4 ) {
            return true;
        } else {
            return false;
        }
    };

    function succesAlertVanish() {
        succesAlert.style.visibility = "hidden";
    };
    function purchaseValidation() {
        if ( cardValidation() != false && shipmentValidation() != false || bankAccount.value != "" &&  shipmentValidation() != false) {
            setTimeout(succesAlertVanish, 5000);
            succesAlert.style.visibility = "visible";
            succesAlert.scrollIntoView();
        } else {
            shipmentValidation();
            setTimeout( () => {
                errorAlert.style.visibility = "hidden";
            }, 5000);
            setTimeout( () => {
                errorAlert.scrollIntoView();
                errorAlert.style.visibility = "visible";
            }, 1)
            
        }
    };

    savePuchase.addEventListener('click', () => {
        if ( bankPurchase.checked || cardPurchase.checked ) 
        // Checks if the bank option is checked
        bankPurchase.checked ? 
        // If checked sets this HTML
        purchaseMethod.innerHTML = "Transferencia Bancaria <i class='fa fa-university'></i>" : 
        // If it is not checked sets this HTML
        purchaseMethod.innerHTML = "Tarjeta <i class='fa fa-credit-card'></i>";
    });

    // Buy

    const buyBtn = document.getElementById('buy');

    buyBtn.addEventListener('click', () => {
        purchaseValidation();
    });    
});