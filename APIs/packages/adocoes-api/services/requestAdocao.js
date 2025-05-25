const Adocao = require('../../models/Adocao');
const Animal = require('../../models/Animal');
const Usuario = require('../../models/Usuario');

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
    if (animal.status !== 'disponivel') {
        throw new Error('Animal não está disponível para adoção.');
    }

    // Verifica se o usuário já pediu adoção desse animal
    const adocaoExistente = await Adocao.findOne({
        where: {
            tutor_id: dados.tutor_id,
            animal_id: dados.animal_id,
        },
    });

    if (adocaoExistente && adocaoExistente.status !== 'aprovada') { // Verifica se já existe uma adoção pendente ou aprovada
        throw new Error('Você já solicitou a adoção deste animal.');
    }

    // Cria a adoção
    const adocao = await Adocao.create({
        tutor_id: dados.tutor_id,
        animal_id: dados.animal_id,
        status: 'pendente',
    });

    return adocao;
};

module.exports = {
    gerarAdocao,
};
