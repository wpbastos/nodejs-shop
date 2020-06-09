const Sequelize = require('sequelize');
const Model = Sequelize.Model;

const sequelize = require('../helpers/database');

class OrderItem extends Model {}
OrderItem.init(
  {
    id: {
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
    modelName: 'orderItem',
  }
);

module.exports = OrderItem;
