//DELCARAND CONSTANTE DO MYSQL2
const mysql = require('mysql2')

const express = require('express')


const app = express()

//CONFIGURAÇÃO DE CONEXÃO
const conexao = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'1234',
    database:'usuarios'
})


//ROTA INICIAL
exports.home = (req,res) =>{
    res.render('cadastro')
}

//EXPORTS PARA ENVIAR OS DADOS DO USUARIO FORNECIDO
exports.enviar=(req,res) =>{
    let name =req.body.nome
    let adress = req.body.endereco
    let phone = req.body.celular
    let emails = req.body.email

    //SQL
    let sql = `INSERT INTO pessoas (nome,endereco,celular,email) VALUES ('${name}', '${adress}', '${phone}',' ${emails}')`

    //QUERY
    conexao.query(sql, function(erro , retorno){
        if (erro){
            console.error('Erro:',erro)
        }else{
            console.log('Usuario Criado com sucesso')
            res.redirect('/view')
        }

        
    })
}

//LOGICA DA ROTA PARA DELETAR
exports.deletar = (req,res) =>{
    //console.log(`O usuario com nome ${req.params.nome} foi deletado com sucesso`)
    //res.end()
    //SQL
    let sql = `DELETE FROM pessoas WHERE nome = '${req.params.nome}'`
    
    //EXECUTAR O COMANDO    
    conexao.query(sql, function(erro, retorno){
        if (erro){
            throw erro
        } 
        res.redirect('/view') 
        
    })
   
}

//EXPORTS DE VISUALZIAR CADASTROS
exports.visualizar = (req,res) =>{
    let sql = `SELECT * FROM pessoas`
    
    //EXECUTAR COMANDO SQL
    conexao.query(sql, function(erro, retorno){
    res.render('visualizar', {pessoas:retorno})
})}

//LOGICA DA ROTA PARA IR PARA O FRONT DE EDIÇÃO
exports.editar= (req,res) =>{
     //SQL
     let sql = `SELECT * FROM pessoas WHERE nome = '${req.params.nome}'`

     //EXECUTAR COMANDO
     conexao.query(sql, function(erro, retorno){
         if (erro) throw erro
 
         res.render('formularioeditar', {pessoas:retorno[0]})
     })
}

//LOGICA PARA ALTERAÇÃO DOS DADOS METODO POST
exports.edicao =(req,res) =>{
    let Id = req.body.Id
    let name = req.body.nome
    let adress = req.body.endereco
    let phone = req.body.celular
    let emails = req.body.email


    //SQL
    let sql = `UPDATE pessoas SET nome = ?, endereco = ?, celular = ?, email = ? WHERE Id = ?`;
    conexao.query(sql, [name, adress, phone, emails, Id], function(erro, retorno) {
        if (erro) {
            throw erro;
        } else {
            console.log(`Dados atualizados ${name}, ${adress}, ${phone}, ${emails}`);
        }
    });
    
    res.redirect('/view');
}