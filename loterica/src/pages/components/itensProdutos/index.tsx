import './index.css';
import type { Produto } from '../../../types/Produto';

interface Props {
  produtos: Produto[];
  removerProduto: (index: number) => void;
}

export default function ItensProtudos({ produtos, removerProduto }: Props) {
  return (
    <div className='ItensProtudos'>
      {produtos.map((item, index) => (
        <div key={index} className='item-linha'>
          <div>
            <h3>{item.nome}</h3>
          </div>
          <div>
            <h3>R$ {item.valor.toFixed(2)}</h3>
          </div>
          <div>
            <h3 onClick={() => removerProduto(index)} style={{ cursor: 'pointer', color: 'white' }}>
              X
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
}