const Cart = require('./cart');
const db = require('../helpers/mysql-connect');

module.exports = class Product {
  constructor(title, price, imageUrl, description, id = null) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl || '/images/book.jpeg';
    this.description = description;
  }

  save() {
    return db.execute(
      `INSERT INTO product
        (title, price, imageUrl, description) VALUES
        (?, ?, ?, ?)`,
      [this.title, this.price, this.imageUrl, this.description]
    );
  }

  update() {
    return db.execute(
      `UPDATE product SET
          title = ?,
          price = ?,
          imageUrl = ?,
          description = ?
        WHERE id = ?`,
      [this.title, this.price, this.imageUrl, this.description, this.id]
    );
  }

  static fetchAll() {
    return db.execute(
      `SELECT id, title, price, imageUrl, description
        FROM product`
    );
  }

  static findById(id) {
    return db.execute(
      `SELECT id, title, price, imageUrl, description
        FROM product
        WHERE id = ?`,
      [id]
    );
  }

  static delete(id) {
    return db.execute(
      `DELETE
        FROM product
        WHERE id = ?`,
      [id]
    );
  }
};
