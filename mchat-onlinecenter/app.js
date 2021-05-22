const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');

const onlineRouter = require('./routes/onlineRouter');
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.io = onlineRouter.io;

app.use('/onlineCenter/connect', onlineRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

module.exports = app;
