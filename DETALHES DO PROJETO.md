# Detalhes do Projeto PDV

Olá, através deste MD vamos se comunicando e adicionando funcionalidades e ferramentas para controle de atualizações no codigo.

### **Bibliotecas Utilizadas**

- dotenv
- Express
- Knex
- Yup
- Bcrypt
- JWT
- PG
- Cors
- Nodemon como Dependência de Desenvolvimento

## **Endpoints**

**Cadastrar Cliente**

**POST /cliente**

##### Dados a serem cadastrados:

- Nome
- Email (campo obrigatório e único)
- Cpf (campo obrigatório e único. Necessita de 11 digitos para efeutar o cadastro)
- Cep (campo obrigatório. Necessita de 8 digitos para efetuar o cadastro)
- Rua
- Numero
- Bairro
- Cidade
- Estado

**Buscar Cliente**

**GET /cliente/id**

Utiliza-se dos parametros de rotas para informar o ID do cliente cadastrado retornando os dados se existirem no banco de dados.
