import { useState } from 'react';
import GenButton from './components/genericButton';
import './relatorio.css';
import { useEffect } from 'react';

// Interfaces
interface VendaPaga {
  id: number;
  venda_id: number;
  total: number | string;
  forma_pagamento: string;
  nome_cliente: string;
  data_registro: string; // ✅ corrigido aqui
}

interface VendaReceber {
  id: number;
  venda_id: number;
  total: number | string;
  nome_cliente: string;
  cpf_cliente: string;
  data_registro: string; // ✅ corrigido aqui
}

// Função para formatar datas
function formatarData(dataStr: string) {
  if (!dataStr) return 'Sem data';
  const data = new Date(dataStr);
  return isNaN(data.getTime()) ? 'Data inválida' : data.toLocaleString('pt-BR');
}

function Relatorios() {
  const [vendasPagas, setVendasPagas] = useState<VendaPaga[]>([]);
  const [vendasReceber, setVendasReceber] = useState<VendaReceber[]>([]);
  const [totalReceber, setTotalReceber] = useState(0);

  const [mostrarVendasPagas, setMostrarVendasPagas] = useState(false);
  const [mostrarVendasReceber, setMostrarVendasReceber] = useState(false);

  // Buscar Vendas Pagas
  const buscarVendasPagas = async () => {
    const token = localStorage.getItem('token');
    if (!token) return alert('Token não encontrado');

    try {
      const res = await fetch('http://localhost:3000/api/relatorios/vendas-pagas', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!res.ok) throw new Error('Erro ao buscar dados');

      const data = await res.json();
      setVendasPagas(data);
      setMostrarVendasPagas(true);
      setMostrarVendasReceber(false);
    } catch (error) {
      console.error('Erro ao buscar vendas pagas:', error);
      alert('Erro ao buscar dados do faturamento');
    }
  };

  // Buscar Vendas a Receber (Fiado)
  const buscarVendasReceber = async () => {
  const token = localStorage.getItem('token');
  if (!token) return alert("Token não encontrado");

  try {
    const res = await fetch('http://localhost:3000/api/relatorios/vendas-receber', {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!res.ok) throw new Error("Erro ao buscar dados");

    const data = await res.json();

    // ✅ Aqui você adiciona o console.log para ver o que está vindo do back-end
    console.log("Dados recebidos do back-end (vendas fiado):", data.vendas);

    setVendasReceber(data.vendas);
    setTotalReceber(data.total);
    setMostrarVendasPagas(false);
    setMostrarVendasReceber(true);
  } catch (error) {
    console.error("Erro ao buscar vendas a receber:", error);
    alert("Erro ao buscar dados de fiado");
  }
};
useEffect(() => {
  if (mostrarVendasReceber) {
    console.log("📦 vendasReceber atual:", vendasReceber);
  }
}, [vendasReceber, mostrarVendasReceber]);

  // Totais
  const somaTotalPagas = vendasPagas.reduce((acc, venda) => acc + Number(venda.total), 0);
  const somaTotalReceber = totalReceber || vendasReceber.reduce((acc, venda) => acc + Number(venda.total), 0);




  return (
    <div className="container mt-4 relatorio">
      <h2>Relatórios</h2>

      <div className="mb-3 d-flex flex-row justify-content-center gap-2">
        <GenButton title="Faturamento Mensal" onClick={buscarVendasPagas} />
        <GenButton title="Vendas a Receber" onClick={buscarVendasReceber} />
      </div>

      {/* Tabela de Vendas Pagas */}
      {mostrarVendasPagas && (
        <>
          <h4>Vendas Pagas</h4>
          <p className="fw-bold">Total Faturado: R$ {somaTotalPagas.toFixed(2)}</p>
          <table className="tabela-relatorio">
            <thead>
              <tr>
                <th>Venda ID</th>
                <th>Total</th>
                <th>Forma de Pagamento</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {vendasPagas.map((venda) => (
                <tr key={venda.id}>
                  <td>{venda.venda_id}</td>
                  <td>R$ {Number(venda.total).toFixed(2)}</td>
                  <td>{venda.forma_pagamento}</td>
                  
                  <td>{formatarData(venda.data_registro)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {/* Tabela de Vendas Fiado */}
      {mostrarVendasReceber && (
        <>
          <h4>Vendas a Receber (Fiado)</h4>
          <p className="fw-bold">Total a Receber: R$ {somaTotalReceber.toFixed(2)}</p>
          <table className="tabela-relatorio">
            <thead>
              <tr>
                <th>Venda ID</th>
                <th>Total</th>
                <th>Nome do Cliente</th>
                <th>CPF</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {vendasReceber.map((venda) => (
                <tr key={venda.id}>
                  <td>{venda.venda_id}</td>
                  <td>R$ {Number(venda.total).toFixed(2)}</td>
                  <td>{venda.nome_cliente}</td>
                  <td>{venda.cpf_cliente}</td>
                  <td>{formatarData(venda.data_registro)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default Relatorios;
