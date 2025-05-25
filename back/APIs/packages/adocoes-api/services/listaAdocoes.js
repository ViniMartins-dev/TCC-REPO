const Adocao = require('../../models/Adocao');
const Usuario = require('../../models/Usuario');
const Animal = require('../../models/Animal');

const listarAdocoes = async (protetorId) => {
    try {
        const adocoes = await Adocao.findAll({
            include: [
                {
                    association: 'tutor',
                    attributes: ['id', 'nome', 'email', 'telefone'],
                },
                {
                    association: 'animal',
                    attributes: ['id', 'nome', 'especie', 'raca', 'idade', 'usuario_id', 'bin_foto'],
                    where: {
                        usuario_id: protetorId  // Filtra os animais cadastrados por esse protetor
                    }
                }
            ]
        });

        const adocoesComImagemBase64 = adocoes.map(adocao => {
            if (adocao.animal?.bin_foto) {
                adocao.animal.bin_foto = adocao.animal.bin_foto.toString('base64');
            }
            return adocao;
        });

        return adocoesComImagemBase64;


    } catch (error) {
        console.error('Erro ao listar adoções:', error);
        throw error;
    }
};

module.exports = {
    listarAdocoes,
};
