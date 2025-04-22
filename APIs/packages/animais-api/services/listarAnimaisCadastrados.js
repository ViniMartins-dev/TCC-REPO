const Animal = require('../models/Animal');
const Usuario = require('../models/Usuario');

const listarAnimaisCadastrados = async (idProtetor) => {
    // Verifica se o usuario existe e pertence ao tipo 'protetor'
    const usuario = await Usuario.findByPk(idProtetor);
    if (!usuario) {
        throw new Error('Usuário não encontrado.');
    }
    if (usuario.tipo !== 'protetor') {
        throw new Error('Apenas protetores podem listar animais.');
    }

    // Lista os animais do protetor
    const animais = await Animal.findAll({
        where: { usuario_id: idProtetor },
    });

    return animais;
}

module.exports = {
    listarAnimaisCadastrados
};