require('dotenv').config();
require('./src/database/connect_db.js');

if (process.env.NODE_ENV === 'development') {
  require('./src/database/mock/mockItems.js');
};

const app = require('./app');

const PORT = process.env.PORT || 3000;

/* eslint-disable-next-line */
app.listen(PORT, () => console.log(`App is listening on http://localhost:${PORT}`));
