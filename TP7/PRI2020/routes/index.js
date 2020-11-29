var express = require('express');
var router = express.Router();

const Aluno = require('../controllers/aluno')

//GET home page
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Turma PRI de 2020'
    });
});

//GET pagina de lista alunos
router.get('/alunos', (req, res) => {
    Aluno.listar()
        .then(dados => res.render('alunos', {
            lista: dados
        }))
        .catch(e => res.render('error', {
            error: e
        }))
})

//GET pagina de registo de novo aluno
router.get('/alunos/registar', (req, res) => {
    res.render('registo');
})

//POST regista novo aluno
router.post('/registar', (req, res) => {
    var al = {
        Número: req.body.Número,
        Nome: req.body.Nome,
        Git: req.body.Git
    }
    Aluno.inserir(al)
        .then(dados => res.redirect('/alunos'))
        .catch(e => res.render('error', {
            error: e
        }))
})

// GET da página de adição de aluno
router.get('/alunos/update/:idAluno', (req, res) => {
    Aluno.consultar(req.params.idAluno)
        .then(dados => res.render('editar', {
            infoaluno: dados
        }))
        .catch(e => res.render('error', {
            error: e
        }))
})

//GET pagina aluno individual
router.get('/alunos/:idAluno', (req, res) => {
    var idAluno = req.params.idAluno;
    Aluno.consultar(idAluno)
        .then(dados => res.render('aluno', {
            infoaluno: dados
        }))
        .catch(e => res.render('error', {
            error: e
        }))
})

// POST para atualizar aluno
router.post("/alunos/:idAluno", function(req, res) {
    Aluno.atualizar(req.params.idAluno, req.body)
        .then(dados => {
            res.render('index')
        })
        .catch(e => res.render('error', {
            error: e
        }))
})

// DELETE aluno usando POST (funciona html)
router.post("/delete/:idAluno", function(req, res) {
    Aluno.eliminar(req.params.idAluno)
        .then(dados => {
            res.render('deleted')
        })
        .catch(e => res.render('error', {
            error: e
        }))
})

// DELETE aluno (rota delete que nao funciona com html)
router.delete("/alunos/:idAluno", function(req, res) {
    Aluno.eliminar(req.params.idAluno)
        .then(dados => {
            res.render('deleted')
        })
        .catch(e => res.render('error', {
            error: e
        }))
})

module.exports = router;
