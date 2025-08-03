const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Venda = sequelize.define('Venda', {
  total: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  empresaId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  forma_pagamento: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nome_cliente: {
    type: DataTypes.STRING,
    allowNull: true
  },
  cpf_cliente: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'vendas',
  timestamps: true
});

module.exports = Venda;
