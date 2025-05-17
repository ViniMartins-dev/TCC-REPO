const express = require('express');
const router = express.Router();
const tutorController = require('../controllers/tutorController');
const protetorController = require('../controllers/protetorController');
const loginController = require('../controllers/loginController');
const auth = require('../../auth/auth'); // Importa o middleware de autenticação


// Rotas para o Tutor
router.post('/tutor', tutorController.cadastrarTutor);                          // Rota para cadastrar um tutor
router.delete('/tutor/:id', auth.authToken, tutorController.deletarTutor);      // Rota para deletar um tutor
router.put('/tutor/:id', auth.authToken, tutorController.updateTutor);          // Rota para atualizar um tutor

// Rotas para o Protetor
router.post('/protetor', protetorController.cadastrarProtetor);                         // Rota para cadastrar um protetor   
router.delete('/protetor/:id', auth.authToken, protetorController.deletarProtetor);     // Rota para deletar um protetor
router.put('/protetor/:id', auth.authToken, protetorController.updateProtetor);         // Rota para atualizar um protetor

// Rota login
router.post('/login', loginController.login);       // Rota para login de usuário (tutor ou protetor)

module.exports = router;
