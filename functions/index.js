const functions = require('firebase-functions');
const admin = require('firebase-admin');
const parse = require('body-parser');

admin.initializeApp();

require('dotenv').config();
const express = require('express');
const path = require('path');
const expressStaticGzip = require('express-static-gzip');

const app = express();

const router = require('./routes');

const PORT = 3000 || process.env.PORT;

// app.use(express.static('client/dist')); // serve up the static files like index.html
app.use('/', expressStaticGzip('client/dist', { enableBrotli: true }));
app.use(express.json());
app.use('', router);

app.get('/test', (req, res) => {
  res.send(`Hello World ${PORT}`);
});

// Fall back to routes on front-end from React Router
app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, '../', 'client', 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

exports.app = functions.https.onRequest(app);
