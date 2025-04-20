const cadastroTutor = require('../services/cadastroTutor'); // Importa o serviço de cadastro de tutor
const deletaTutor = require('../services/deleteUsuario'); // Importa o serviço de deletar tutor

const cadastrarTutor = async (req, res) => {
    try {
        const dados = req.body;
        const novoTutor = await cadastroTutor.criarTutor(dados);
        return res.status(201).json(novoTutor);
    } catch (error) {
        return res.status(400).json({ erro: error.message });
    }
};

const deletarTutor = async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await deletaTutor.deletarUsuario(id, 'tutor');
        return res.status(200).json({ mensagem: resultado.message });
    } catch (error) {
        return res.status(400).json({ erro: error.message });
    }
};

module.exports = {
    cadastrarTutor,
    deletarTutor
};