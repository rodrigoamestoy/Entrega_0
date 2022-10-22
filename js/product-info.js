"use strict";    

import {CART} from "/js/CART_OBJECT.js";

const ProductId = localStorage.getItem('product');
const PRODUCT_URL = 'https://japceibal.github.io/emercado-api/products/' + ProductId + '.json';
const COMMENTS_URL = 'https://japceibal.github.io/emercado-api/products_comments/' + ProductId + '.json';
const PRODUCT_CATEGORY_URL = 'https://japceibal.github.io/emercado-api/cats_products/' + localStorage.getItem('catID') + '.json';

async function PRODUCT_CATEGORY() {
  const RESPONSE = await fetch(PRODUCT_CATEGORY_URL);
  if (RESPONSE.ok) {
      const data = await RESPONSE.json();
      return data.products;
  } return '';
};

async function COMMENTS_DISPLAY() {
  const RESPONSE = await fetch(COMMENTS_URL);
  if (RESPONSE.ok) {
      const commentsDATA = await RESPONSE.json();
      return commentsDATA;
  } return '';
};

async function PRODUCT_INFO() {
  const RESPONSE = await fetch(PRODUCT_URL);
  if (RESPONSE.ok) {
    const productDATA = await RESPONSE.json();
    return productDATA;
  } return '';
};


document.addEventListener('DOMContentLoaded', async () => {
      
    // Product Info Display

    const product = await PRODUCT_INFO();
    const images = document.querySelectorAll('#p-imgs')
    productInfo(product);

    function productInfo(product) {

        // Product Images 

        images[0].src = product.images[0];
        images[1].src = product.images[1];
        images[2].src = product.images[2];
        images[3].src = product.images[3];

        images[0].onmouseover = () => { bigImage.src = product.images[0]; };
        images[1].onmouseover = () => { bigImage.src = product.images[1]; };
        images[2].onmouseover = () => { bigImage.src = product.images[2]; };
        images[3].onmouseover = () => { bigImage.src = product.images[3]; };

        // Big image display 

        const bigImage = document.getElementById('big-image');
        bigImage.src = product.images[0];

        // Product Info 

        const productTitle = document.getElementById('product-name').innerHTML = product.name,
        productDescription = document.getElementById('product-description').innerHTML = product.description,
        productSoldCount = document.getElementById('sold-count').innerHTML = "Vendidos: " + product.soldCount,
        productCost = document.getElementById('product-price').innerHTML = "Price: " + product.currency + " " + product.cost,
        productCategory = document.getElementById('product-category').innerHTML = "Categoria: " + product.category;
      
        }

        // Comments Display

        const comments = await COMMENTS_DISPLAY();
        productComments(comments);
        
        function productComments(comments) {

            const commentsContainer = document.getElementById('comments-container');

            for (let i = 0; i < comments.length; i++) {

            let dateTime = comments[i].dateTime.replaceAll('-','/');
            dateTime = dateTime.slice(0,10);
              
            commentsContainer.innerHTML += `
            <div class="row comment-container">
                <div class="col">
                    <h4>${comments[i].user}</h4>
                    <p>${comments[i].description}</p>
                </div>
                <div class="col col-sm-3" id="rating">
                </div>
                <div class="row dateTime">
                  ${dateTime}
                </div>
            </div>
            
                `;
            }
    };

    // Rating

    starRating(comments);

    function starRating(comments) {
      for (let i = 0; i < comments.length; i++) {

        const iconContainer = document.querySelectorAll('#rating');

        // Repeats checked stars according to score and the remainder
        // to fulfill the 5 star system is fulfilled with no checked stars

        let stars = "";
        const fullStar = `<i class="fa fa-star checked"></i>`;
        const emptyStar = `<i class="fa fa-star"></i>`;
        stars = fullStar.repeat(comments[i].score) + emptyStar.repeat(5-comments[i].score);
        iconContainer[i].innerHTML += stars;

      }
    };

    // Upload new comment

    const uploadBtn = document.getElementById('upload');

    uploadBtn.addEventListener('click', () => {
      uploadComment();
    })

    document.getElementById('form').addEventListener('submit', (e) => {
      e.preventDefault();
    })
  
    function uploadComment() {

      let comentario = document.getElementById('opinion').value;
      let puntuacion = document.getElementById('puntuacion').value;
      let user = localStorage.getItem('user');
      let today = new Date();
      let date = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate();
      let dateTime = date;

      let stars = ""
      const fullStar = `<i class="fa fa-star checked"></i>`;
      const emptyStar = `<i class="fa fa-star"></i>`;
      stars = fullStar.repeat(puntuacion) + emptyStar.repeat(5-puntuacion);

      const commentsContainer = document.getElementById('comments-container');

      commentsContainer.innerHTML += 
      `
      <div class="row comment-container" id="myComment">
                <div class="col">
                    <h4>${user}</h4>
                    <p>${comentario}</p>
                </div>
                <div class="col col-sm-3" id="rating">
                  ${stars}
                </div>
                <div class="row dateTime">
                  ${dateTime}
                </div>
            </div>
      `
  }

  // Displays related products IMG and NAME
  
  const products = await PRODUCT_CATEGORY();
  relatedProducts(products);

  function relatedProducts(products) {

    const relatedImgs = document.querySelectorAll('#c-imgs');
    const relatedFigs = document.querySelectorAll('#c-figs');

    const relatedProductsArray = products.filter(item => String(item.id) !== String(ProductId));

    // Selects the products position from the array and
    // displays the related images, figcaption and alt

    relatedImgs[0].src = relatedProductsArray[0].image;
    relatedImgs[0].alt = relatedProductsArray[0].name;
    relatedImgs[1].src = relatedProductsArray[1].image;
    relatedImgs[1].alt = relatedProductsArray[1].name;
    relatedImgs[2].src = relatedProductsArray[2].image;
    relatedImgs[2].alt = relatedProductsArray[2].name;
    relatedFigs[0].innerHTML = relatedProductsArray[0].name;
    relatedFigs[1].innerHTML = relatedProductsArray[1].name;
    relatedFigs[2].innerText = relatedProductsArray[2].name;

    // When the img is clicked, sets the local storage ID to 
    // the selected product and opens it in a new page

    relatedImgs[0].addEventListener('click', () => {
      localStorage.setItem('product', relatedProductsArray[0].id);
      window.open('product-info.html', 'reload');
    });

    relatedImgs[1].addEventListener('click', () => {
      localStorage.setItem('product', relatedProductsArray[1].id);
      window.open('product-info.html', 'reload');
    });

    relatedImgs[2].addEventListener('click', () => {
      localStorage.setItem('product', relatedProductsArray[2].id);
      window.open('product-info.html', 'reload');
    });
  };

    // Add to cart

    const addCart = document.getElementById('add-cart'),
    cartAlert = document.getElementById('cart-alert');

    addCart.addEventListener('click', () => {
      CART.init();
      CART.add(product);
      cartAlert.style.display = "block";
      setTimeout(() => {
        cartAlert.style.display = "";
      }, 2000);
    });
});