const Sequelize = require('sequelize');
const sequelize = new Sequelize('nodejs_shop', 'root', 'testest', {
  dialect: 'mariadb',
  host: '127.0.0.1',
  dialectOptions: { connectTimeout: 1000, timezone: 'Etc/GMT+4' },
  timezone: '-04:00',
});

module.exports = sequelize;
