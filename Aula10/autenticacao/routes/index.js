var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  console.log('CB da homepage: ' + req.sessionID)
  res.render('index');
});

/* GET home page. */
router.get('/protegida', verificaAutenticaçao, function (req, res, next) {
  console.log('CB da area protegida: ' + req.sessionID)
  res.render('protegida');
});

function verificaAutenticaçao(req, res, next) {
  console.log('User (verif.): ' + JSON.stringify(req.user));
  if (req.isAuthenticated()) {
    next();
  }
  else {
    res.redirect('/users/login');
  }
}

module.exports = router;
