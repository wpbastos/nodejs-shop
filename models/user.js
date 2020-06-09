const Sequelize = require('sequelize');
const Model = Sequelize.Model;

const sequelize = require('../helpers/database');

class User extends Model {}
User.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: { isEmail: true },
    },
  },
  {
    sequelize,
    modelName: 'user',
  }
);

module.exports = User;
