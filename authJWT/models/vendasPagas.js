const { DataTypes, Model } = require('sequelize');
const sequelize = require('./db'); // caminho correto para seu db.js

class VendasPagas extends Model {}

VendasPagas.init({
  venda_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'vendas',
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  total: {
    type: DataTypes.DOUBLE,
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
  sequelize,
  modelName: 'VendasPagas',
  tableName: 'vendas_pagas',
  timestamps: true
});

module.exports = VendasPagas;
