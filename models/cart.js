const fs = require('fs');
const path = require('path');

const cartFile = path.join(path.dirname(process.mainModule.filename), 'data', 'cart.json');

const getCartFromFile = (callback) => {
  fs.readFile(cartFile, (err, fileContent) => {
    if (err) {
      callback({ products: [], totalPrice: 0 });
    } else {
      try {
        callback(JSON.parse(fileContent));
      } catch (error) {
        callback({ products: [], totalPrice: 0 });
      }
    }
  });
};

module.exports = class Cart {
  static addProduct(id, productPrice) {
    getCartFromFile((cart) => {
      const existingProductIndex = cart.products.findIndex((prod) => prod.id === id);
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.quantity = updatedProduct.quantity + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, quantity: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + productPrice;
      fs.writeFile(cartFile, JSON.stringify(cart), (err) => {
        if (err) {
          console.error('error', err);
        }
      });
    });
  }

  static deleteProduct(id, productPrice) {
    getCartFromFile((cart) => {
      const existingProductIndex = cart.products.findIndex((p) => p.id === id);
      if (existingProductIndex < 0) return;
      const updatedCart = { ...cart };
      const productQuantity = updatedCart.products[existingProductIndex].quantity;
      updatedCart.totalPrice = updatedCart.totalPrice - productQuantity * productPrice;
      updatedCart.products = updatedCart.products.filter((p) => p.id !== id);
      fs.writeFile(cartFile, JSON.stringify(updatedCart), (err) => {
        if (err) {
          console.error('[error]', err);
        }
      });
    });
  }

  static fetchAll(callback) {
    getCartFromFile(callback);
  }
};
