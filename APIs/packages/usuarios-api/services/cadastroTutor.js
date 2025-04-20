const bcrypt = require('bcrypt');                                       // Importa o bcrypt para hash de senhas         
const Usuario = require('../models/Usuario');                           // Importa o modelo de Usuário
const validarCPF = require('../utils/validarCPF');                      // Importa a função de validação de CPF
const verificarIdade = require('../utils/validarIdade');                // Importa a função de validação de idade

const criarTutor = async (dados) => {                                   // Função para criar um novo tutor
    const {
    nome,
    sobrenome,
    email,
    telefone,
    senha,
    cpf,
    data_nascimento,
    latitude,
    longitude,
    } = dados;

    // Valida o cpf
    if(!validarCPF(cpf)) {
        throw new Error('CPF inválido.');
    }

    // Verifica se o e-mail já existe
    const existe = await Usuario.findOne({ where: { email } });
    if (existe) {
        throw new Error('E-mail já cadastrado.');
    }

    // Valida a idade
    if(!verificarIdade(data_nascimento)) {

        throw new Error('Idade inválida.');
    }


    // Gera hash da senha
    const senhaHash = await bcrypt.hash(senha, 10);

    // Cria o tutor no banco
    const novoTutor = await Usuario.create({
        tipo: 'tutor',
        nome,
        sobrenome,
        email,
        telefone,
        senha: senhaHash,
        cpf,
        data_nascimento,
        latitude,
        longitude,
    });

    // Oculta a senha antes de retornar
    const tutorJson = novoTutor.toJSON();
    delete tutorJson.senha;

    return tutorJson;
};

module.exports = {
  criarTutor,
};