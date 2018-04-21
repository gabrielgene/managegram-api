const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const mongohost = process.env.MONGODB_HOST || config.mongo.uri;
const mongodb = process.env.MONGODB_DB || config.mongo.db;

mongoose.connect(`mongodb://${mongohost}:27017/${mongodb}`, (err, res) => {
  if (err) throw err;
  console.log('Connected to MongoDB');
});

const app = express();

app.use(cookieParser());

app.use(express.static('static'));

app.get('/health', (req, res) => res.sendStatus(200));

app.use('/api', cors(), bodyParser.json(), require('./routes'));

app.use(express.static(path.join(__dirname, 'client/build')));

// Always return the main index.html, so react-router render the route in the client
app.get(/.*/, (req, res) => {
  return res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'));
});

app.set('port', process.env.PORT || config.app.port);

app.listen(app.get('port'), () => {
  console.log(`service RESTful API server started oon: ${app.get('port')}`);
});
