const knex = require("../conexao");

const verificarEmailExistente = async (tabela, email) => {
  return await knex(`${tabela}`).where({ email }).first();
};

const verificarCpfExistente = async (tabela, cpf) => {
  return await knex(`${tabela}`).where({ cpf }).first();
};

const verificarClienteExistente = async (tabela, id) => {
  return await knex(`${tabela}`).where({ id }).first();
};

module.exports = {
  verificarCpfExistente,
  verificarClienteExistente,
  verificarEmailExistente,
};
