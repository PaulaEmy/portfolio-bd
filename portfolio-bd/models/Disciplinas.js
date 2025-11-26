const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Disciplinas extends Model {}

Disciplinas.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cursada: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, { 
  sequelize, 
  modelName: 'disciplinas'
});

module.exports = Disciplinas;
