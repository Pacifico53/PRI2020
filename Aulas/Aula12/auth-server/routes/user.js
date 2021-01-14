var express = require('express');
var router = express.Router();
var User = require('../controllers/user');

var jwt = require('jsonwebtoken');

var passport = require('passport')

router.get('/logout', function (req, res) {
  req.logout();
  req.session.destroy(function (err) {
    if (!err) {
      res.redirect('/');
    } else {
      console.log('Destroy session error: ', err)
    }
  });
});

router.post('/', function (req, res) {
  User.inserir(req.body)
    .then(dados => res.status(201).jsonp({ data: dados }))
    .catch(e => res.status(500).jsonp({ error: "Erro: " + e }))
});

router.get('/', function (req, res) {
  User.listar()
    .then(dados => res.status(201).jsonp({ data: dados }))
    .catch(e => res.status(500).jsonp({ error: "Erro: " + e }))
});

router.post('/login', passport.authenticate('local'), function (req, res) {
  jwt.sign({
    username: req.user.username, level: req.user.level,
    sub: 'aula de PRI'
  },
    "PRI2020",
    function (e, token) {
      if (e) {
        res.status(500).jsonp({ error: "erro na geraçao do token: " + e })
      }
      else {
        res.status(201).jsonp({ token: token })
      }
    })
})

module.exports = router;