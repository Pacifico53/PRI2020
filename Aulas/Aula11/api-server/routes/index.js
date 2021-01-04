var express = require('express');
var router = express.Router();

function verificaNivel(a, b) {
  return a == b;
}

/*
  Stuff
*/
router.get('/', function (req, res) {
  res.status(200).jsonp({ dados: "lista de qq coisa" });
});

router.get('/secret', function (req, res) {
  if (verificaNivel('admin', req.user.level)) {
    res.status(200).jsonp({ dados: "lista de qq coisa SECRETA!" });
  }
  else {
    res.status(401).jsonp({ error: "Nao tem nivel para esta rota" });
  }
});

module.exports = router;
