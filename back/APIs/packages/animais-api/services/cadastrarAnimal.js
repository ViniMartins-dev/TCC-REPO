const Animal = require('../../models/Animal');
const Usuario = require('../../models/Usuario');

const criarAnimal = async (dados, fotoBuffer) => {

    const {
        nome,
        especie,
        porte,
        raca,
        idade,
        sexo,
        descricao,
        personalidade,
        status,
        usuario_id,
    } = dados;

    // Verifica se o usuario existe e pertence ao tipo 'protetor'
    const usuario = await Usuario.findByPk(usuario_id);
    if (!usuario) {
        throw new Error('Usuário não encontrado.');
    }
    if (usuario.tipo !== 'protetor') {
        throw new Error('Apenas protetores podem cadastrar animais.');
    }

    // Cria o animal no banco
    const novoAnimal = await Animal.create({
        nome,
        especie,
        porte,
        raca,
        idade,
        sexo,
        descricao,
        personalidade,
        bin_foto: fotoBuffer,
        status,
        usuario_id
    });

    return novoAnimal;
}

module.exports = {
    criarAnimal
};