'use strict';

const USER_URL = 'https://japceibal.github.io/emercado-api/user_cart/25801.json'

async function USER_CART() {
    const RESPONSE = await fetch(USER_URL);
    if (RESPONSE.ok) {
        const data = await RESPONSE.json();
        return data.articles;
    } return '';
}

document.addEventListener('DOMContentLoaded', async () => {

    const cartProducts = await USER_CART();
    const numberItems = document.getElementById('n-products');
    numberItems.innerHTML = cartProducts.length;

    // Displays json cart products

    const displayCart = (product) => {
        const productContainer = document.getElementById('display-products');

        for (let i = 0; i < product.length; i++ ) {

            let htmlToAppend = `
            <div class="img-container"> 
                <img id="img" src="${product[i].image}" alt="">
            </div>
            <div class="p-name">
              <h6 id="name">${product[i].name}</h6>
            </div>
            <div class="price">
              <p id="price"> Price: ${product[i].currency}  ${product[i].unitCost}</p>
            </div>
            <div class="quantity">
            <button type="button" id="btn-left"><i class="fa fa-minus"></i></button>
              <input id="quantity" min="1" max="999" type="number" oninput="validity.valid || (value = '1');" value="${product[i].count}">
              <button type="button" id="btn-right"><i class="fa fa-plus"></i></button>
            </div>
            <div class="sub-total">
              <p id="sub-total">${product[i].currency} ${product[i].unitCost + product[i].count}</p>
            </div>
            ` 
            productContainer.innerHTML += htmlToAppend;
        }
    }
    displayCart(cartProducts);

    // Change input value 

    const productQuantity = document.getElementById('quantity'),
    quantityBtnLeft = document.getElementById('btn-left'),
    quantityBtnRight = document.getElementById('btn-right');

    quantityBtnLeft.addEventListener('click', () => {
        let sum = productQuantity.value - 1;
        if (sum <= 0 ) {
            productQuantity.focus();
            window.alert('Enter a valid number')
            return false;
        } else {
            productQuantity.value = sum;
        }
        cartSubTotal.innerHTML = cartProducts[0].currency + " " + (productQuantity.value * cartProducts[0].unitCost);
    });
    quantityBtnRight.addEventListener('click', () => {
        let sum = parseInt(productQuantity.value) + 1
        productQuantity.value = sum;
        cartSubTotal.innerHTML = cartProducts[0].currency + " " + (productQuantity.value * cartProducts[0].unitCost);
    });

    // Change product subtotal value

    const cartSubTotal = document.getElementById('sub-total');

    productQuantity.addEventListener('change', () => {
        cartSubTotal.innerHTML = cartProducts[0].currency + " " + (productQuantity.value * cartProducts[0].unitCost);
    });

    function quantityCheck() {
        if (productQuantity.value < 1) {
            productQuantity.focus()
            productQuantity.style.border = "1px solid red";
        }
    }
    // Cart Total

    const cartTotal = document.getElementById('cart-total');

    const displayCartTotal = (products, shipment) => {
        cartTotal.innerHTML = "$ " + (products + shipment);
    }
    // displayCartTotal()
})