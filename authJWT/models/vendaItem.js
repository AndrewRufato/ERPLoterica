const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const ItensVenda = sequelize.define('ItensVenda', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  preco: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  vendaId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'itens_venda'
});

module.exports = ItensVenda;
