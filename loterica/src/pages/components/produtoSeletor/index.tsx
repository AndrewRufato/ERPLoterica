import React from "react";
import './index.css';

type produtoSeletorProps = {
  value: string;
  onChange: (value: string) => void;
};

function ProdutoSeletor({ value, onChange }: produtoSeletorProps) {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="div-produto-seletor">
      <select id="produto-seletor" value={value} onChange={handleChange}>
        <option value="">Produtos</option>
        <option value="quina">Quina</option>
        <option value="dupla">Dupla</option>
        <option value="facil">Fácil</option>
        <option value="mega">Mega</option>
        <option value="dia">Dia</option>
        <option value="super">Super</option>
      </select>
    </div>
  );
}


export default ProdutoSeletor;
