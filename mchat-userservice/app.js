var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');

var userRouter = require("./routes/userRouter");

var app = express();

app.use(logger('dev'));
app.use(express.json()); // parsing application/json
app.use(express.urlencoded({ extended: false })); // parsing application/x-www-form-urlencoded

/**
 * 用户服务
 */
app.use("/user", userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

module.exports = app;
