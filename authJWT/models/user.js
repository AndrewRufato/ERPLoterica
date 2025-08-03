// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  criado_em: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  empresa_id: {
    type: DataTypes.INTEGER,
    allowNull: false  // se for obrigatório
  }

}, {
  tableName: 'usuarios', // Nome da tabela no banco
  timestamps: false     // Desativa createdAt/updatedAt automáticos se não usados
});

module.exports = User;
