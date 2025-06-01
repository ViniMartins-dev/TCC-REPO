const express = require('express');
const router = express.Router();
const adocaoController = require('../controllers/adocaoController');
const auth = require('../../auth/auth');                                            // Importa o middleware de autenticação

router.get('/protetor/:id', auth.authToken, adocaoController.listarAdocoes);        // Rota para listar todas as adoções
router.put('/aprovar', auth.authToken, adocaoController.aprovarAdocao);             // Rota para aprovar uma adoção
router.post('/request', auth.authToken, adocaoController.requestAdocao);            // Rota para solicitar uma adoção
router.put('/confirmar', auth.authToken, adocaoController.confirmarEntrega);        // Rota para confirmar a entrega de uma adoção

module.exports = router;