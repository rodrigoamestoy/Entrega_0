'use strict';    

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
    productInfo(product);

    function productInfo(product) {

        const productName = document.getElementById('title');
        productName.innerText = product.name;

        container.innerHTML = `
                <div class="col product-container">
                <div class="row card-container">
                  <h5>Precio</h5>
                  <p id="price">${product.currency} ${product.cost}</p>
                </div>
                <div class="row card-container">
                  <h5>Descripción</h5>
                  <p id="description">${product.description}</p>
                </div>
                <div class="row card-container">
                  <h5>Categoría</h5>
                  <p id="category">${product.category}</p>
                </div>
                <div class="row card-container">
                  <h5>Cantidad de Unidades Vendidas</h5>
                  <p id="soldcount">${product.soldCount}</p>
                </div>
                <div class="row card-container">
                  <div class="col col-sm-3"><img id="img1" src="${product.images[0]}" alt=""></div>
                  <div class="col col-sm-3"><img id="img2" src="${product.images[1]}" alt=""></div>
                  <div class="col col-sm-3"><img id="img3" src="${product.images[2]}" alt=""></div>
                  <div class="col col-sm-3"><img id="img4" src="${product.images[3]}" alt=""></div>
                </div>
              </div>
                `
        }

        // Comments Display

        const comments = await COMMENTS_DISPLAY();
        productComments(comments);
        
        function productComments(comments) {

            const commentsContainer = document.getElementById('comments-container');

            for (let i = 0; i < comments.length; i++) {
              
            commentsContainer.innerHTML += `
            <div class="row comment-container">
                <div class="col">
                    <h4>${comments[i].user} ${comments[i].dateTime}</h4>
                    <p>${comments[i].description}</p>
                </div>
                <div class="col comment-container" id="rating">
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

        // Goes trough the i elements (odd numbers) and colors them if
        // they fulfill the requirements

        let stars = ""
        const fullStar = `<i class="fa fa-star checked"></i>`;
        const emptyStar = `<i class="fa fa-star"></i>`;
        stars = fullStar.repeat(comments[i].score) + emptyStar.repeat(5-comments[i].score);
        iconContainer[i].innerHTML += stars;
      }
    };

    const uploadButton = document.getElementById('upload');

    uploadButton.addEventListener('click', () => {
      uploadComments();
    })
  
    function uploadComments() {

      let comentario = document.getElementById('opinion').value;
      let puntuacion = document.getElementById('puntuacion').value;
      let user = localStorage.getItem('user');
      let today = new Date();
      let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      let dateTime = date + ' ' + time;

      let stars = ""
      const fullStar = `<i class="fa fa-star checked"></i>`;
      const emptyStar = `<i class="fa fa-star"></i>`;
      stars = fullStar.repeat(puntuacion) + emptyStar.repeat(5-puntuacion);

      const commentsContainer = document.getElementById('comments-container');

      commentsContainer.innerHTML += 
      `
      <div class="row comment-container" id="myComment">
                <div class="col">
                    <h4>${user} ${dateTime}</h4>
                    <p>${comentario}</p>
                </div>
                <div class="col comment-container" id="rating">
                  ${stars}
                </div>
            </div>
      `
  }

  // Displays related products IMG and NAME
  
  const products = await PRODUCT_CATEGORY();
  relatedProducts(products);

  function relatedProducts(products) {

    const relatedImg1 = document.getElementById('img-1'),
    relatedImg2 = document.getElementById('img-2'),
    relatedImg3 = document.getElementById('img-3'),
    fig1 = document.getElementById('fig-1'),
    fig2 = document.getElementById('fig-2'),
    fig3 = document.getElementById('fig-3');

    const relatedProductsArray = [];

    for (let i = 0; i < products.length; i++) {

      if (String(ProductId) !== String(products[i].id)) {
        relatedProductsArray.push(i)
      }
    }

    relatedImg1.src = products[relatedProductsArray[0]].image;
    relatedImg1.alt = products[relatedProductsArray[0]].name;
    relatedImg2.src = products[relatedProductsArray[1]].image;
    relatedImg2.alt = products[relatedProductsArray[1]].name;
    relatedImg3.src = products[relatedProductsArray[2]].image;
    relatedImg3.alt = products[relatedProductsArray[2]].name;

    fig1.innerHTML = products[relatedProductsArray[0]].name;
    fig2.innerHTML = products[relatedProductsArray[1]].name;
    fig3.innerText = products[relatedProductsArray[2]].name;

    relatedImg1.addEventListener('click', () => {
      localStorage.setItem('product', products[relatedProductsArray[0]].id);
      location.reload();
    });

    relatedImg2.addEventListener('click', () => {
      localStorage.setItem('product', products[relatedProductsArray[1]].id);
      location.reload();
    });

    relatedImg3.addEventListener('click', () => {
      localStorage.setItem('product', products[relatedProductsArray[2]].id);
      location.reload();
    })
  };
});