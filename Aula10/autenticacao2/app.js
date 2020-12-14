var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var User = require('./controllers/user')

const { v4: uuidv4 } = require('uuid');
var session = require('express-session');
var FileStore = require('session-file-store')(session)

var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy

var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/PRI2020auth';
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error...'));
db.once('open', function () {
  console.log("Conexao ao MongoDB realizada com sucesso...")
});

passport.use(new LocalStrategy(
  { usernameField: 'id' }, function (id, password, done) {
    User.lookUp(id)
      .then(dados => {
        console.log(dados);
        const user = dados
        if (!user) { return done(null, false, { message: 'Utilizador inexistente!\n' }) }
        if (password != user.password) { return done(null, false, { message: 'Crendenciais invalidas!\n' }) }
        return done(null, user)
      })
      .catch(erro => done(erro))
  }
))

passport.serializeUser((user, done) => {
  console.log('Vou serializar o user na sessao: ' + JSON.stringify(user))
  done(null, user.id)
})

passport.deserializeUser((uid, done) => {
  console.log('Vou desserializar o user:' + uid)
  User.lookUp(uid)
    .then(dados => done(null, dados))
    .catch(erro => done(erro, false))
})

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(session({
  genid: req => {
    console.log('Dendro do middleware da sessao...')
    console.log(req.sessionID)
    return uuidv4()
  },
  secret: 'segredo de PRI2020',
  store: new FileStore(),
  resave: false,
  saveUninitalized: true
}))




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());


app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
