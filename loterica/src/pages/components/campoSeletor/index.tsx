import React from "react";
import './index.css';

type CampoSeletorProps = {
  value: string;
  onChange: (value: string) => void;
};

function CampoSeletor({ value, onChange }: CampoSeletorProps) {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  };

  return (
    <div>
      <select id="seletor" value={value} onChange={handleChange}>
        <option value="">Meio de pagamento</option>
        <option value="Cartão de crédito">Cartão de crédito</option>
        <option value="Cartão de débito">Cartão de débito</option>
        <option value="Pix">Pix</option>
        <option value="Dinheiro">Dinheiro</option>
        <option value="Fiado">Fiado</option>
      </select>
    </div>
  );
}

export default CampoSeletor;
