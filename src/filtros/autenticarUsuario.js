const knex = require("../conexao");
const bcrypt = require("bcrypt");

const autenticarUsuario = async (email, senha) => {
  const usuario = await knex("usuarios").where({ email }).first();

  if (usuario && (await bcrypt.compare(senha, usuario.senha))) {
    return usuario;
  }
  throw { mensagem: "Usuario/senha invalida." };
};

module.exports = autenticarUsuario;
