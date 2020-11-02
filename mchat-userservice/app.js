var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');
var fs = require('fs');
var path = require('path');
var userRouter = require("./routes/userRouter");

var app = express();

var accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), {flags: "a"});

app.use(logger("short", {stream: accessLogStream}));
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
