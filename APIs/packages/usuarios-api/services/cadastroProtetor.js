const bcrypt = require('bcrypt');                                       // Importa o bcrypt para hash de senhas         
const Usuario = require('../models/Usuario');                           // Importa o modelo de Usuário
const validarCNPJ = require('../utils/validarCNPJ');

const criarProtetor = async (dados) => {                                // Função para criar um novo Protetor
    const {
    nome_fantasia,
    email,
    telefone,
    senha,
    cnpj,
    latitude,
    longitude,
    } = dados;

    // Valida o cnpj
    if (!validarCNPJ(cnpj)) {
        throw new Error('CNPJ inválido.');
    }

    // cnpj limpo (sem caracteres especiais)
    const cnpjLimpo = cnpj.replace(/[^\d]+/g, '');

    // Verifica se o e-mail já existe
    const existe = await Usuario.findOne({ where: { email } });
    if (existe) {
        throw new Error('E-mail já cadastrado.');
    }

    // Gera hash da senha
    const senhaHash = await bcrypt.hash(senha, 10);

    // Cria o Protetor no banco
    const novoProtetor = await Usuario.create({
        tipo: 'protetor',
        nome_fantasia,                                                                                 
        email,
        telefone,
        senha: senhaHash,
        cnpj: cnpjLimpo,                                                                              // CNPJ sem caracteres especiais
        latitude,
        longitude,
    });

    // Oculta a senha antes de retornar
    const ProtetorJson = novoProtetor.toJSON();
    delete ProtetorJson.senha;

    return ProtetorJson;
};

module.exports = {
  criarProtetor,
};