const cadastroProtetor = require('../services/cadastroProtetor'); // Importa o serviço de cadastro de protetor
const deletaProtetor = require('../services/deleteUsuario'); // Importa o serviço de deletar protetor
const { atualizarProtetor } = require('../services/updateProtetor'); // Importa o serviço de atualizar protetor

const cadastrarProtetor = async (req, res) => {
    try {
        const dados = req.body;
        const novoProtetor = await cadastroProtetor.criarProtetor(dados);
        return res.status(201).json(novoProtetor);
    } catch (error) {
        return res.status(400).json({ erro: error.message });
    }
};

const deletarProtetor = async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await deletaProtetor.deletarUsuario(id, 'protetor');
        return res.status(200).json({ mensagem: resultado.message });
    } catch (error) {
        return res.status(400).json({ erro: error.message });
    }
};

const updateProtetor = async (req, res) => {
    try {
        const { id } = req.params;
        const dados = req.body;
        const protetorAtualizado = await atualizarProtetor(id, dados);
        return res.status(200).json(protetorAtualizado);
    } catch (error) {
        return res.status(400).json({ erro: error.message });
    }
};

module.exports = {
    cadastrarProtetor,
    deletarProtetor,
    updateProtetor
};