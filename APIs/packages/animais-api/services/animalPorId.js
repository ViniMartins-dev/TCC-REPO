const Animal = require('../../models/Animal');

const animalPorId = async (id) => {
    const animal = await Animal.findByPk(id);
    if (!animal) { // Verifica se o animal existe
        throw new Error('Animal não encontrado.');
    }

    return animal;
}

module.exports = {
    animalPorId
}; 