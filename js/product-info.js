'use strict';    

const URL = 'https://japceibal.github.io/emercado-api/products/' + localStorage.getItem('product') + '.json';

    document.addEventListener('DOMContentLoaded', () => {


      let product = undefined;

      getJSONData(URL).then(function(resultObj){
        if (resultObj.status === "ok"){
          product = resultObj.data;
          productInfo();
  }
});

    // Product Info Display

    function productInfo() {

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

        let comments = undefined;

      getJSONData(COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
          comments = resultObj.data;
          productComments();
          starRating()
  }
});

        function productComments() {

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

    function starRating() {

      for (let i = 0; i < comments.length; i++) {

        const iconContainer = document.querySelectorAll('#rating');

        // Goes trough the i elements (odd numbers) and colors them if
        // they fulfill the requirements

        if (comments[i].score === 5) {
          iconContainer[i].childNodes[3].classList.add('checked');
          iconContainer[i].childNodes[5].classList.add('checked');
          iconContainer[i].childNodes[7].classList.add('checked');
          iconContainer[i].childNodes[9].classList.add('checked');
        } if (comments[i].score === 4) {
          iconContainer[i].childNodes[3].classList.add('checked');
          iconContainer[i].childNodes[5].classList.add('checked');
          iconContainer[i].childNodes[7].classList.add('checked');
        } if (comments[i].score === 3) {
          iconContainer[i].childNodes[3].classList.add('checked');
          iconContainer[i].childNodes[5].classList.add('checked');
        } if (comments[i].score === 2) {
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

    // Displays LocalStorage

    window.addEventListener('load', () => {
      const commentsContainer = document.getElementById('comments-container');

    //  commentsContainer.innerHTML = localStorage.getItem('comments');

      const deleteBtn = document.getElementById('deletebtn');
      deleteBtn.addEventListener('click', () => {
   //     localStorage.removeItem('comments');
      })

    });
});



