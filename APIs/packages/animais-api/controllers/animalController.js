const listaAnimais = require('../services/listarAnimaisCadastrados');       // Importa o serviço de listar animais
const cadastroAnimal = require('../services/cadastrarAnimal');              // Importa o serviço de cadastrar animal
const atualizaAnimal = require('../services/atualizarAnimal');              // Importa o serviço de atualizar animal
const deletaAnimal = require('../services/deletarAnimal');                  // Importa o serviço de deletar animal
const filtraAnimais = require('../services/filtrarAnimais');                // Importa o serviço de filtrar animais
const buscaAnimalPorId = require('../services/animalPorId');                // Importa o serviço de obter animal por ID
const multer = require('multer')
const upload = multer(); // Para tratar os dados da imagem

// Lista todos os animais cadastrados por um determinado protetor (id passado na URL)
const listarAnimais = async (req, res) => {
    try {
        const { id } = req.params;
        const animais = await listaAnimais.listarAnimaisCadastrados(id);

        const animaisFormatados = animais.map(animal => {
            const animalJSON = animal.toJSON();
            const fotoBase64 = animalJSON.bin_foto // Repassa o buffer da imagem em base64
                ? `data:image/png;base64,${animalJSON.bin_foto.toString('base64')}`
                : null;

            // Retorna todos os dados do animal + imagem em base64, sem o campo binário original
            return {
                ...animalJSON,
                fotoBase64,
                bin_foto: undefined
            };
        });

        return res.status(200).json(animaisFormatados);
    } catch (error) {
        return res.status(400).json({ erro: error.message });
    }
};

// Cadastra um novo animal, recebendo os dados e a imagem via multipart/form-data
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

// Atualiza os dados de um animal específico
const atualizarAnimal = async (req, res) => {
    try {
        const { id } = req.params;
        const dados = req.body;
        const fotoBuffer = req.file ? req.file.buffer : null;

        const animalAtualizado = await atualizaAnimal.atualizarAnimal(id, dados, fotoBuffer);
        return res.status(200).json(animalAtualizado);
    } catch (error) {
        return res.status(400).json({ erro: error.message });
    }
};

// Deleta um animal (o protetor deve passar seu ID no corpo da requisição para segurança)
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

// Filtra animais com base nos critérios passados via query string (nome, espécie, idade, etc)
const filtrarAnimais = async (req, res) => {
    try {
        const animais = await filtraAnimais.filtrarAnimais(req.query);
        console.log(req.query);

        const animaisFormatados = animais.map(animal => {
            const animalJSON = animal.toJSON();
            const fotoBase64 = animalJSON.bin_foto
                ? `data:image/png;base64,${animalJSON.bin_foto.toString('base64')}`
                : null;

            return {
                ...animalJSON,
                fotoBase64,
                bin_foto: undefined
            };
        });

        return res.status(200).json(animaisFormatados);
    } catch (error) {
        return res.status(400).json({ erro: error.message });
    }
};

// Busca os dados de um animal específico por ID
const animalPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const animal = await buscaAnimalPorId.animalPorId(id);

        const animalJSON = animal.toJSON();
        const fotoBase64 = animalJSON.bin_foto
            ? `data:image/png;base64,${animalJSON.bin_foto.toString('base64')}`
            : null;

        return res.status(200).json({
            ...animalJSON,
            fotoBase64,
            bin_foto: undefined
        });
    } catch (error) {
        return res.status(400).json({ erro: error.message });
    }
};

module.exports = {
    listarAnimais,
    cadastrarAnimal,
    atualizarAnimal,
    deletarAnimal,
    filtrarAnimais,
    animalPorId
};