const Animal = require('../../models/Animal');
const Usuario = require('../../models/Usuario');

const deletarAnimal = async (id, idUsuario) => {

    const animal = await Animal.findByPk(id);
    const usuario = await Usuario.findByPk(idUsuario);

    if (!animal) {
        throw new Error('Animal não encontrado.');
    }

    if (!usuario) {
        throw new Error('Usuário não encontrado.');
    }
    
    if (usuario.tipo !== 'protetor') {
        throw new Error('Apenas protetores podem deletar animais.');
    }

    if (animal.usuario_id !== idUsuario) {
        throw new Error('Você não tem permissão para deletar este animal.');
    }

    await animal.destroy();
    return { message: 'Animal deletado com sucesso.' };
};

module.exports = {
    deletarAnimal
};