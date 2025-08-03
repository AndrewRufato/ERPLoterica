require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Conexão com banco e modelos
const sequelize = require('./models/db');
const User = require('./models/user');

// Importação das rotas
const vendasRoutes = require('./routes/vendas');
const relatoriosRoutes = require('./routes/relatorios');

const app = express();
const PORT = 3000;

// ───────────── Middlewares Globais ─────────────
app.use(cors());
app.use(express.json());

// ───────────── Utilitário ─────────────
function campoVazio(valor) {
  return typeof valor !== 'string' || valor.trim() === '';
}

// ───────────── Autenticação por Token ─────────────
function checkToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res.status(401).json({ msg: "Acesso negado! Token ausente." });

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ msg: "Token inválido" });
  }
}

// ───────────── Rotas Públicas ─────────────
app.get('/', (req, res) => {
  res.status(200).json({ msg: "Bem-vindo à nossa API!" });
});

// Rota para obter dados do usuário logado
app.get('/api/usuario', checkToken, (req, res) => {
  const { nome, empresa_id } = req.user;
  res.status(200).json({ nome, empresa_id });
});

// ───────────── Registro de Usuário ─────────────
app.post('/auth/register', async (req, res) => {
  const { nome = "", senha = "", confirmarsenha = "", empresa_id } = req.body;

  if (
    campoVazio(nome) || campoVazio(senha) ||
    campoVazio(confirmarsenha) || (empresa_id === undefined || empresa_id === null)
  ) {
    return res.status(422).json({ msg: "Todos os campos são obrigatórios!" });
  }

  if (senha !== confirmarsenha)
    return res.status(422).json({ msg: "As senhas não coincidem!" });

  try {
    const userExists = await User.findOne({ where: { nome } });

    if (userExists)
      return res.status(422).json({ msg: "Nome de usuário já cadastrado!" });

    const senhaHash = await bcrypt.hash(senha, 12);
    await User.create({ nome, senha: senhaHash, empresa_id });

    return res.status(201).json({ msg: "Usuário criado com sucesso!" });
  } catch (error) {
    console.error("Erro no registro:", error);
    return res.status(500).json({ msg: "Erro interno no servidor!" });
  }
});

// ───────────── Login de Usuário ─────────────
app.post("/auth/login", async (req, res) => {
  const { nome = "", senha = "" } = req.body;

  if (campoVazio(nome) || campoVazio(senha))
    return res.status(422).json({ msg: "Nome e senha são obrigatórios!" });

  try {
    const user = await User.findOne({ where: { nome } });
    const senhaValida = user && await bcrypt.compare(senha, user.senha);

    if (!user || !senhaValida)
      return res.status(422).json({ msg: "Usuário ou senha inválidos!" });

    const token = jwt.sign(
      { id: user.id, nome: user.nome, empresa_id: user.empresa_id },
      process.env.SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ msg: "Autenticação realizada com sucesso", token });
  } catch (err) {
    console.error("Erro no login:", err);
    res.status(500).json({ msg: "Erro interno no servidor!" });
  }
});

// ───────────── Rotas externas ─────────────
app.use('/api', vendasRoutes);
app.use('/api/relatorios', relatoriosRoutes);

// ───────────── Inicialização do Servidor ─────────────
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
  });
}).catch((err) => {
  console.error('Erro ao conectar ao banco:', err);
  process.exit(1);
});
