require('dotenv').config();                     // Carrega as variáveis de ambiente
const { Sequelize } = require('sequelize');     // Importa o Sequelize

const sequelize = new Sequelize(                // Inicia a conexão com o banco de dados
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST, 
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
    logging: false,                             // Desabilita os logs do Sequelize      
  }
);

module.exports = sequelize;                     // Exporta a conexão com o banco de dados
