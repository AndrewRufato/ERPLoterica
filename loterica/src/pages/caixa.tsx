import './caixa.css';
import Grid from './components/grid/';
import GenButton from './components/genericButton';
import ModalButton from './components/modalButton';
import CampoSeletor from './components/campoSeletor';
import { ModalAddProdutos, ModalVincClientes, ModalAddProdutosSelec } from './components/boxModals';
import { useState } from 'react';
import type { Produto } from '../types/Produto';
import type { Cliente } from '../types/Cliente';
import { finalizarCompra } from '../functions/finalizarCompra';
import InfoCliente from './components/infoCliente';
import InfoCaixa from './components/infoCaixa';

function Caixa() {
  const lojas: Record<number, string> = {
    0: 'Loja Teste',
    1: 'Empresa 1',
    2: 'Empresa 2'
  };

  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [formaPagamento, setFormaPagamento] = useState("");
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [modalVincClientes, setModalVincClientes] = useState(false);

  // ✅ Token e payload extraídos com segurança
  const token = localStorage.getItem('token');
  const payload = token ? JSON.parse(atob(token.split('.')[1])) : null;

  const nomeUsuario = payload?.nome;
  const empresaId = payload?.empresa_id;

  const adicionarProduto = (produto: Produto) => {
    setProdutos((prev) => [...prev, produto]);
  };

  const handleFormaPagamentoChange = (forma: string) => {
    setFormaPagamento(forma);
    if (forma === 'Fiado') {
      setModalVincClientes(true);
    } else {
      setCliente(null);
    }
  };

  const removerProduto = (index: number) => {
    setProdutos((prev) => prev.filter((_, i) => i !== index));
  };

  const total = produtos.reduce((acc, prod) => acc + prod.valor, 0);

  const handleFinalizarCompra = async () => {
    try {
      if (!formaPagamento) {
        alert("Selecione o meio de pagamento antes de finalizar.");
        return;
      }

      await finalizarCompra(total, produtos, formaPagamento, cliente);
      alert("Venda finalizada!");

      // Limpeza após finalização
      setProdutos([]);
      setFormaPagamento("");
      setCliente(null);

    } catch (error) {
      alert("Erro ao finalizar a venda");
      console.error(error);
    }
  };

  return (
    <div className="body-caixa container">
      <div className="row">
        <div className="col-12 col-md-8">

          {/* ✅ InfoCaixa com nome e empresa formatados */}
          {nomeUsuario && empresaId !== null && (
            <InfoCaixa
              nomeUsuario={nomeUsuario}
              empresa={empresaId?.toString() ?? 'Sem ID'} 
            />
          )}

          <InfoCliente cliente={cliente} />
          <Grid produtos={produtos} removerProduto={removerProduto} total={total} />
        </div>
        <div className="col-12 col-md-4 coluna-btn">
          <ModalButton title="Adicionar Produto " modal={({ fechar }) => (
              <ModalAddProdutosSelec
                fechar={fechar}
                adicionar={adicionarProduto}
              />
           
            )} />
          <ModalButton title="Vincular Cliente" modal={({ fechar }) => (
            <ModalVincClientes
              fechar={fechar}
              vincularCliente={(clienteSelecionado) => setCliente(clienteSelecionado)}
            />
          )} />
          <ModalButton
            title="Adição Manual"
            modal={({ fechar }) => (
              <ModalAddProdutos
                fechar={fechar}
                adicionar={adicionarProduto}
              />
            )}
          />
          <CampoSeletor value={formaPagamento} onChange={handleFormaPagamentoChange} />
          <GenButton title="FINALIZAR COMPRA" onClick={handleFinalizarCompra} />
        </div>
      </div>
    </div>
  );
}

export default Caixa;
