#!/usr/bin/env node
const amqp = require('amqplib/callback_api');
const mongoose = require('mongoose');
const Profile = require('../models/profile');
const config = require('../config');

const mongohost = process.env.MONGODB_HOST || config.mongo.uri;
const mongodb = process.env.MONGODB_DB || config.mongo.db;

const dm = () => {
  mongoose.connect(`mongodb://${mongohost}:27017/${mongodb}`, (err, res) => {
    if (err) throw err;
    console.log('Connected to MongoDB');
  });

  Profile.find({}, (err, profiles) => {
    profiles.filter(profile => profile.status !== 'stop').forEach(profile => {
      amqp.connect('amqp://127.0.0.1', function (err, conn) {
        conn.createChannel(function (err, ch) {
          const q = 'dm_queue';
          const msg = JSON.stringify(profile);

          ch.assertQueue(q, { durable: true });
          ch.sendToQueue(q, new Buffer(msg), { persistent: true });
          console.log(" [x] Sent '%s'", msg);
        });
        setTimeout(function () { conn.close(); }, 500);
      });
    })
  });
}

dm();
module.exports = dm;
