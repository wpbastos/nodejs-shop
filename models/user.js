const mongodb = require('mongodb');

const { getDb } = require('../helpers/database');

const ObjectId = mongodb.ObjectId;

class User {
  constructor(name, email, cart = null, _id = null) {
    this._id = _id ? new ObjectId(_id) : _id;
    this.name = name;
    this.email = email;
    this.cart = cart ? cart : []; //
  }

  save() {
    const collection = getDb().collection('user');
    if (this._id) {
      return collection.updateOne({ _id: this._id }, { $set: this });
    } else {
      return collection.insertOne(this);
    }
  }

  addToCart(product) {
    const cart = [...this.cart];
    const collection = getDb().collection('user');
    const productIndex = cart.findIndex((cp) => cp.productId.toString() === product._id.toString());
    if (productIndex < 0) {
      cart.push({ productId: product._id, quantity: 1 });
    } else {
      cart[productIndex].quantity++;
    }
    return collection.updateOne({ _id: this._id }, { $set: { cart: cart } });
  }

  deleteFromCart(productId) {
    const cart = this.cart.filter((cp) => cp.productId.toString() !== productId);
    const collection = getDb().collection('user');
    return collection.updateOne({ _id: this._id }, { $set: { cart: cart } });
  }

  addOrder() {
    const collectionUser = getDb().collection('user');
    const collectionOrder = getDb().collection('order');
    return this.getProductsFromCart()
      .then((products) => {
        const user = { _id: this._id, name: this.name, email: this.email };
        return collectionOrder.insertOne({ user, products });
      })
      .then(() => {
        this.cart = [];
        return collectionUser.updateOne({ _id: this._id }, { $set: { cart: [] } });
      });
  }

  getProductsFromCart() {
    const collection = getDb().collection('product');
    const productIds = this.cart.map((product) => product.productId);
    return collection
      .find({ _id: { $in: productIds } })
      .toArray()
      .then((products) => {
        return products.map((product) => {
          const item = this.cart.find((cp) => cp.productId.toString() === product._id.toString());
          return { product, quantity: item.quantity };
        });
      });
  }

  getOrder() {
    const collection = getDb().collection('order');
    return collection.find({ 'user._id': this._id }).toArray();
  }

  static findById(_id) {
    const collection = getDb().collection('user');
    return collection.findOne({ _id: new ObjectId(_id) });
  }
}

module.exports = User;
