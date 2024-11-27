const express = require('express')
const router = express.Router();
const mysql = require('mysql2')

const app = express()

const logica = require('../controllers/logica');
const { log } = require('handlebars');

//CONFIGURAÇÃO DE CONEXÃO
const conexao = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'1234',
    database:'usuarios'
})

//ROTA INICIAL
router.get('/',logica.home)

//ROTA PARA ENVIO DE CADASTRO METODO POST
router.post('/cadastro',logica.enviar)

//ROTA PARA DELETAR
router.get('/deletar/:nome',logica.deletar)

//ROTA PRA VISUALZIAR
router.get('/view',logica.visualizar)

//ROTA PARA IR PARA O FRONT DE EDIÇÃO DE ROTAS
router.get('/formularioeditar/:nome',logica.editar)

//METDODO POST PARA EDIÇÃO DOS USUARIOS
router.post('/editar',logica.edicao)

//

module.exports = router;