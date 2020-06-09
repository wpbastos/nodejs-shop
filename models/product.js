const Sequelize = require('sequelize');
const Model = Sequelize.Model;

const sequelize = require('../helpers/database');

class Product extends Model {}
Product.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    price: {
      type: Sequelize.DOUBLE,
      allowNull: false,
      validate: { min: 0.01 },
    },
    imageUrl: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'product',
  }
);

module.exports = Product;
