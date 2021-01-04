var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var user2 = { username: 'bvc', password: '123', level: 'admin' };

var user = { username: 'jcr', password: '456', level: 'consumer' };

/* 
  O user autentica-se com username e password.
  Se as credenciais estiverem corretas um token é gerado
  e enviado como resposta
*/
router.post('/', function (req, res) {
  if (req.body.username == user.username &&
    req.body.password == user.password) {
    //var privateKey = fs.readFile(__dirname + '/../keys/mykey.pem');
    var privateKey = "PRI2020";

    jwt.sign({ username: user.username, level: user.level, sub: 'aula de PRI2020' },
      privateKey, function (err, token) {
        if (err) res.status(500).jsonp({ error: 'Erro na geração de token: ' + err });
        else res.status(201).jsonp({ token: token });
      });
  }
  else {
    res.status(401).jsonp({ error: 'Credenciais inválidas' });
    console.log('Credentials error');
  }
});

module.exports = router;
