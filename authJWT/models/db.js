const { Sequelize } = require('sequelize');

// Cria a instância de conexão com base nas variáveis do .env
const sequelize = new Sequelize(
  process.env.DB_NAME,     // nome do banco
  process.env.DB_USER,     // usuário
  process.env.DB_PASS,     // senha
  {
    host: process.env.DB_HOST, // endereço do banco (localhost, IP etc.)
    dialect: 'postgres',          // tipo de banco
    logging: false             // desativa logs SQL no console
  }
);

// (Opcional) Testa a conexão
sequelize.authenticate()
  .then(() => console.log('🟢 Conectado ao banco com sucesso!'))
  .catch(err => console.error('🔴 Erro ao conectar ao banco:', err));

module.exports = sequelize;
