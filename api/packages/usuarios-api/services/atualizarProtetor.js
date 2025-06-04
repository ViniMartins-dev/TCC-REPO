const Usuario = require('../../models/Usuario');
const validarCNPJ = require('../utils/validarCNPJ');

const atualizarProtetor = async (id, dados) => {
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
        throw new Error('Usuário não encontrado.');
    }

    if (usuario.tipo !== 'protetor') {
        throw new Error('Usuário não é um protetor.');
    }

    if (dados.cnpj && !validarCNPJ(dados.cnpj)) {
        throw new Error('CNPJ inválido.');
    }

    const camposPermitidos = ['nome_fantasia', 'email', 'telefone', 'cnpj', 'latitude', 'longitude'];

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
    atualizarProtetor,
};