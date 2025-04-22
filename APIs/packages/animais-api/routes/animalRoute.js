const express = require('express');
const router = express.Router();
const animalController = require('../controllers/animalController');

router.get('/animais', animalController.listarAnimais);                         // Rota para listar todos os animais
router.post('/animais', animalController.cadastrarAnimal);                      // Rota para cadastrar um novo animal
router.put('/animais/:id', animalController.atualizarAnimal);                   // Rota para atualizar um animal existente
router.delete('/animais/:id', animalController.deletarAnimal);                  // Rota para deletar um animal existente

router.post('/animais/filtrar', animalController.filtrarAnimais);               // Rota para filtrar animais com base em critérios específicos

module.exports = router;