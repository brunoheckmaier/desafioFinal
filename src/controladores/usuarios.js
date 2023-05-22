const knex = require("../conexao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const autenticarUsuario = require("../filtros/autenticarUsuario");
const { verificarEmailExistente } = require("../filtros/verificarDadosExistentes");

const usuariosController = {
  async cadastrarUsuario(req, res) {
    const { nome, email, senha } = req.body;

    try {
      const emailExiste = await verificarEmailExistente("usuarios", email);

      if (emailExiste) {
        return res.status(400).json({
          mensagem:
            "O e-mail informado já existe em nossa base. Insira um novo e-mail",
        });
      }

      const senhaCriptografada = await bcrypt.hash(senha, 10);

      const usuario = await knex("usuarios")
        .insert({
          nome,
          email,
          senha: senhaCriptografada,
        })
        .returning("*");

      const { senha: _, ...usuarioCadastrado } = usuario[0];

      return res.status(201).json(usuarioCadastrado);
    } catch (error) {
      console.log(error.message)
      return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
  },

  async login(req, res) {
    const { email, senha } = req.body;

    try {
      let usuario = await autenticarUsuario(email, senha);
      const token = jwt.sign(
        {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email,
        },
        process.env.SENHA_JWT,
        {
          expiresIn: "10h",
        }
      );

      const { senha: _, ...usuarioLogado } = usuario;

      return res.status(200).json({
        usuario: usuarioLogado,
        token,
      });
    } catch (error) {
      return res.status(400).json({
        mensagem: error.mensagem,
      });
    }
  },

  async detalharPerfil(req, res) {
    return res.json(req.usuario);
  },

  async editarPerfil(req, res) {
    const { nome, email, senha } = req.body;
    try {
      const emailExiste = await verificarEmailExistente("usuarios", email);

      if (emailExiste) {
        return res.status(400).json({
          mensagem:
            "O e-mail informado já existe em nossa base. Insira um novo e-mail",
        });
      }

      const senhaCriptografada = await bcrypt.hash(senha, 10);

      const atualizarUsuario = await knex("usuarios")
        .where({ id: req.usuario.id })
        .update({
          nome,
          email,
          senha: senhaCriptografada,
        })
        .returning("*");

      const { senha: _, ...usuario } = atualizarUsuario[0];

      return res.status(201).json(usuario);
    } catch (error) {
      return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
  },
};

module.exports = usuariosController;
