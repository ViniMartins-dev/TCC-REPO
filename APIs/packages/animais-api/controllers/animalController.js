const listaAnimais = require('../services/listarAnimais');         // Importa o serviço de listar animais
const cadastroAnimal = require('../services/cadastrarAnimal');     // Importa o serviço de cadastrar animal
const atualizaAnimal = require('../services/atualizarAnimal');     // Importa o serviço de atualizar animal
const deletaAnimal = require('../services/deletarAnimal');         // Importa o serviço de deletar animal
const filtraAnimais = require('../services/filtrarAnimais');       // Importa o serviço de filtrar animais

const listarAnimais = async (req, res) => {

};

const cadastrarAnimal = async (req, res) => {
    try {
        const dados = req.body;
        const novoAnimal = await cadastroAnimal.criarAnimal(dados);
        return res.status(201).json(novoAnimal);
    } catch (error) {
        return res.status(400).json({ erro: error.message });
    }
};

const atualizarAnimal = async (req, res) => {

};

const deletarAnimal = async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await deletaAnimal.deletarAnimal(id);
        return res.status(200).json({ mensagem: resultado.message });
    } catch (error) {
        return res.status(400).json({ erro: error.message });
    }
};

const filtrarAnimais = async (req, res) => {

};

module.exports = {
    listarAnimais,
    cadastrarAnimal,
    atualizarAnimal,
    deletarAnimal,
    filtrarAnimais
};