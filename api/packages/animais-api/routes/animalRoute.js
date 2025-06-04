const express = require('express');
const router = express.Router();
const animalController = require('../controllers/animalController');
const auth = require('../../auth/auth');    // Importa o middleware de autenticação
const multer = require('multer')
const upload = multer();                    // Para tratar os dados da imagem

router.get('/cadastrados/:id', auth.authToken, animalController.listarAnimais);                     // Rota para listar todos os animais cadastrados pelo id
router.post('/', auth.authToken, upload.single('bin_foto'),animalController.cadastrarAnimal);       // Rota para cadastrar um novo animal
router.put('/:id', auth.authToken, upload.single('bin_foto'), animalController.atualizarAnimal);    // Rota para atualizar um animal existente
router.delete('/:id', auth.authToken, animalController.deletarAnimal);                              // Rota para deletar um animal existente
router.get('/filtrar',animalController.filtrarAnimais);                                             // Rota para filtrar animais com base em critérios específicos
router.get('/show/:id', auth.authToken, animalController.animalPorId);                              // Rota para obter um animal específico pelo id

module.exports = router;
