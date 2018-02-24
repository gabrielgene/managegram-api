const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');
const path = require('path');
const cors = require('cors');

const mongohost = process.env.MONGODB_HOST || config.mongo.uri;
const mongodb = process.env.MONGODB_DB || config.mongo.db;

mongoose.connect('mongodb://172.17.0.2:27017', (err, res) => {
  if (err) throw err;
  console.log('Connected to MongoDB');
});

const app = express();

app.get('/', (req, res) => {
  res.status(200).send('Ok');
})

app.use('/api', cors(), bodyParser.json(), require('./routes'));

// app.use(express.static(path.join(__dirname, 'client/build')));

// app.get('/app', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
// });

app.set('port', process.env.PORT || config.app.port);

app.listen(app.get('port'), () => {
  console.log(`service RESTful API server started on: ${app.get('port')}`);
});
