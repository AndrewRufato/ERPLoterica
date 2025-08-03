import { useState } from "react";
import './index.css';
import type { Produto } from '../../../types/Produto';
import type { Cliente } from '../../../types/Cliente';
import ProdutoSeletor from "../produtoSeletor";
import ProdutoSeletorValor from "../produtoSeletorValor";

interface PropsModalAddProdutos {
  fechar: () => void;
  adicionar: (produto: Produto) => void;
}

interface PropsModalVincClientes {
  fechar: () => void;
  vincularCliente: (cliente: Cliente) => void;
}



// 🔹 Modal com campo de texto livre para nome do produto
export function ModalAddProdutos({ fechar, adicionar }: PropsModalAddProdutos) {
  const [nome, setNome] = useState('');
  const [valor, setValor] = useState<number>(0);

  const salvar = () => {
    if (nome && valor > 0) {
      adicionar({ nome, valor });
      fechar();
      setNome('');
      setValor(0);
    }
  };

  return (
    <div id='ModalAddProdutos' className='ModalCaixa'>
      <h3>Adição manual do Produto</h3>

      <input
        placeholder="Nome do Produto"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />

      <input
        type="number"
        placeholder="Valor do produto"
        value={valor}
        onChange={(e) => setValor(parseFloat(e.target.value))}
      />

      <br /><br />
      <div>
        <button className='Salvar' onClick={salvar}>Salvar</button>
        <button className='Fechar' onClick={fechar}>Fechar</button>
      </div>
    </div>
  );
}

// 🔹 Modal com seletor de produto
export function ModalAddProdutosSelec({ fechar, adicionar }: PropsModalAddProdutos) {
  const [produtoSelecionado, setProdutoSelecionado] = useState('');
  const [valor, setValor] = useState<number>(0);
  const [nomeFormatado, setNomeFormatado] = useState('');
  const [numerosSelecionados, setNumerosSelecionados] = useState<number>(0);

  const salvar = () => {
    if (nomeFormatado && valor > 0) {
      adicionar({ nome: nomeFormatado, valor });
      fechar();
      setProdutoSelecionado('');
      setValor(0);
      setNomeFormatado('');
      setNumerosSelecionados(0);
    }
  };

  return (
    <div id='ModalAddProdutosSelec' className='ModalCaixa'>
      <h3>Adição via Seletor</h3>

      <ProdutoSeletor
        value={produtoSelecionado}
        onChange={(produto) => {
          setProdutoSelecionado(produto);
          setNomeFormatado(''); // limpa nome ao trocar de produto
          setNumerosSelecionados(0); // limpa seleção anterior
          setValor(0); // limpa valor anterior
        }}
      />

      {produtoSelecionado && (
        <ProdutoSeletorValor
          produto={produtoSelecionado} // ✅ Corrigido aqui
          numerosSelecionados={numerosSelecionados}
          onChange={(valorSelecionado, nomeFormatado, numeros) => {
            setValor(valorSelecionado);
            setNomeFormatado(nomeFormatado);
            setNumerosSelecionados(numeros);
          }}
        />
      )}

      <br /><br />
      <div>
        <button className='Salvar' onClick={salvar}>Salvar</button>
        <button className='Fechar' onClick={fechar}>Fechar</button>
      </div>
    </div>
  );
}


// 🔹 Modal de vincular cliente
export function ModalVincClientes({ fechar, vincularCliente }: PropsModalVincClientes) {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');

  const salvar = () => {
    if (!nome || !cpf) {
      alert("Preencha todos os campos");
      return;
    }

    vincularCliente({ nome, cpf });
    fechar();
  };

  return (
    <div id='ModalVincClientes' className='ModalCaixa'>
      <h3>Vincular Cliente à compra</h3>

      <input
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />

      <input
        placeholder="CPF"
        value={cpf}
        onChange={(e) => setCpf(e.target.value)}
      />

      <br /><br />
      <div>
        <button className='Salvar' onClick={salvar}>Salvar</button>
        <button className='Fechar' onClick={fechar}>Fechar</button>
      </div>
    </div>
  );
}