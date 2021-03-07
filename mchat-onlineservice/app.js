const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');

const socketRouter = require('./routes/socketRouter');
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.io = socketRouter.io;

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

module.exports = app;
