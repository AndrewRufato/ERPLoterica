import './index.css';


interface TotalProdutosProps {
  total: number;
}

export default function TotalProtudos({ total }: TotalProdutosProps) {
  //const total = produtos.reduce((soma, item) => soma + item.valor, 0);

  return (
    <div id='TotalProtudos'>
      <div>
        <h3>Total</h3>
      </div>
      <div>
        <h3>R$ {total.toFixed(2)}</h3>
      </div>
    </div>
  );
}
