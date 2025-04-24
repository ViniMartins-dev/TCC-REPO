const express = require('express');
const router = express.Router();
const adocaoController = require('../controllers/adocaoController');

router.get('/protetor/:id', adocaoController.listarAdocoes);                    // Rota para listar todas as adoções
router.put('/aprovar', adocaoController.aprovarAdocao);                   // Rota para aprovar uma adoção
router.post('/request', adocaoController.requestAdocao);                   // Rota para solicitar uma adoção

module.exports = router;