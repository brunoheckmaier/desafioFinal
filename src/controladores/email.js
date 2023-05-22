const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.API_KEY);

const { email } = req.usuario;

const mensagem = {
  to: email,
  from: process.env.EMAIL_API,
  subject: "Pedido foi efetuado com sucesso",
  text: "Seu pedido foi confirmado",
};

sgMail.send(mensagem);
