import React from "react";
import './index.css';

interface ProdutoSeletorValorProps {
  produto: string;
  numerosSelecionados: number;
  onChange: (valor: number, nomeFormatado: string, numeros: number) => void;
}

const opcoesPorProduto: Record<string, { numeros: number; preco: number }[]> = {
  quina: [
    { numeros: 5, preco: 3.00 },
    { numeros: 6, preco: 7.50 },
    { numeros: 7, preco: 17.50 }
  ],
  dupla: [
    { numeros: 6, preco: 2.50 },
    { numeros: 8, preco: 5.00 }
  ],
  facil: [
    { numeros: 15, preco: 2.50 },
    { numeros: 18, preco: 5.00 }
  ],
  mega: [
    { numeros: 6, preco: 5.00 },
    { numeros: 7, preco: 35.00 }
  ],
  dia: [
    { numeros: 6, preco: 2.00 },
    { numeros: 8, preco: 4.00 }
  ],
  super: [
    { numeros: 5, preco: 2.50 },
    { numeros: 10, preco: 5.00 }
  ]
};

function ProdutoSeletorValor({ produto, numerosSelecionados, onChange }: ProdutoSeletorValorProps) {
  const opcoes = opcoesPorProduto[produto] || [];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const numeros = parseInt(e.target.value);
    const opcao = opcoes.find(o => o.numeros === numeros);
    if (opcao) {
      const nomeProdutoFormatado = `${capitalize(produto)} com ${numeros} números`;
      onChange(opcao.preco, nomeProdutoFormatado, numeros);
    }
  };

  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div className="div-produto-seletor-valor">
      <select
        id="produto-seletor-valor"
        value={numerosSelecionados || ""}
        onChange={handleChange}
      >
        <option value="">Selecione a quantidade de números</option>
        {opcoes.map((opcao) => (
          <option key={opcao.numeros} value={opcao.numeros}>
            {opcao.numeros} números – R$ {opcao.preco.toFixed(2)}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ProdutoSeletorValor;
