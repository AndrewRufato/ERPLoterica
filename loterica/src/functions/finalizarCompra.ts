import axios from 'axios';
import type { Produto } from '../types/Produto'; // ajuste o caminho se necessário

type Cliente = {
  nome: string;
  cpf: string;
} | null;
export async function finalizarCompra(
  total: number,
  produtos: Produto[],
  forma_pagamento: string,
  cliente: Cliente,
  empresaId: number = 0,
  onLimparCliente?: () => void // <- função opcional 
): Promise<void> {
  if (forma_pagamento === 'Fiado' && !cliente) {
    alert("Cliente obrigatório para pagamento fiado.");
    return;
  }

  try {
    const token = localStorage.getItem('token');

    const dadosVenda = {
      produtos: produtos.map(p => ({
        nome: p.nome,
        preco: p.valor
      })),
      total,
      forma_pagamento,
      nome_cliente: cliente?.nome || null,
      cpf_cliente: cliente?.cpf || null,
      empresaId
    };

    await axios.post('http://localhost:3000/api/vendas', dadosVenda, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    alert("Venda registrada com sucesso.");
    console.log("Venda finalizada com sucesso!");

    // ✅ Limpa o cliente se função for passada
    if (onLimparCliente) onLimparCliente();

  } catch (err) {
    console.error("Erro ao registrar venda:", err);
    throw err;
  }
}
