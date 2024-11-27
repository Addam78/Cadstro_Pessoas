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
//CONFIGURANDO MYSQL
const mysql = require('mysql2')

//CONFIGURAÇÃO DE CONEXÃO
const conexao = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'1234',
    database:'usuarios'
})

//TESTE CONEXÃO
conexao.connect(function(erro){
    if(erro) throw erro;
    console.log('Conexão com suceso')
})

// Especifique o diretório onde estão os arquivos de views
//app.set('layouts', path.join(__dirname, 'C:\Users\AddamCosmo\Documents\Projetos_github_vscode\cadastro_pessoas\views\layouts'));

// Rota para renderizar 'main.handlebars'


// Rota para renderizar 'cadastro.handlebars'
// app.get('/', function(req, res) {
//     res.render('cadastro');
// });


// app.post('/cadastro' , function(req,res){
//     let name =req.body.nome
//     let adress = req.body.endereco
//     let phone = req.body.celular
//     let emails = req.body.email


//     //SQL
//     let sql = `INSERT INTO pessoas (nome,endereco,celular,email) VALUES ('${name}', '${adress}', '${phone}',' ${emails}')`

//     //QUERY
//     conexao.query(sql, function(erro , retorno){
//         if (erro){
//             console.error('Erro:',erro)
//         }else{
//             console.log('Usuario Criado com sucesso')
//             res.redirect('/view')
//         }

        
//     })
// })

// ROTA PARA VISUALIZAR
// app.get('/view', function(req,res){
//     let sql = `SELECT * FROM pessoas`
    
//     //EXECUTAR COMANDO SQL
//     conexao.query(sql, function(erro, retorno){
//         res.render('visualizar', {pessoas:retorno})
//     })
// })

// // //Rota para remover
// app.get('/deletar/:nome', function(req,res){
//     //console.log(`O usuario com nome ${req.params.nome} foi deletado com sucesso`)
//     //res.end()
//     //SQL
//     let sql = `DELETE FROM pessoas WHERE nome = '${req.params.nome}'`
    
//     //EXECUTAR O COMANDO    
//     conexao.query(sql, function(erro, retorno){
//         if (erro) throw erro  
//     }) 
//     res.redirect('/view') 
    
// })


// //ROTA PARA ALTERAÇÃO
// app.get('/formularioeditar/:nome', function(req,res){
   
//         //SQL
//         let sql = `SELECT * FROM pessoas WHERE nome = '${req.params.nome}'`

//         //EXECUTAR COMANDO
//         conexao.query(sql, function(erro, retorno){
//             if (erro) throw erro
    
//             res.render('formularioeditar', {pessoas:retorno[0]})
//         })
// })

// //ROTA EDIÇÃO, POST
// app.post('/editar', function(req,res){
//     //OBTER DADOS
//     let Id = req.body.Id
//     let name = req.body.nome
//     let adress = req.body.endereco
//     let phone = req.body.celular
//     let emails = req.body.email


//     //SQL
//     let sql = `UPDATE pessoas SET nome = ?, endereco = ?, celular = ?, email = ? WHERE Id = ?`;
//     conexao.query(sql, [name, adress, phone, emails, Id], function(erro, retorno) {
//         if (erro) {
//             throw erro;
//         } else {
//             console.log(`${name}, ${adress}, ${phone}, ${emails}`);
//         }
//     });
    
//     res.redirect('/view');
    

// })

//EXPRTANDO ARQIVO ROUTES
const routes = require('./src/routes/routes')
app.use(routes)

// Servidor iniciando na porta 8081
app.listen(8081, () => {
    console.log(`Servidor rodando na porta http://localhost:8081/`);
});
