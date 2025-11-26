const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Projetos extends Model {}

Projetos.init({
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  link: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  concluido: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  tecnologias: {
  type: DataTypes.JSON,
  allowNull: false,
  defaultValue: []
}
  
}, { sequelize, modelName: 'projetos' });


module.exports = Projetos;
