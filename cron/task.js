#!/usr/bin/env node
const amqp = require('amqplib/callback_api');

const defaultMessage = `{
  "user": "managerinsta97",
  "pass": "insta@123",
  "status": "stop",
  "tag_type": "disable",
  "tag_list": ["hero"],
  "profile_type": "enable",
  "profile_list": ["marvel"]
}`;

const task = (msg = defaultMessage) => {
  amqp.connect('amqp://127.0.0.1', function (err, conn) {
    conn.createChannel(function (err, ch) {
      const q = 'task_queue';

      ch.assertQueue(q, { durable: true });
      ch.sendToQueue(q, new Buffer(msg), { persistent: true });
      console.log(" [x] Sent '%s'", msg);
    });
    setTimeout(function () { conn.close(); }, 500);
  });
}

module.exports = task;
