const listaAdocoes = require('../services/listaAdocoes'); // Importa o serviço de listar adoções
const aprovaAdocao = require('../services/aprovaAdocao'); // Importa o serviço de aprovar adoção
const gerarAdocao = require('../services/requestAdocao'); // Importa o serviço de gerar adoção

const listarAdocoes = async (req, res) => {
    try {
        const { idProtetor } = req.params; // id do protetor
        const adocoes = await listaAdocoes.listarAdocoes(idProtetor);
        return res.status(200).json(adocoes);
    } catch (error) {
        return res.status(400).json({ erro: error.message });
    }
};

const aprovarAdocao = async (req, res) => {
    try {
        const { idAdocao, aval } = req.body;
        const adocaoAprovada = await aprovaAdocao.aprovarAdocao(idAdocao, aval);
        return res.status(200).json(adocaoAprovada);
    } catch (error) {
        return res.status(400).json({ erro: error.message });
    }
}

const requestAdocao = async (req, res) => {
    try {
        const dados = req.body;
        const novaAdocao = await gerarAdocao.gerarAdocao(dados);
        return res.status(201).json(novaAdocao);
    }
    catch (error) {
        return res.status(400).json({ erro: error.message });
    }
};

const confirmarEntrega = async (req, res) => {
    try {
        const { idAdocao } = req.body;
        const adocaoConfirmada = await aprovaAdocao.confirmarEntrega(idAdocao);
        if (!adocaoConfirmada) {
            return res.status(404).json({ erro: 'Adoção não encontrada ou já confirmada.' });
        }
        return res.status(200).json({ message: 'Entrega confirmada com sucesso.' });
    } catch (error) {
        return res.status(400).json({ erro: error.message });
    }
}

module.exports = {
    listarAdocoes,
    aprovarAdocao,
    requestAdocao,
    confirmarEntrega
}