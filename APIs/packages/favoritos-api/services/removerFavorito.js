const Favorito = require('../models/Favorito');
const Usuario = require('../models/Usuario');
const Animal = require('../models/Animal');

const removerFavorito = async (id_animal, id_usuario) => {
    // Verifica se o favorito existe
    const favorito = await Favorito.findOne({where: { animal_id: id_animal, usuario_id: id_usuario }});
    if (!favorito) {
        throw new Error('Favorito não encontrado.');
    }

    // Remove o favorito do banco
    await Favorito.destroy(
        {where: { animal_id: id_animal, usuario_id: id_usuario }
    });

    return { message: 'Favorito removido com sucesso.' };
}

module.exports = {
    removerFavorito
};