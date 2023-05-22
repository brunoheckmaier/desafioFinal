const knex = require("../conexao");
const { uploadFile, excluirArquivo } = require("../filtros/imageStorage");

const produtosController = {
  async cadastrarProduto(req, res) {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

    const produto_imagem = req.file;

    try {
      let imagem_url = null;

      let nome_imagem = null;

      if (produto_imagem) {
        const { originalname, mimetype, buffer } = req.file;
        const { path, url } = await uploadFile(originalname, mimetype, buffer);
        imagem_url = url;
        nome_imagem = path;
      }

      const produto = await knex("produtos")
        .insert({
          descricao,
          quantidade_estoque,
          valor,
          categoria_id,
          produto_imagem: imagem_url,
          nome_imagem,
        })
        .returning("*");

      return res.status(201).json(produto);
    } catch (error) {
      return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
  },

  async editarDadosProduto(req, res) {
    const { id } = req.params;
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
    const produto_imagem = req.file;
    let imagem_url = null;
    let nome_imagem = null;

    try {
      const produto = await knex("produtos").where({ id }).first();

      if (produto.nome_imagem) {
        await excluirArquivo(produto.nome_imagem);
      }

      if (produto_imagem) {
        const { originalname, mimetype, buffer } = req.file;
        const { path, url } = await uploadFile(originalname, mimetype, buffer);
        imagem_url = url;
        nome_imagem = path;
      }

      const atualizarProduto = await knex("produtos")
        .where({ id })
        .update({
          descricao,
          quantidade_estoque,
          valor,
          categoria_id,
          produto_imagem: imagem_url,
          nome_imagem,
        })
        .returning("*");

      return res.status(201).json(atualizarProduto);
    } catch (error) {
      return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
  },

  async listarProdutos(req, res) {
    const listarProduto = await knex("produtos");

    return res.json(listarProduto);
  },

  async detalharProduto(req, res) {
    const { id } = req.params;
    try {
      const produtoExiste = await knex("produtos").where({ id }).first();

      if (!produtoExiste) {
        return res.status(404).json({ mensagem: "Produto não encontrado" });
      }

      return res.json(produtoExiste);
    } catch (error) {
      return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
  },

  async excluirProduto(req, res) {
    const { id } = req.params;

    const verificarProduto = await knex("produtos").where("id", id).first();

    if (!verificarProduto) {
      return res.status(404).json({ mensagem: "Produto não encontrado" });
    }

    const pedidos = await knex("pedido_produtos").where({ produto_id: id });

    if (pedidos.length > 0) {
      return res
        .status(400)
        .json({ mensagem: "Produto com pedido nao pode ser excluido." });
    }

    if (verificarProduto.nome_imagem) {
      await excluirArquivo(verificarProduto.nome_imagem);
    }

    await knex("produtos").where({ id }).del();

    return res.status(200).json({ mensagem: "Produto excluido com sucesso" });
  },
};

module.exports = produtosController;
