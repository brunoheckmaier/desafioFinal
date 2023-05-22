const yup = require("yup");
const { pt } = require("yup-locales");

yup.setLocale(pt);

const pedidosSchema = yup.object().shape({
  cliente_id: yup.number().required().positive().integer(),
  pedido_produtos: yup.array().of(
    yup.object().shape({
      produto_id: yup.number().required().positive().integer(),
      quantidade_produto: yup.number().required().positive().integer(),
    })
  ),
});

module.exports = pedidosSchema;
