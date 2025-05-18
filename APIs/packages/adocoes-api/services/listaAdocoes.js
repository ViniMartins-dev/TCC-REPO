const Adocao = require('../../models/Adocao');
const Usuario = require('../../models/Usuario');
const Animal = require('../../models/Animal');

const listarAdocoes = async (protetorId) => {
    try {
        const adocoes = await Adocao.findAll({
            include: [
                {
                    association: 'tutor',
                    attributes: ['id', 'nome', 'email']
                },
                {
                    association: 'animal',
                    attributes: ['id', 'nome', 'especie', 'raca', 'idade', 'usuario_id'],
                    where: {
                        usuario_id: protetorId  // Filtra os animais cadastrados por esse protetor
                    },
                    include: {
                        association: 'protetor',
                        attributes: ['id', 'nome', 'email']
                    }
                }
            ]
        });

        return adocoes;
    } catch (error) {
        console.error('Erro ao listar adoções:', error);
        throw error;
    }
};

module.exports = {
    listarAdocoes,
};
