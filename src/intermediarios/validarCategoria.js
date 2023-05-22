const knex = require("../conexao");

const validarCategoria = async (req, res, next) => {
  const categoria_id = parseInt(req.body["categoria_id"]);
  console.log(categoria_id);

  const verificarCategoria = await knex("categorias")
    .where("id", categoria_id)
    .first();

  const resultado = verificarCategoria;

  const categoria = await knex("categorias");

  if (resultado == undefined) {
    return res.status(404).json({
      mensagem: "Categoria_id inválida, selecione uma categoria válida",
      categoria,
    });
  }

  next();
};

module.exports = validarCategoria;
