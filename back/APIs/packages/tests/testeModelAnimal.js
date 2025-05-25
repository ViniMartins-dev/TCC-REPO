require('dotenv').config(); // Carrega variáveis do .env
const sequelize = require('../../config/database.js'); // Conexão com o banco
const Usuario = require('../models/Usuario.js'); // Model do usuário
const Animal = require('../models/Animal.js'); // Model do animal

async function testarModelAnimal() {
    try {
        await sequelize.authenticate();
        console.log('Conexão com o banco estabelecida com sucesso.');

        // Sincroniza as tabelas
        await Usuario.sync({ alter: true });
        await Animal.sync({ alter: true });
        console.log('Tabelas sincronizadas.');

        // Cria usuário para associar o animal
        const novoUsuario = await Usuario.create({
            tipo: 'protetor',
            nome: 'Protetor Teste',
            sobrenome: 'da Silva',
            email: 'protetor@example.com',
            telefone: '11999999999',
            senha: 'senha123',
            cnpj: '123.456.789-00',
            data_nascimento: '1990-01-01',
            latitude: -23.55052,
            longitude: -46.633308
        });
        console.log('Usuário criado.');

        // CREATE
        const novoAnimal = await Animal.create({
            nome: 'Rex',
            especie: 'Cachorro',
            porte: 'Médio',
            raca: 'Vira-lata',
            idade: 5,
            sexo: 'M',
            descricao: 'Muito amigável e brincalhão.',
            personalidade: 'Brincalhão e dócil',
            foto_url: '',
            usuario_id: novoUsuario.id
        });
        console.log('Animal criado com sucesso!');

        // Aguarda 2 segundos
        await new Promise(resolve => setTimeout(resolve, 2000));

        // UPDATE
        novoAnimal.nome = 'Rex Atualizado';
        await novoAnimal.save();
        console.log('Animal atualizado com sucesso!');

        // DELETE
        await novoAnimal.destroy();
        console.log('Animal deletado com sucesso.');

        await novoUsuario.destroy();
        console.log('Usuario deletado com sucesso.');

        // VERIFICAÇÃO
        const verificadoAnimal = await Animal.findByPk(novoAnimal.id);
        console.log('Verificação de exclusão do animal:', verificadoAnimal); // deve ser null

        const verificadoUser = await Usuario.findByPk(novoUsuario.id);
        console.log('Verificação de exclusão do protetor:', verificadoUser); // deve ser null

        // Fecha conexão
        await sequelize.close();
        console.log('Conexão encerrada.');
    } catch (error) {
        console.error('Erro ao testar a model Animal:', error);
    }
}

testarModelAnimal();
