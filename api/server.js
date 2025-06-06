// Importando as dependências necessárias
require('dotenv').config();                                             // Carrega as variáveis de ambiente
const express = require('express');                                     // Importa o Express
const cors = require('cors');                                           // Importa o CORS
const sequelize = require('./config/database');                         // Importa a conexão com o banco de dados

// Configurando o servidor Express
const app = express();                                                  // Inicia o Express
app.use(cors());                                                        // Habilita o CORS
app.use(express.json());                                                // Habilita o uso de JSON

// Definindo as rotas
const usuarioRoutes = require('./packages/usuarios-api/routes/usuarioRoute');       // Importa as rotas de usuários
const animalRoutes = require('./packages/animais-api/routes/animalRoute');          // Importa as rotas de animais
const adocaoRoutes = require('./packages/adocoes-api/routes/adocoesRoute');         // Importa as rotas de adoções
const favoritoRoutes = require('./packages/favoritos-api/routes/favoritoRoute');    // Importa as rotas de favoritos

// Configurando as rotas para o servidor
app.use('/usuario', usuarioRoutes);                 // Define a rota para usuarios
app.use('/animal', animalRoutes);                   // Define a rota para animais
app.use('/adocao', adocaoRoutes);                   // Define a rota para adoções
app.use('/favoritos', favoritoRoutes);              // Define a rota para favoritos

// Testando a conexão com o banco de dados
sequelize.authenticate()
    .then(() => {
        console.log('Conexão com o banco de dados bem-sucedida!');
    })
    .catch(err => {
        console.error('Erro ao conectar ao banco de dados:', err);
    });

// Iniciando o servidor
const PORT = process.env.server_port ?? 3000;                                   // Define a porta do servidor a partir das variáveis de ambiente       
app.listen(PORT, () => {                                                // Inicia o servidor na porta definida
    console.log(`Servidor rodando na porta ${PORT}`);
});
