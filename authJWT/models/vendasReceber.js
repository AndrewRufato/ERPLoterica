const { DataTypes } = require('sequelize');
const sequelize = require('./db'); // ajuste o caminho se necessário

const VendasReceber = sequelize.define('VendasReceber', {
  total: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  venda_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'vendas',
      key: 'id'
    }
  },
  nome_cliente: {
    type: DataTypes.STRING,
    allowNull: true
  },
  cpf_cliente: {
    type: DataTypes.STRING,
    allowNull: true
  },
  data_registro: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW // ✅ Preenche automaticamente no momento do insert
  }
}, {
  tableName: 'vendas_receber',
  timestamps: false
});

module.exports = VendasReceber;
