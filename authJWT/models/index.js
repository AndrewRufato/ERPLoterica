const Venda = require('./venda');
const VendaItem = require('./vendaItem');
const VendasReceber = require('./vendasReceber');
const VendasPagas = require('./vendasPagas');

// Associações
Venda.hasMany(VendaItem, { foreignKey: 'vendaId', as: 'itens' });
VendaItem.belongsTo(Venda, { foreignKey: 'vendaId' });

// Associações para fiado e pagamento
Venda.hasOne(VendasReceber, { foreignKey: 'venda_id', as: 'receber' });
VendasReceber.belongsTo(Venda, { foreignKey: 'venda_id' });

Venda.hasOne(VendasPagas, { foreignKey: 'venda_id', as: 'paga' });
VendasPagas.belongsTo(Venda, { foreignKey: 'venda_id' });

module.exports = {
  Venda,
  VendaItem,
  VendasReceber,
  VendasPagas
};
