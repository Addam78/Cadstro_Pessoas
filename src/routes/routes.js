const express = require('express')
const router = express.Router();

const app = express()

const logica = require('../controllers/logica');
const { log } = require('handlebars');


require('dotenv').config();

//CONFIGURANDO MYSQL
const mysql = require('mysql2')

//CONFIGURANDO BANCO DE DADOS COM ARQUIVO ENV

// Criação da conexão com MySQL
const conexao = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
  });


  
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