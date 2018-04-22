#!/usr/bin/env node
const amqp = require('amqplib/callback_api');
const mongoose = require('mongoose');
const Profile = require('../models/profile');
const config = require('../config');

const mongohost = config.mongo.uri;
const mongodb = config.mongo.db;
const rabbithost = config.rabbit.uri;

const task = () => {
  mongoose.connect(`mongodb://${mongohost}:27017/${mongodb}`, (err, res) => {
    if (err) throw err;
    console.log('Connected to MongoDB');
  });

  Profile.find({ enable_account: true, service_on: true, verified_account: true }, (err, profiles) => {
    if (err) throw err;
    if (profiles.length === 0) {
      console.log('Dont have profiles');
      return 0
    };
    profiles.forEach(profile => {
      amqp.connect(`amqp://${rabbithost}`, function (err, conn) {
        conn.createChannel(function (err, ch) {
          const q = 'task_queue';
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

module.exports = task;
