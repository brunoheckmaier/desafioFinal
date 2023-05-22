const { clienteSchema } = require("../filtros/clienteSchema");
const produtoSchema = require("../filtros/produtoSchema");
const { usuarioSchema, loginSchema } = require("../filtros/usuarioSchema");

const validarDadosUsuario = async (req, res, next) => {
  try {
    await usuarioSchema.validate(req.body);

    next();
  } catch (error) {
    return res.status(400).json({ mensagem: error.errors });
  }
};

const validarLogin = async (req, res, next) => {
  try {
    await loginSchema.validate(req.body);

    next();
  } catch (error) {
    return res.status(400).json({ mensagem: error.errors });
  }
};

const validarDadosCliente = async (req, res, next) => {
  try {
    await clienteSchema.validate(req.body);

    next();
  } catch (error) {
    return res.status(400).json({ mensagem: error.errors });
  }
};

const validarDadosProduto = async (req, res, next) => {
  try {
    await produtoSchema.validate(req.body);
    next();
  } catch (error) {
    return res.status(400).json({ mensagem: error.errors });
  }
};
module.exports = {
  validarDadosUsuario,
  validarLogin,
  validarDadosCliente,
  validarDadosProduto,
};
