const express = require('express');
const router = express.Router();
const { checkToken } = require('../middleware/auth');
const { VendasPagas, VendasReceber } = require('../models');

// GET /api/relatorios/vendas-pagas
router.get('/vendas-pagas', checkToken, async (req, res) => {
  try {
    const vendas = await VendasPagas.findAll();

    const vendasFormatadas = vendas.map(venda => ({
      ...venda.toJSON(),
      data_registro: venda.data_registro
        ? new Date(venda.data_registro).toISOString()
        : null
    }));

    res.status(200).json(vendasFormatadas);
  } catch (error) {
    console.error("Erro ao buscar vendas pagas:", error);
    res.status(500).json({ msg: "Erro interno ao buscar vendas pagas" });
  }
});

// GET /api/relatorios/vendas-receber
router.get('/vendas-receber', checkToken, async (req, res) => {
  try {
    const vendas = await VendasReceber.findAll();

    const vendasFormatadas = vendas.map(venda => ({
      ...venda.toJSON(),
      data_registro: venda.data_registro
        ? new Date(venda.data_registro).toISOString()
        : null
    }));

    const total = vendas.reduce((acc, venda) => acc + Number(venda.total), 0);

    res.status(200).json({ vendas: vendasFormatadas, total });
  } catch (error) {
    console.error("Erro ao buscar vendas a receber:", error);
    res.status(500).json({ msg: "Erro ao buscar vendas a receber" });
  }
});

module.exports = router;
