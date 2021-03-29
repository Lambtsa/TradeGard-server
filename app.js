const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());

const allowedOrigin = 'http://localhost:3000';

app.use(cors({ origin: allowedOrigin }));

/* eslint-disable-next-line */
app.get('/', (req, res, next) => {
  res.send('Hello');
});

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
