require('dotenv').config();
require('./src/database/connect_db.js');
const { populateDatabase } = require('./src/database/mock/mockItems.js');

if (process.env.NODE_ENV === 'development') {
  populateDatabase();
}

const app = require('./app');

const PORT = process.env.PORT || 3000;

/* eslint-disable-next-line */
app.listen(PORT, () => console.log(`App is listening on http://localhost:${PORT}`));
