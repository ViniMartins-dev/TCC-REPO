// módulo para verificar se o token é válido

const jwt = require('jsonwebtoken');                // Importa o jsonwebtoken
const SECRET = process.env.JWT_SECRET;              // Pega a chave secreta do arquivo .env

function authToken(req, res, next) {
    const token = req.headers['bearer'];            // Pega o token do header
    jwt.verify(token, SECRET, (err, decoded) =>{
        if (err) {
            return res.status(401).json({ error: 'Token inválido' }); // Caso o token seja inválido
        }

        req.userId = decoded.id;                    // Se o token for válido, pega o id do usuário
        next();                                     // Chama o próximo middleware
    });
}

module.exports = {
    authToken,
};