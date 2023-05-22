const jwt = require("jsonwebtoken");

const validarToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ mensagem: "Nao autorizado" });
  }

  const token = authorization.split(" ")[1];

  try {
    const usuario = jwt.verify(token, process.env.SENHA_JWT);

    req.usuario = {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
    };

    next();
  } catch (error) {
    return res.status(401).json({ mensagem: error.message });
  }
};

module.exports = { validarToken };
