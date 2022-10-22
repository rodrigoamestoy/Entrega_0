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
      let id= product.id;
      if (CART.find(id)) {
        CART.increase(id, 1);
      } else { 
          if (product.currency !== 'USD') {
            let USD = Math.ceil(product.cost / 42);
            let obj = {
              id: id,
              name: product.name,
              image: product.images[0],
              count: 1,
              currency: 'USD',
              cost: USD,
            };
            CART.contents.push(obj);
          } else {
            let obj = {
              id: id,
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
      let match = CART.contents.filter(item => {
        if(item == id)
        return true;
      });
      if (match && match[0])
      return match[0];
    },
    increase(id, count=1) {
      CART.contents = CART.contents.map(item =>{
        if(item.id === id) 
        item.count = item.count + count;
        return item;
      });
      CART.sync();
    },
    reduce(id, count=1 ) {
      CART.contents = CART.contents.map(item => {
        if (item.id == id)
        item.count = item.count - 1;
        return item;
      });
      CART.sync();
    },
    remove(id) {
        CART.contents = CART.contents.filter(item => {
            if (item.id != id)
            return true;
        });
        console.log(CART.contents)
        CART.sync();
    },
  };
  
  export {CART};