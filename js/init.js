'use strict';

const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

function setComa(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

// Displays user in navbar

const emailNavbar = document.getElementById('email');

function emailDisplay() {
    const emailInfo = localStorage.getItem('user');
    if (emailInfo === null) {
      document.getElementById('sign-out').innerHTML = "Login";
      emailNavbar.innerHTML = "More Options"
    } else {
      emailNavbar.innerHTML = emailInfo;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    emailDisplay();
}) 

// Signs out

const signOutBtn = document.getElementById('sign-out');

signOutBtn.addEventListener('click', () => {
  localStorage.removeItem('user');
});

// Cart Object

const CART = {
  KEY: "1234",
  contents: [],
  init() {
    let _contents = localStorage.getItem(CART.KEY);
    if (_contents) {
      CART.contents = JSON.parse(_contents);
    } else {
      CART.contents = [];
      CART.sync();
    }
  },
  sync() {
    let _cart = JSON.stringify(CART.contents);
    localStorage.setItem(CART.KEY, _cart);
  },
  add(product) {
    const productId = String(product.id);
    if (CART.find(productId)) {
      CART.increase(productId, 1);
    } else {
        if (product.currency !== 'USD') {
          let USD = Math.ceil(product.cost / 42);
          let obj = {
            id: productId,
            name: product.name,
            image: product.images[0],
            count: 1,
            currency: 'USD',
            cost: USD,
          };
          CART.contents.push(obj);
        } else {
          let obj = {
            id: productId,
            name: product.name,
            image: product.images[0],
            count: 1,
            currency: 'USD',
            cost: parseInt(product.cost),
          };
          CART.contents.push(obj);

        }
        CART.sync();
    } 
  },
  empty() {
    CART.contents = [];
    CART.sync()
  },
  find(id) {
    let match = CART.contents.filter(item => item.id == id);
    console.log(match);
  },
  increase(id, count=1) {
    CART.contents = CART.contents.map(item =>{
      if(item.id === id) 
      item.count = item.count + count;
      return item;
    });
    CART.sync();
  },reduce(id, count=1 ) {
    CART.contents = CART.contents.map(item => {
      if (item.id == id)
      item.count = item.count - 1;
      return item;
    });
    CART.sync();
  },
  remove(id) {
    CART.contents = CART.contents.filter(item => {
      if (item.id = id)
      return true; 
    });
    CART.sync();
  },
};

export default {CART}