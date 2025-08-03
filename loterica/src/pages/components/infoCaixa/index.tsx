import "./index.css"

interface InfoCaixaProps {
  nomeUsuario: string;
 empresa: number;
}

export default function InfoCaixa({ nomeUsuario, empresa }: InfoCaixaProps) {
  return (
    <div className="infoCaixa">
      <h3><strong>Usuário:</strong> {nomeUsuario}</h3>
      <h3><strong>Número da Loja:</strong> {empresa}</h3>
    </div>
  );
}
