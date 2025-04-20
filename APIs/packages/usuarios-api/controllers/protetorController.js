const cadastroProtetor = require('../services/cadastroProtetor'); // Importa o serviço de cadastro de protetor

const cadastrarProtetor = async (req, res) => {
  try {
    const dados = req.body;
    const novoProtetor = await cadastroProtetor.criarProtetor(dados);
    return res.status(201).json(novoProtetor);
  } catch (error) {
    return res.status(400).json({ erro: error.message });
  }
};

module.exports = {
  cadastrarProtetor,
};