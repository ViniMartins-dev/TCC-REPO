const Favorito = require('../../models/Favorito');
const Usuario = require('../../models/Usuario');
const Animal = require('../../models/Animal');

const adicionarFavorito = async (dados) => {
    const { usuario_id, animal_id } = dados;

    // Verifica se o usuário existe
    const usuario = await Usuario.findByPk(usuario_id);
    if (!usuario) {
        throw new Error('Usuário não encontrado.');
    }

    // Verifica se o animal existe
    const animal = await Animal.findByPk(animal_id);
    if (!animal) {
        throw new Error('Animal não encontrado.');
    }

    // Cria o favorito no banco
    const novoFavorito = await Favorito.create({
        usuario_id,
        animal_id,
    });

    return novoFavorito;
}

module.exports = {
    adicionarFavorito
};