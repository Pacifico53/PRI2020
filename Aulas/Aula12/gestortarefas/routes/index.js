var express = require('express');
var router = express.Router();
var axios = require('axios');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

router.get('/login', function (req, res, next) {
  res.render('login-form');
});

router.post('/login', function (req, res, next) {
  axios.post('http://localhost:8002/users/login', req.body)
    .then(dados => {
      localStorage.setItem('myToken', dados.data.token);
      res.redirect('/tarefas')
    })
    .catch(e => res.render('error', { error: e }))
});

router.get('/tarefas', function (req, res, next) {
  var t = localStorage.getItem('mytoken');
  axios.get('http://localhost:8001/tarefas?token=' + t)
    .then(dados => res.render('tarefas', {tarefas: dados.data}))
    .catch(e => res.render('error', { error: e }))
});



module.exports = router;
