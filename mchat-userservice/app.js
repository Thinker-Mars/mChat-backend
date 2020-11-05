let createError = require('http-errors');
let express = require('express');
let logger = require('morgan');
let userRouter = require("./routes/userRouter");

let app = express();

app.use(logger("dev")); // logger
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
