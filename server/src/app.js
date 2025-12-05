const express = require('express');
const morgan = require('morgan');
const authRouter = require('./routes/auth.route');
const cookieParser = require('cookie-parser');
const pageRouter = require('./routes/page.route')

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use((req, res, next) => {
  setTimeout(() => next(), 1000);
});

app.use('/api/auth', authRouter);
app.use('/api',pageRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Что-то пошло не так!');
});

module.exports = app;
