const express = require('express');
const router = express.Router();
const tutorController = require('../controllers/tutorController');

// Rota para cadastrar um tutor
router.post('/tutores', tutorController.cadastrarTutor);




module.exports = router;
