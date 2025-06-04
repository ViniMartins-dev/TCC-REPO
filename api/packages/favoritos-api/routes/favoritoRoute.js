const express = require('express');
const router = express.Router();
const favoritoController = require('../controllers/favoritoController');            // Importa o controlador de favoritos
const auth = require('../../auth/auth');                                            // Importa o middleware de autenticação

router.post('/', auth.authToken, favoritoController.adicionarFavorito);                                 // Rota para adicionar um animal aos favoritos
router.delete('/:id_animal/:id_usuario', auth.authToken, favoritoController.deletarFavorito);           // Rota para remover um animal dos favoritos
router.get('/listar/:id', auth.authToken, favoritoController.listarFavorito);                           // Rota para listar todos os favoritos de um usuário

module.exports = router;