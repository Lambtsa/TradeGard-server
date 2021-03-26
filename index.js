require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 3000;

/* eslint-disable-next-line */
app.listen(PORT, () => console.log(`App is listening on http://localhost:${PORT}`));
