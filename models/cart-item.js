const Sequelize = require('sequelize');
const Model = Sequelize.Model;

const sequelize = require('../helpers/database');

class CartItem extends Model {}
CartItem.init(
  {
    _id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: { min: 1 },
    },
  },
  {
    sequelize,
    modelName: 'cartItem',
  }
);

module.exports = CartItem;
