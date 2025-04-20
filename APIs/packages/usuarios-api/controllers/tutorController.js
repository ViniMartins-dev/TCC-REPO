const tutorService = require('../services/cadastroTutor'); // Importa o serviço de cadastro de tutor

const cadastrarTutor = async (req, res) => {
  try {
    const dados = req.body;
    const novoTutor = await tutorService.criarTutor(dados);
    return res.status(201).json(novoTutor);
  } catch (error) {
    return res.status(400).json({ erro: error.message });
  }
};

module.exports = {
  cadastrarTutor,
};