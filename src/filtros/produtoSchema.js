const yup = require("yup");
const { pt } = require("yup-locales");

yup.setLocale(pt);

const produtoSchema = yup.object().shape({
  descricao: yup.string().required(),
  quantidade_estoque: yup.number().integer().required(),
  valor: yup.number().integer().required(),
  categoria_id: yup.number().integer().required(),
});

module.exports = produtoSchema;
