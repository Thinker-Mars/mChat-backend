let createError = require('http-errors');
let express = require('express');
let logger = require('morgan');

let socketRouter = require("./routes/socket");

let app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.io = socketRouter.io;

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

module.exports = app;
