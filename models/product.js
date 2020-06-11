const mongodb = require('mongodb');
const { getDb } = require('../helpers/database');

class Product {
  constructor(title, price, imageUrl, description, _id = null) {
    this._id = _id ? new mongodb.ObjectId(_id) : _id;
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
  }

  save() {
    if (this._id) {
      return getDb().collection('product').updateOne({ _id: this._id }, { $set: this });
    } else {
      return getDb().collection('product').insertOne(this);
    }
  }

  static fetchAll() {
    return getDb().collection('product').find().toArray();
  }

  static findById = (_id) => {
    return getDb()
      .collection('product')
      .find({ _id: new mongodb.ObjectId(_id) })
      .next();
  };

  static deleteById(_id) {
    return getDb()
      .collection('product')
      .deleteOne({ _id: new mongodb.ObjectId(_id) });
  }
}

module.exports = Product;
