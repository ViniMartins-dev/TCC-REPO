const Animal = require('../models/Animal');
const Usuario = require('../models/Usuario');

const atualizarAnimal = async (id, dados) => {
    const animal = await Animal.findByPk(id);

    if (!animal) {
        throw new Error('Animal não encontrado.');
    }

    if(dados.idUsuario !== animal.usuario_id) {
       throw new Error('Você não tem permissão para atualizar este animal.');
    } 

    animalAtualizado = await animal.update(dados);

    return animalAtualizado;
}

module.exports = {
    atualizarAnimal,
};