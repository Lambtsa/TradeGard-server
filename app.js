const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const api = require('./src/routes');

const app = express();

const allowedOrigin = process.env.NODE_ENV === 'production'
  ? 'https://tradegard.netlify.app'
  : 'http://localhost:3000';

app.use(helmet());
app.use(express.json());
app.use(cors({ origin: allowedOrigin }));
app.use('/api', api);

/* eslint-disable-next-line */
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.statusCode = 404;
  next(error);
});

/* eslint-disable-next-line */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const name = err.name || 'Error';
  res
    .status(statusCode)
    .json({ name, message: err.message });
});

module.exports = app;
