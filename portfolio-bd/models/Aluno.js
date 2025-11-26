const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Aluno extends Model {}

Aluno.init({
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  curso: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  instituicao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ano_ingresso: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, { sequelize, modelName: 'aluno' });

module.exports = Aluno;
