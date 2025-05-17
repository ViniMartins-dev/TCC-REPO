const express = require('express');
const router = express.Router();
const animalController = require('../controllers/animalController');
const auth = require('../../auth/auth');                                            // Importa o middleware de autenticação

router.get('/cadastrados/:id', auth.authToken, animalController.listarAnimais);     // Rota para listar todos os animais cadastrados pelo id
router.post('/', auth.authToken, animalController.cadastrarAnimal);                 // Rota para cadastrar um novo animal
router.put('/:id', auth.authToken, animalController.atualizarAnimal);               // Rota para atualizar um animal existente
router.delete('/:id', auth.authToken, animalController.deletarAnimal);              // Rota para deletar um animal existente

router.get('/filtrar', auth.authToken, animalController.filtrarAnimais);            // Rota para filtrar animais com base em critérios específicos

module.exports = router;