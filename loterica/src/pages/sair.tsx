import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Sair() {
  const navigate = useNavigate();

  useEffect(() => {
    // 🔐 Remove o token de autenticação
    localStorage.removeItem('token');

    // 👻 Esconde o menu-site se estiver presente
    const menu = document.getElementById('menu-site');
    if (menu) {
      menu.style.display = 'none';
    }

    // 🔄 Redireciona para a página de login
    navigate('/');
  }, [navigate]);

  return null; // Nada é renderizado visualmente
}

export default Sair;
