const Usuario = require('../models/Usuario');
const validarCPF = require('../utils/validarCPF');

const atualizarTutor = async (id, dados) => {
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
        throw new Error('Usuário não encontrado.');
    }

    if (usuario.tipo !== 'tutor') {
        throw new Error('Usuário não é um tutor.');
    }

    // Valida CPF, se estiver presente nos dados
    if (dados.cpf && !validarCPF(dados.cpf)) {
        throw new Error('CPF inválido.');
    }

    const camposPermitidos = ['nome', 'email', 'telefone', 'data_nascimento', 'cpf'];

    camposPermitidos.forEach(campo => {
        if (dados[campo] !== undefined) {
            usuario[campo] = dados[campo];
        }
    });

    await usuario.save();

    const usuarioAtualizado = usuario.toJSON();
    delete usuarioAtualizado.senha;

    return usuarioAtualizado;
};

module.exports = {
    atualizarTutor,
};
