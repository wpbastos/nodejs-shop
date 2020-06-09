const Sequelize = require('sequelize');
const Model = Sequelize.Model;

const sequelize = require('../helpers/database');

class Order extends Model {}
Order.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    sequelize,
    modelName: 'order',
  }
);

module.exports = Order;
