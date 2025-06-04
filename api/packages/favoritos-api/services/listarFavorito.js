const Favorito = require('../../models/Favorito');
const Usuario = require('../../models/Usuario');
const Animal = require('../../models/Animal');

listarFavorito = async (usuarioId) => {
    // Verifica se o usuário existe
    const usuario = await Usuario.findByPk(usuarioId);
    if (!usuario) {
        throw new Error('Usuário não encontrado.');
    }

    // Busca os favoritos do usuário
    const favoritos = await Favorito.findAll({
        where: { usuario_id: usuarioId }
    });

    return favoritos;
}

module.exports = {
    listarFavorito
};