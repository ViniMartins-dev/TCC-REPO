const listaAnimais = require('../services/listarAnimaisCadastrados');       // Importa o serviço de listar animais
const cadastroAnimal = require('../services/cadastrarAnimal');              // Importa o serviço de cadastrar animal
const atualizaAnimal = require('../services/atualizarAnimal');              // Importa o serviço de atualizar animal
const deletaAnimal = require('../services/deletarAnimal');                  // Importa o serviço de deletar animal
const filtraAnimais = require('../services/filtrarAnimais');                // Importa o serviço de filtrar animais
const buscaAnimalPorId = require('../services/animalPorId');                // Importa o serviço de obter animal por ID

const upload = multer(); // Para tratar os dados da imagem

const listarAnimais = async (req, res) => {
    try {
        const { id } = req.params;
        const animais = await listaAnimais.listarAnimaisCadastrados(id);
        return res.status(200).json(animais);
    } catch (error) {
        return res.status(400).json({ erro: error.message });
    }
};

const cadastrarAnimal = async (req, res) => {
    try {
        const dados = req.body;
        const fotoBuffer = req.file ? req.file.buffer : null;  
        const novoAnimal = await cadastroAnimal.criarAnimal(dados, fotoBuffer);
        return res.status(201).json(novoAnimal);
    } catch (error) {
        return res.status(400).json({ erro: error.message });
    }
};

const atualizarAnimal = async (req, res) => {
    try {
        const { id } = req.params;
        const dados = req.body;
        const animalAtualizado = await atualizaAnimal.atualizarAnimal(id, dados);
        return res.status(200).json(animalAtualizado);
    } catch (error) {
        return res.status(400).json({ erro: error.message });
    }
};

const deletarAnimal = async (req, res) => {
    try {
        const { id } = req.params;
        const { idProtetor } = req.body;
        const resultado = await deletaAnimal.deletarAnimal(id, idProtetor);
        return res.status(200).json({ mensagem: resultado.message });
    } catch (error) {
        return res.status(400).json({ erro: error.message });
    }
};

const filtrarAnimais = async (req, res) => {
    try {
        const animais = await filtraAnimais.filtrarAnimais(req.query);
        console.log(req.query)
        return res.status(200).json(animais);
    } catch (error) {
        return res.status(400).json({ erro: error.message });
    }
};

const animalPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const animal = await buscaAnimalPorId.animalPorId(id);
        return res.status(200).json(animal);
    } catch (error) {
        return res.status(400).json({ erro: error.message });
    }
}

module.exports = {
    listarAnimais,
    cadastrarAnimal,
    atualizarAnimal,
    deletarAnimal,
    filtrarAnimais,
    animalPorId
};