const yup = require('yup')
const { pt } = require('yup-locales')

yup.setLocale(pt)

const usuarioSchema = yup.object().shape({
    nome: yup.string().required(),
    email: yup.string().required().email(),
    senha: yup.string().min(6).required()
})

const loginSchema = yup.object().shape({
    email: yup.string().required().email(),
    senha: yup.string().required()
})

module.exports = {
    usuarioSchema,
    loginSchema
}