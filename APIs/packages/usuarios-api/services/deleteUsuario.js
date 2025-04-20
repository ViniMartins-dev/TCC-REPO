// services/deleteUsuario.js
const Usuario = require('../models/Usuario');

const deletarUsuario = async (id, tipoEsperado) => {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
        throw new Error('Usuário não encontrado.');
    }

    if (tipoEsperado && usuario.tipo !== tipoEsperado) {
        throw new Error('Tipo de usuário inválido para esta operação.');
    }

    await usuario.destroy();
    return { message: 'Usuário deletado com sucesso.' };
};

module.exports = {
    deletarUsuario
};