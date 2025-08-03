import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './components/button/';
import InputForm from './components/input-form';
import { VscAccount } from "react-icons/vsc";
import axios from 'axios';
import './login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  // ✅ Redireciona se já estiver logado
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/caixa');
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:3000/auth/login', {
        nome: username,
        senha: password
      });

      localStorage.setItem('token', res.data.token);
      setMensagem('🟢 Login realizado com sucesso!');

      setTimeout(() => {
       window.location.href = '/caixa'
      }, 1000);
    } catch (err: any) {
      setMensagem(err.response?.data?.msg || '🔴 Erro ao fazer login.');
    }
  };

  return (
    <div className="FormLogin">
      <form id="FormLogin" onSubmit={handleSubmit}>
        <VscAccount size={140} color="white" className="Icon" />

        <InputForm 
          placeholder="Insira seu nome de usuário"
          id="formUser"
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <InputForm 
          placeholder="Insira sua senha"
          id="formPassword"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button title="Entrar" />
        <p style={{ color: 'white', marginTop: '1rem' }}>{mensagem}</p>
      </form>
    </div>
  );
}

export default Login;
