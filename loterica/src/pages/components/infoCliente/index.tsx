import './index.css'
import type { Cliente } from '../../../types/Cliente';

interface Props {
  cliente: Cliente | null;
}

export default function InfoCliente({cliente}:Props){
    if (!cliente) return (
        <div className='container infoCliente'>
            <div className='row'>
                <div className='col-sm-12 col-md-4'><h3> </h3></div>
            </div>
        </div>
        )

    
        return(
        <div className='container infoCliente'>
            <div className='row'>
                <div className='col-sm-12 col-md-4'><h3> <strong>Nome do Cliente: </strong> {cliente.nome} </h3></div>
                <div className='col-sm-12 col-md-8'><h3><strong>CPF </strong>{cliente.cpf} </h3></div>
            </div>
        </div>
        )
}