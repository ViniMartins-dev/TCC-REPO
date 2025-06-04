const Animal = require('../../models/Animal');

const atualizarAnimal = async (id, dados, fotoBuffer) => {
    const animal = await Animal.findByPk(id);

    if (!animal) {
        throw new Error('Animal não encontrado.');
    }

    if (dados.idProtetor !== animal.usuario_id) {
        throw new Error('Você não tem permissão para atualizar este animal.');
    }

    // Se veio imagem, adiciona ela no dados que serão atualizados
    if (fotoBuffer) {
        dados.bin_foto = fotoBuffer;
    }

    const animalAtualizado = await animal.update(dados);

    return animalAtualizado;
}

module.exports = {
    atualizarAnimal,
};
