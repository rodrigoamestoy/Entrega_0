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

        const productContainer = document.getElementById('product-container');

        // Images 

        const pImage0 = document.getElementById('p-img-0'),
        pImage1 = document.getElementById('p-img-1'),
        pImage2 = document.getElementById('p-img-2'),
        pImage3 = document.getElementById('p-img-3');

        pImage0.src = product.images[0];
        pImage1.src = product.images[1];
        pImage2.src = product.images[2];
        pImage3.src = product.images[3];

        pImage0.onmouseover = () => { bigImage.src = product.images[0]; };
        pImage1.onmouseover = () => { bigImage.src = product.images[1]; };
        pImage2.onmouseover = () => { bigImage.src = product.images[2]; };
        pImage3.onmouseover = () => { bigImage.src = product.images[3]; };
          

        // Big image display 

        const bigImage = document.getElementById('big-image');
        bigImage.src = product.images[0]

        const productName = document.getElementById('title');

        // Product Info 

        const productTitle = document.getElementById('product-name').innerHTML = product.name,
        productDescription = document.getElementById('product-description').innerHTML = product.description,
        productSoldCount = document.getElementById('sold-count').innerHTML = "Vendidos " + product.soldCount,
        productCost = document.getElementById('product-price').innerHTML = product.currency + " " + product.cost,
        productCategory = document.getElementById('product-category').innerHTML = "Categoria " + product.category;
      
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

        let stars = ""
        const fullStar = `<i class="fa fa-star checked"></i>`;
        const emptyStar = `<i class="fa fa-star"></i>`;
        stars = fullStar.repeat(comments[i].score) + emptyStar.repeat(5-comments[i].score);
        iconContainer[i].innerHTML += stars;
      }
    };

    // Upload new comment

    const uploadButton = document.getElementById('upload');

    uploadButton.addEventListener('click', () => {
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

    const relatedImg1 = document.getElementById('img-1'),
    relatedImg2 = document.getElementById('img-2'),
    relatedImg3 = document.getElementById('img-3'),
    fig1 = document.getElementById('fig-1'),
    fig2 = document.getElementById('fig-2'),
    fig3 = document.getElementById('fig-3');


    // Loops over the same category products and
    // if the ID is not equal to te actual displayed
    // product adds the product to an array

    const relatedProductsArray = [];

    for (let i = 0; i < products.length; i++) {

      if (String(ProductId) !== String(products[i].id)) {
        relatedProductsArray.push(i)
      }
    }

    // Selects the products position from the array and
    // displays the related images and its alt (name)

    relatedImg1.src = products[relatedProductsArray[0]].image;
    relatedImg1.alt = products[relatedProductsArray[0]].name;
    relatedImg2.src = products[relatedProductsArray[1]].image;
    relatedImg2.alt = products[relatedProductsArray[1]].name;
    relatedImg3.src = products[relatedProductsArray[2]].image;
    relatedImg3.alt = products[relatedProductsArray[2]].name;

    // Images figcaptions

    fig1.innerHTML = products[relatedProductsArray[0]].name;
    fig2.innerHTML = products[relatedProductsArray[1]].name;
    fig3.innerText = products[relatedProductsArray[2]].name;

    // When the img is clicked, sets the local storage ID to 
    // the selected product and opens it in a new page

    relatedImg1.addEventListener('click', () => {
      localStorage.setItem('product', products[relatedProductsArray[0]].id);
      window.open('product-info.html', '_blank');
    });

    relatedImg2.addEventListener('click', () => {
      localStorage.setItem('product', products[relatedProductsArray[1]].id);
      window.open('product-info.html', '_blank');
    });

    relatedImg3.addEventListener('click', () => {
      localStorage.setItem('product', products[relatedProductsArray[2]].id);
      window.open('product-info.html', '_blank');
    })
  };

    // Add to cart ????

    const addCart = document.getElementById('add-cart');

    cartObjects.cartProducts[0] = ProductId;
    cartObjects.cartProducts[1] = "123123";
    console.log(cartObjects)
    localStorage.setItem('cart', cartObjects);
    const getCart = localStorage.getItem('cart');


    console.log((getCart))
    addCart.addEventListener('click', () => {
      
      localStorage.setItem('cart', cartObjects);
    })

});

// CART Object

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
  async sync() {
    let _cart = JSON.stringify(CART.contents);
    await localStorage.setItem(CART.KEY, _cart);
  },
  add(id) {
    if (CART.find(id)) {
      CART.increase(id, 1);
    } else {
      let arr = PRODUCTS.filter(products => {
        if (product.id == id) {
          return true;
        }
      });
      if (arr & arr[0]) {
        let obj = {
          id: arr[0].id,
          title: arr[0].title,
          qty: 1,
          itemPrice: arr[0].price
        };
        CART.contents.push(obj);
        CART.sync();
      } else {
        
      }
    }
  },
  empty() {
    CART.contents = [];
    CART.sync()
  }
};