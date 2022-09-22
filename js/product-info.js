'use strict';    
    
    document.addEventListener('DOMContentLoaded', () => {

      // Requests Product Info

<<<<<<< Updated upstream
        const URL = 'https://japceibal.github.io/emercado-api/products/' + localStorage.getItem('product') + '.json';
        const REQUEST = new XMLHttpRequest();
        REQUEST.open('GET', URL);
        REQUEST.responseType = 'json';
        REQUEST.send();
=======
document.addEventListener('DOMContentLoaded', async () => {
>>>>>>> Stashed changes

        REQUEST.onload = function() {
        const URL_RESPONSE = REQUEST.response;
        productInfo(URL_RESPONSE); 
        }

    // Product Info Display

    function productInfo(jsonObj) {
        let product = jsonObj; 

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

        const COMMENTS_URL = 'https://japceibal.github.io/emercado-api/products_comments/' + localStorage.getItem('product') + '.json';
        const COMMENTS_REQUEST = new XMLHttpRequest();
        COMMENTS_REQUEST.open('GET', COMMENTS_URL);
        COMMENTS_REQUEST.responseType = 'json';
        COMMENTS_REQUEST.send();

        COMMENTS_REQUEST.onload = function() {
        const COMMENTS_URL_RESPONSE = COMMENTS_REQUEST.response;
        productComments(COMMENTS_URL_RESPONSE);
        starRating (COMMENTS_URL_RESPONSE);  
        }

        function productComments(jsonObj) {

            let comments = jsonObj;

            const commentsContainer = document.getElementById('comments-container');

            for (let i = 0; i < comments.length; i++) {
              
            commentsContainer.innerHTML += `
            <div class="row comment-container">
                <div class="col">
                    <h4>${comments[i].user} ${comments[i].dateTime}</h4>
                    <p>${comments[i].description}</p>
                </div>
                <div class="col comment-container" id="rating">
                  <i class="fa fa-star checked"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                </div>
            </div>
                `;
            }
    };

    // Displays Stars Ratings

    function starRating(jsonObj) {
      let comment = jsonObj;

      for (let i = 0; i < comment.length; i++) {

        const iconContainer = document.querySelectorAll('#rating');

        // Goes trough the i elements (odd numbers) and colors them if
        // they fulfill the requirements

        if (comment[i].score === 5) {
          iconContainer[i].childNodes[3].classList.add('checked');
          iconContainer[i].childNodes[5].classList.add('checked');
          iconContainer[i].childNodes[7].classList.add('checked');
          iconContainer[i].childNodes[9].classList.add('checked');
        } if (comment[i].score === 4) {
          iconContainer[i].childNodes[3].classList.add('checked');
          iconContainer[i].childNodes[5].classList.add('checked');
          iconContainer[i].childNodes[7].classList.add('checked');
        } if (comment[i].score === 3) {
          iconContainer[i].childNodes[3].classList.add('checked');
          iconContainer[i].childNodes[5].classList.add('checked');
        } if (comment[i].score === 2) {
          iconContainer[i].childNodes[3].classList.add('checked');
        }
      }
    };

    // Uploads Comment and Saves Comments when onclick

    const uploadButton = document.getElementById('upload');

    uploadButton.addEventListener('click', ()=> {
      uploadComments();
    })

    // Upload Comment Function
  
    function uploadComments() {

      // Gets Actual Time

      let comentario = document.getElementById('opinion').value;
      let puntuacion = document.getElementById('puntuacion').value;
      let user = localStorage.getItem('user');
      let today = new Date();
      let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      let dateTime = date + ' ' + time;

      console.log(puntuacion)

      // Adds Comment

      const commentsContainer = document.getElementById('comments-container');

      commentsContainer.innerHTML += 
      `
      <div class="row comment-container" id="myComment">
                <div class="col">
                    <h4>${user} ${dateTime}</h4>
                    <p>${comentario}</p>
                </div>
                <div class="col comment-container" id="rating">
                    <i class="fa fa-star checked"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                </div>
            </div>
      `; 
      localStorage.setItem('comments', commentsContainer.innerHTML);
    }
<<<<<<< Updated upstream

    // Displays LocalStorage

    window.addEventListener('load', () => {
      const commentsContainer = document.getElementById('comments-container');

    //  commentsContainer.innerHTML = localStorage.getItem('comments');

      const deleteBtn = document.getElementById('deletebtn');
      deleteBtn.addEventListener('click', () => {
   //     localStorage.removeItem('comments');
      })

    });
=======
  }

  const RELATED_URL = 'https://japceibal.github.io/emercado-api/cats_products/' + localStorage.getItem('catID') + '.json';

  async function relatedImages() {
    const RELATED_RESPONSE = await fetch(RELATED_URL);
    if (RELATED_RESPONSE.ok) {
        const relatedImagesData = await RELATED_RESPONSE.json();
        return relatedImagesData.products;
    } return '';
}

  const images = await relatedImages();
  const slidesContainer = document.getElementById('carousel-inner');
  const relatedImg1 = document.getElementById('img-1'),
  relatedImg2 = document.getElementById('img-2'),
  relatedImg3 = document.getElementById('img-3');
  relatedImg1.src = images[1].image;
  relatedImg2.src = images[2].image;
  relatedImg3.src = images[3].image;
  
>>>>>>> Stashed changes
});