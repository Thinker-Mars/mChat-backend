const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const userRouter = require('./routes/userRouter');

const app = express();

app.use(logger('dev')); // logger
app.use(express.json()); // parsing application/json
app.use(express.urlencoded({ extended: false })); // parsing application/x-www-form-urlencoded

/**
 * 用户服务
 */
app.use('/userCenter', userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

module.exports = app;
