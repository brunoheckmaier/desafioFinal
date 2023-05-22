const knex = require("../conexao");

const validarProdutoExistente = async (req, res, next) => {
  const { id } = req.params;

  const verificarProduto = await knex("produtos").where({ id }).first();

  if (!verificarProduto) {
    return res.status(404).json({ mensagem: "Produto não encontrado" });
  }

  next();
};

module.exports = validarProdutoExistente;
