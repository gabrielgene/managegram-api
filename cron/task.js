#!/usr/bin/env node
const amqp = require('amqplib/callback_api');
const mongoose = require('mongoose');
const Profile = require('../models/profile');

const defaultMessage = `{
  "user": "managerinsta97",
  "pass": "insta@123",
  "status": "stop",
  "tag_type": "disable",
  "tag_list": ["hero"],
  "profile_type": "enable",
  "profile_list": ["marvel"]
}`;

const task = () => {
  mongoose.connect('mongodb://172.17.0.4:27017/admin', (err, res) => {
    if (err) throw err;
    console.log('Connected to MongoDB');
  });

  Profile.find({}, (err, profiles) => {
    profiles.forEach(profile => {
      amqp.connect('amqp://127.0.0.1', function (err, conn) {
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
