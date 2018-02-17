const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');

const mongohost = process.env.MONGODB_HOST || config.mongo.uri;
const mongodb = process.env.MONGODB_DB || config.mongo.db;

mongoose.connect('mongodb://172.17.0.4:27017/admin', (err, res) => {
  if (err) throw err;
  console.log('Connected to MongoDB');
});

const app = express();

app.use(bodyParser.json());

app.all('/*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET, PATCH, OPTIONS, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", "true");
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

app.use('/', require('./routes'));

app.use((req, res, next) => {
  res.status(404);
  next();
});

app.set('port', process.env.PORT || config.app.port);

app.listen(app.get('port'), () => {
  console.log(`service RESTful API server started on: ${app.get('port')}`);
})
