/* eslint-disable no-console */
const mongoose = require('mongoose');

const uri = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_URL}/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const connectedDb = mongoose.connection;

connectedDb.on('connected', () => console.log('MongoDB: connected to database.'));
connectedDb.on('error', error => console.log(`MongoDB: ${error.message}.`));
connectedDb.on('disconnected', () => console.log('MongoDB: disconnected.'));

process.on('SIGINT', () => {
  connectedDb.close(() => {
    console.log('MongoDB: Connection closed.');
    process.exit(0);
  });
});
