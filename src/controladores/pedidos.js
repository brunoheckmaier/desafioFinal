const knex = require("../conexao");
const sgMail = require("@sendgrid/mail");

const pedidosController = {
  async cadastrarPedido(req, res) {
    const { cliente_id, observacao, pedido_produtos } = req.body;

    try {
      let valorTotalProduto = 0;

      for (let produto of pedido_produtos) {
        const valorProduto = await knex("produtos ")
          .where("id", produto.produto_id)
          .first();
        const { valor } = valorProduto;

        valorTotalProduto += valor * produto.quantidade_produto;
      }

      const adicionarPedido = await knex("pedidos").insert({
        cliente_id,
        observacao,
        valor_total: valorTotalProduto,
      });

      if (adicionarPedido) {
        for (let pedido of pedido_produtos) {
          const valorProduto = await knex("produtos ")
            .where("id", pedido.produto_id)
            .first();

          const consultarPedido = await knex("pedidos")
            .orderBy("id", "desc")
            .first();

          const { valor } = valorProduto;
          const { id } = consultarPedido;

          const atualizarQuantidade = await knex("produtos")
            .where("id", pedido.produto_id)
            .first();

          const { quantidade_estoque } = atualizarQuantidade;

          const reduzirEstoque = quantidade_estoque - pedido.quantidade_produto;

          await knex("produtos")
            .where("id", pedido.produto_id)
            .update("quantidade_estoque", reduzirEstoque);

          await knex("pedido_produtos").insert({
            pedido_id: id,
            produto_id: pedido.produto_id,
            quantidade_produto: pedido.quantidade_produto,
            valor_produto: valor,
          });
        }
      }

      sgMail.setApiKey(process.env.API_KEY);

      const { email } = req.usuario;

      const mensagem = {
        to: email,
        from: process.env.EMAIL_API,
        subject: "Pedido foi efetuado com sucesso",
        text: "Seu pedido foi confirmado",
      };

      sgMail.send(mensagem);

      return res
        .status(201)
        .json({ mensagem: "Pedido concluído com sucesso!" });
    } catch (error) {
      return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
  },

  async listarPedidos(req, res) {
    const { cliente_id } = req.query;

    try {
      let pedidos = await knex("pedidos");

      if (cliente_id) {
        pedidos = await knex("pedidos").where("id", cliente_id);
      }

      let pedidosFinalizados = [];

      for (let pedido of pedidos) {
        let pedidoProdutos = await knex("pedido_produtos").where(
          "pedido_id",
          pedido.id
        );

        pedidosFinalizados.push({
          pedido: pedido,
          pedido_produtos: pedidoProdutos,
        });
      }

      return res.send(pedidosFinalizados);
    } catch (error) {
      return res.status(500).json({ mensagem: "Erro interno do Servidor" });
    }
  },
};

module.exports = pedidosController;
