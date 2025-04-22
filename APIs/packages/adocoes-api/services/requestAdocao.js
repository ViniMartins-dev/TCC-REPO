const Adocao = require('../models/Adocao');
const Animal = require('../models/Animal');
const Usuario = require('../models/Usuario');

const gerarAdocao = async (dados) => {
    // Verifica se o usuário existe e é do tipo 'tutor'
    const usuario = await Usuario.findByPk(dados.tutor_id);
    if (!usuario) {
        throw new Error('Usuário não encontrado.');
    }
    if (usuario.tipo !== 'tutor') {
        throw new Error('Apenas tutores podem solicitar adoções.');
    }

    // Verifica se o animal existe e está disponível
    const animal = await Animal.findByPk(dados.animal_id);
    if (!animal) {
        throw new Error('Animal não encontrado.');
    }
    if (animal.status !== 'Disponível') {
        throw new Error('Animal não está disponível para adoção.');
    }

    // Cria a adoção
    const adocao = await Adocao.create({
        tutor_id: dados.tutor_id,
        animal_id: dados.animal_id,
        status: 'Pendente',
    });

    return adocao;
};

module.exports = {
    gerarAdocao,
};
