const yup = require("yup");
const { pt } = require("yup-locales");

yup.setLocale(pt);

const clienteSchema = yup.object().shape({
  nome: yup.string().required(),
  email: yup.string().required().email(),
  cpf: yup
    .string()
    .matches(/^[0-9]{11}$/, "CPF invalido! São necessários 11 digitos.")
    .required()
    .trim(),
  cep: yup
    .string()
    .matches(/^[0-9]{8}$/, "Cep invalido! São necessários 8 digitos.")
    .trim(),
  rua: yup.string().trim(),
  numero: yup.string().trim(),
  bairro: yup.string().trim(),
  cidade: yup.string().trim(),
  estado: yup.string().min(2).trim(),
});

module.exports = {
  clienteSchema,
};
