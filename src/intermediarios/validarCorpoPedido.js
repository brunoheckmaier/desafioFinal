const pedidosSchema = require("../filtros/pedidosSchema");

const validarCorpoPedido = async (req, res, next) => {
  try {
    await pedidosSchema.validate(req.body);

    next();
  } catch (error) {
    return res.status(400).json({ mensagem: error.errors });
  }
};

module.exports = validarCorpoPedido;
