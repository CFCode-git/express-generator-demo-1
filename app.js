const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const createError = require('http-errors');
const logger = require('./utils/loggers/logger');
const errorHandler = require('./middlewares/http_server_handler');
require('./services/mongodb_connection');
const NotFoundError = require('./errors/http_errors/resource_not_found_error');

const apiRouter = require('./routes/api');
// const usersRouter = require('./routes/api/users');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieSession({
  name: 'demo_session',
  keys: ['laskdjhfaslkdjfhalskdhjf'],
  maxAge: 86400,
}));

app.use('/api', apiRouter);
// app.use('/users', usersRouter);

app.use((req, res, next) => {
  if (!res.headersSent) {
    next(new NotFoundError(req.method, req.path, '没有找到您要的资源哦'));
  }
});

app.use(errorHandler());

process.on('uncaughtException', (err) => {
  logger.error('uncaught exception', { err });
});
process.on('unhandledRejection', (reason, p) => {
  logger.error('unhandled rejection', { reason, p });
});

module.exports = app;
