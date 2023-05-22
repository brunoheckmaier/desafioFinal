const knex = require("../conexao");
const {
  verificarEmailExistente,
  verificarCpfExistente,
  verificarClienteExistente,
} = require("../filtros/verificarDadosExistentes");

const clientesController = {
  async cadastrarCliente(req, res) {
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } =
      req.body;

    try {
      const emailExiste = await verificarEmailExistente("clientes", email);

      if (emailExiste) {
        return res.status(400).json({
          mensagem:
            "O e-mail informado já existe em nossa base. Insira um novo e-mail",
        });
      }

      const cpfExiste = await verificarCpfExistente("clientes", cpf);

      if (cpfExiste) {
        return res.status(400).json({
          mensagem:
            "O CPF informado já existe em nossa base. Insira um novo CPF",
        });
      }

      const cliente = await knex("clientes")
        .insert({
          nome,
          email,
          cpf,
          cep,
          rua,
          numero,
          bairro,
          cidade,
          estado,
        })
        .returning("*");

      return res.status(201).json(cliente[0]);
    } catch (error) {
      return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
  },

  async buscarClientes(req, res) {
    const { id } = req.params;

    try {
      const clienteExiste = await verificarClienteExistente("clientes", id);

      if (!clienteExiste) {
        return res.status(404).json({
          mensagem: "Cliente não encontrado!",
        });
      }

      return res.status(201).json(clienteExiste);
    } catch (error) {
      return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
  },

  async editarDadosCliente(req, res) {
    const { id } = req.params;
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } =
      req.body;

    try {
      const clienteExiste = await verificarClienteExistente("clientes", id);

      if (!clienteExiste) {
        return res.status(404).json({
          mensagem: "Cliente não encontrado!",
        });
      }

      if (cpf) {
        const cpfExiste = await verificarCpfExistente("clientes", cpf);

        if (cpfExiste) {
          return res.status(400).json({
            mensagem:
              "O CPF informado já existe em nossa base. Insira um novo CPF",
          });
        }
      }

      if (email) {
        const emailExiste = await verificarEmailExistente("clientes", email);

        if (emailExiste) {
          return res.status(400).json({
            mensagem:
              "O e-mail informado já existe em nossa base. Insira um novo e-mail",
          });
        }
      }

      const atualizarDadosCliente = await knex("clientes")
        .where({ id })
        .update({
          nome,
          email,
          cpf,
          cep,
          rua,
          numero,
          bairro,
          cidade,
          estado,
        })
        .returning("*");

      return res.status(201).json(atualizarDadosCliente);
    } catch (error) {
      return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
  },
};
module.exports = clientesController;
