const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../../models/Usuario');

const SECRET = process.env.JWT_SECRET;

const loginUsuario = async (email, senha) => {

    // Busca o usuário pelo email
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
        throw new Error('Usuário não encontrado.');
    }

    // Verifica se a senha está correta
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
        throw new Error('Senha incorreta.');
    }

    // Gera o token
    const payload = {
        id: usuario.id,
        nome: usuario.nome,
        sobrenome: usuario.sobrenome,
        nome_fantasia: usuario.nome_fantasia,
        email: usuario.email,
        tipo: usuario.tipo,
        telefone: usuario.telefone,
        cnpj: usuario.cnpj,
        cpf: usuario.cpf,
    };

    const token = jwt.sign(payload, SECRET, { expiresIn: '1d' });

    // Remove a senha do objeto retornado
    const usuarioJson = usuario.toJSON();
    delete usuarioJson.senha;

    return {
        token,
        payload
    };
}

module.exports = {
    loginUsuario,
};