var express = require('express');
const passport = require('passport');
var router = express.Router();
var User = require('../controllers/user')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', function (req, res, next) {
  res.render('login-form');
});

router.get('/logout', function (req, res, next) {
  req.logout();
  res.redirect('/');
});

router.get('/register', function (req, res, next) {
  res.render('register-form');
});

router.post('/login', passport.authenticate('local'),
  function (req, res, next) {
    console.log('Na cb do post login');
    console.log('Auth: ' + JSON.stringify(req.user));
    console.log(req.body);
    res.redirect('/protegida');
  });

router.post('/register', function (req, res, next) {
  User.insert(req.body)
    .then(dados => res.redirect('/'))
    .catch(erro => res.render('error', { error: erro }))
});

router.get('/:id', function (req, res, next) {
  User.lookUp(req.params.id)
    .then(dados => res.status(200).jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
});

module.exports = router;
