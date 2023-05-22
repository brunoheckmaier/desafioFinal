const express = require("express");
const {
  cadastrarUsuario,
  login,
  detalharPerfil,
  editarPerfil,
} = require("./controladores/usuarios");
const {
  validarDadosUsuario,
  validarLogin,
  validarDadosCliente,
  validarDadosProduto,
} = require("./intermediarios/validarDados");
const { validarToken } = require("./intermediarios/validarToken");
const { listarCategorias } = require("./controladores/categorias");
const {
  cadastrarCliente,
  buscarClientes,
  editarDadosCliente,
  excluirCliente,
} = require("./controladores/clientes");
const {
  detalharProduto,
  cadastrarProduto,
  editarDadosProduto,
  listarProdutos,
  excluirProduto,
} = require("./controladores/protudos");
const validarCategoria = require("./intermediarios/validarCategoria");
const validarProdutoExistente = require("./intermediarios/validarProdutoExiste");
const { cadastrarPedido, listarPedidos } = require("./controladores/pedidos");
const validarCorpoPedido = require("./intermediarios/validarCorpoPedido");
const multer = require("./filtros/multer");
const { uploadImage } = require("./controladores/image");
const { listarImagens } = require("./filtros/imageStorage");

const rotas = express.Router();

rotas.get("/categoria", listarCategorias);
rotas.post("/usuario", validarDadosUsuario, cadastrarUsuario);
rotas.post("/login", validarLogin, login);

rotas.use(validarToken);

rotas.get("/usuario", detalharPerfil);
rotas.put("/usuario", validarDadosUsuario, editarPerfil);

rotas.post("/cliente", validarDadosCliente, cadastrarCliente);
rotas.get("/cliente/:id", buscarClientes);
rotas.put("/cliente/:id", editarDadosCliente);

rotas.post(
  "/produto",
  multer.single("produto_imagem"),
  validarCategoria,
  validarDadosProduto,
  cadastrarProduto
);
rotas.put(
  "/produto/:id",
  multer.single("produto_imagem"),
  validarCategoria,
  validarProdutoExistente,
  validarDadosProduto,
  editarDadosProduto
);
rotas.get("/produto", listarProdutos);
rotas.get("/produto/:id", detalharProduto);
rotas.delete("/produto/:id", excluirProduto);

rotas.post("/pedido", validarCorpoPedido, cadastrarPedido);
rotas.get("/pedido/:id", listarPedidos);

rotas.post('/arquivo/upload', multer.single('imagem'), uploadImage);
rotas.get('/arquivo', listarImagens)

module.exports = rotas;
