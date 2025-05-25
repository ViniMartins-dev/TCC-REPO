const listaFavoritos = require('../services/listarFavorito');       
const adicionaFavorito = require('../services/adicionarFavorito');             
const removeFavorito = require('../services/removerFavorito');             

const listarFavorito = async (req, res) => {
    try {
        const { id } = req.params;
        const favoritos = await listaFavoritos.listarFavorito(id);
        return res.status(200).json(favoritos);
    } catch (error) {
        return res.status(400).json({ erro: error.message });
    }
};

const adicionarFavorito = async (req, res) => {
    try {
        const dados = req.body;
        const novoFavorito = await adicionaFavorito.adicionarFavorito(dados);
        
        return res.status(201).json(novoFavorito);
    } catch (error) {
        return res.status(400).json({ erro: 'animal já favoritado' });
    }
};

const deletarFavorito = async (req, res) => {
    try {
        const { id_animal, id_usuario } = req.params;
        const resultado = await removeFavorito.removerFavorito(id_animal, id_usuario);
        return res.status(200).json({ mensagem: resultado.message });
    } catch (error) {
        return res.status(400).json({ erro: error.message });
    }
};

module.exports = {
    listarFavorito,
    adicionarFavorito,
    deletarFavorito
};