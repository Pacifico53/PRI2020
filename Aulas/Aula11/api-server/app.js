var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');
var jwt = require('jsonwebtoken');

var indexRouter = require('./routes/index');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(function (req, res, next) {
  jwt.verify(req.query.token, 'PRI2020', function (err, payload) {
    if (err) res.status(401).jsonp({ error: 'Erro na verificaçao token: ' + err })
    else {
      req.user = {
        level: payload.level,
        username: payload.username
      }
      next();
    }
  })
})

app.use('/', indexRouter);

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
  res.status(err.status || 500).jsonp({ error: err.message });
});

module.exports = app;
