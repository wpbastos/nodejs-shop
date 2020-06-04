const fs = require('fs');
const path = require('path');

const Cart = require('./cart');

const productsFile = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');

const getProductsFromFile = (callback) => {
  fs.readFile(productsFile, (err, fileContent) => {
    if (err) {
      return callback([]);
    }
    try {
      callback(JSON.parse(fileContent));
    } catch (error) {
      callback([]);
    }
  });
};

module.exports = class Product {
  constructor(title, image, price, description, id = null) {
    this.id = id;
    this.title = title;
    this.image = image || '/images/book.jpeg';
    this.price = price;
    this.description = description;
  }

  save() {
    getProductsFromFile((products) => {
      if (this.id) {
        // update a old product
        const existingProductsIndex = products.findIndex((p) => p.id === this.id);
        if (existingProductsIndex < 0) return;
        const productsUpdated = [...products];
        productsUpdated[existingProductsIndex] = this;
        products = [...productsUpdated];
      } else {
        // save a new product
        this.id = Math.random().toString(36).substring(7);
        products.push(this);
      }
      fs.writeFile(productsFile, JSON.stringify(products), (err) => {
        if (err) {
          console.error('[error]', err);
        }
      });
    });
  }

  static delete(id) {
    getProductsFromFile((products) => {
      // const existingProductIndex = products.findIndex((p) => p.id === id);
      // if (existingProductIndex < 0) return;
      // products.splice(existingProductIndex, 1);
      const productPrice = products.find((p) => p.id === id).price;
      const updateProducts = products.filter((p) => p.id !== id);
      fs.writeFile(productsFile, JSON.stringify(updateProducts), (err) => {
        if (!err) {
          // delete from cart
          Cart.deleteProduct(id, productPrice);
        } else {
          console.error('[error]', err);
        }
      });
    });
  }

  static fetchAll(callback) {
    getProductsFromFile(callback);
  }

  static findById(id, callback) {
    getProductsFromFile((products) => {
      const product = products.find((p) => p.id === id);
      callback(product);
    });
  }
};
