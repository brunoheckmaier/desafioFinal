const knex = require("../conexao");

const validarInsercaoPedido = async (req, res, next) => {
  const { cliente_id, pedido_produtos } = req.body;

  try {
    const clienteExiste = await knex("clientes")
      .where("id", cliente_id)
      .first();

    if (!clienteExiste) {
      return res.status(404).json({
        mensagem:
          "Cliente não encontrado, favor consultar os clientes cadastrados",
      });
    }

    for (let produto of pedido_produtos) {
      const produtoExiste = await knex("produtos")
        .where("id", produto.produto_id)
        .first();

      if (!produtoExiste) {
        return res.status(404).json({
          mensagem: `Produto_id ${produto.produto_id} não encontrado! Favor consultar os produtos cadastrados`,
        });
      }

      const quantidadeProduto = await knex("produtos")
        .select("quantidade_estoque")
        .where("id", produto.produto_id)
        .first();

      const { quantidade_estoque } = quantidadeProduto;

      if (produto.quantidade_produto > quantidade_estoque) {
        return res.status(403).json({
          mensagem: `A quantidade solicitada do item ${produto.produto_id} é maior do que temos no estoque`,
          quantidade_estoque,
        });
      }
    }
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }

  next();
};

module.exports = { validarInsercaoPedido };
