const express = require('express');
const bodyParser = require('body-parser');

// initialize .env variables first
require('dotenv').config();

const app = express();

const port = process.env.SERVER_PORT;

// middlewares
app.use(bodyParser.json());

// configure header
app.use((req, res, next) => {
  const hostOrigin = req.headers.origin;
  res.header('Access-Control-Allow-Origin', hostOrigin);
  next();
});

// api routes
app.use('/', require('./routes'));

// all other routes return a static page
app.get('*', (req, res) => {
  res.send('404 Page Not Found');
});

app.listen(port, () => console.log(`\nServer started on port ${port}.\n`));
