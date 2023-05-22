const knex = require('../conexao')

const categoriasController = {
 async listarCategorias(req, res){
    const categorias = await knex("categorias")
        
     return res.json(categorias)
    } 
}

module.exports = categoriasController