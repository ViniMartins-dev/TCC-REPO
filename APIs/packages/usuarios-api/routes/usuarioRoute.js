const express = require('express');
const router = express.Router();
const tutorController = require('../controllers/tutorController');
const protetorController = require('../controllers/protetorController');

// Rota para cadastrar um tutor
router.post('/cadastro/tutor', tutorController.cadastrarTutor);                 // Rota para cadastrar um tutor



router.post('/cadastro/protetor', protetorController.cadastrarProtetor)         // Rota para cadastrar uma organização

module.exports = router;
