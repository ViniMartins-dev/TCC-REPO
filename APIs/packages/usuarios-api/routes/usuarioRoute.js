const express = require('express');
const router = express.Router();
const tutorController = require('../controllers/tutorController');
const protetorController = require('../controllers/protetorController');

// Rotas para o Tutor
router.post('/tutor', tutorController.cadastrarTutor);                      // Rota para cadastrar um tutor
router.delete('/tutor/:id', tutorController.deletarTutor);                  // Rota para deletar um tutor


// Rotas para o Protetor
router.post('/protetor', protetorController.cadastrarProtetor);             // Rota para cadastrar um protetor   
router.delete('/protetor/:id', protetorController.deletarProtetor);         // Rota para deletar um protetor

// Rota login


module.exports = router;
