var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');

var msgRouter = require("./routes/msgRouter");

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("msgCenter", msgRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

module.exports = app;
