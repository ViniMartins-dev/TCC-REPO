const { loginUsuario } = require('../services/login');

const login = async (req, res) => {
  try {
    const { email, senha } = req.body;
    const resultado = await loginUsuario(email, senha);
    return res.status(200).json(resultado); // Retorna { token, usuario }
  } catch (error) {
    return res.status(400).json({ erro: error.message });
  }
};

module.exports = {
  login,
};
