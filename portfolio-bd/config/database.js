const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('portfolio', 'root', 'MATPET2007a@', {
  host: 'localhost',
  dialect: 'mysql',
  define: {
    timestamps: false   
  }
});

module.exports = sequelize;
