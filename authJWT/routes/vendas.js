const express = require('express');
const router = express.Router();
const { checkToken } = require('../middleware/auth');
const { Venda, VendaItem, VendasReceber, VendasPagas } = require('../models');

router.post('/vendas', checkToken, async (req, res) => {
  const { total, produtos, forma_pagamento, nome_cliente, cpf_cliente } = req.body;

  // ✅ Pegamos o empresa_id diretamente do token (via middleware)
  const empresaId = req.user?.empresa_id;

  // Validação básica
  if (!total || !Array.isArray(produtos) || produtos.length === 0 || !forma_pagamento) {
    return res.status(400).json({ msg: 'Dados inválidos: total, produtos ou forma de pagamento ausente.' });
  }

  // Validação específica para fiado
  if (forma_pagamento.toLowerCase() === 'fiado' && (!nome_cliente || !cpf_cliente)) {
    return res.status(400).json({ msg: 'Cliente (nome e CPF) é obrigatório para pagamento fiado.' });
  }

  try {
    // ✅ Cria a venda principal com o empresaId do token
    const vendaCriada = await Venda.create({
      total,
      empresaId,
      forma_pagamento,
      nome_cliente,
      cpf_cliente
    });

    // Cria os itens da venda
    await Promise.all(produtos.map(prod =>
      VendaItem.create({
        nome: prod.nome,
        preco: prod.preco,
        vendaId: vendaCriada.id,
      })
    ));

    // Registra conforme a forma de pagamento
    if (forma_pagamento.toLowerCase() === 'fiado') {
      await VendasReceber.create({
        venda_id: vendaCriada.id,
        total,
        nome_cliente,
        cpf_cliente
      });
    } else {
      await VendasPagas.create({
        venda_id: vendaCriada.id,
        total,
        forma_pagamento,
        nome_cliente,
        cpf_cliente
      });
    }

    res.status(201).json({ msg: 'Venda registrada com sucesso', vendaId: vendaCriada.id });
  } catch (error) {
    console.error('Erro ao registrar venda:', error);
    res.status(500).json({ msg: 'Erro ao registrar venda' });
  }
});

module.exports = router;
