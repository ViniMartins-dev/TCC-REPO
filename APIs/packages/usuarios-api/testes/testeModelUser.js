require('dotenv').config();                                 // Carrega variáveis do .env
const sequelize = require('../config/database.js');         // Conexão com o banco
const Usuario = require('../models/Usuario.js');            // Model do usuário

async function testarModel() {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco estabelecida com sucesso.');

    await Usuario.sync({ alter: true });                    // Garante que a tabela existe
    console.log('Tabela sincronizada.');

    // CREATE
    const novoUsuario = await Usuario.create({
      tipo: 'tutor',
      nome: 'teste',
      sobrenome: 'teste',
      email: 'teste@example.com',
      telefone: '11999999999',
      senha: 'teste123',
      cpf: '123.456.789-00',
      data_nascimento: '1990-01-01',
      latitude: -23.550520,
      longitude: -46.633308,
    });
    console.log('Usuário criado com sucesso!');

    // Aguarda 2 segundos
    await new Promise(resolve => setTimeout(resolve, 2000));

    // UPDATE
    novoUsuario.nome = 'teste atualizado';
    await novoUsuario.save();
    console.log('Usuário atualizado com sucesso!');

    // DELETE
    await novoUsuario.destroy();
    console.log('Usuário deletado com sucesso.');

    // VERIFICAÇÃO
    const verificado = await Usuario.findByPk(novoUsuario.id);
    console.log('Verificação de exclusão:', verificado); // deve ser null

    // ENCERRA CONEXÃO
    await sequelize.close();
    console.log('Conexão encerrada.');

  } catch (error) {
    console.error('Erro ao testar a model:', error);
  }
}

testarModel();
