const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');

const msgRouter = require("./routes/msgRouter");

let app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/msgCenter", msgRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

module.exports = app;
