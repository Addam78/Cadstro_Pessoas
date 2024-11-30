const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
//const handlebars = require('express-handlebars');
//const path = require('path'); // Importe o módulo path para lidar com caminhos de arquivos

const app = express();

// Configuração do body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Pasta file system para remover imagens, porem esse codigo não possui imagens
const fs = require('fs')


//Configurando handlebars
const handlebars = require('express-handlebars')
app.engine('handlebars', handlebars.engine({
  defaultLayout: 'main',
  runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
  },
}))
app.set('view engine', 'handlebars')


require('dotenv').config();

//CONFIGURANDO MYSQL
const mysql = require('mysql2')



// Criação da conexão com MySQL
const conexao = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
  });


  
//TESTE CONEXÃO
conexao.connect(function(erro){
    if(erro) throw erro;
    console.log('Conexão com suceso')
})

const PORT = process.env.PORT || 8081;

//CONFIGURANDO VARIAVEL DOTENV

// Especifique o diretório onde estão os arquivos de views
//app.set('layouts', path.join(__dirname, 'C:\Users\AddamCosmo\Documents\Projetos_github_vscode\cadastro_pessoas\views\layouts'));


//EXPRTANDO ARQIVO ROUTES
const routes = require('./src/routes/routes')
app.use(routes)

// Servidor iniciando na porta 8081
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta http://localhost:${PORT}/`);
});
