import './index.css';
import TotalProtudos from '../totalProtudos';
import ItensProtudos from '../itensProdutos';
import type { Produto } from '../../../types/Produto';


interface GridProps {
  produtos: Produto[];
  removerProduto: (index: number) => void;
  total: number;
}

export default function Grid({ produtos, removerProduto, total }: GridProps) {
  return (
    <div id="grid">
      <ItensProtudos produtos={produtos} removerProduto={removerProduto} />
      <TotalProtudos total = {total}/>
    </div>
  );
}
