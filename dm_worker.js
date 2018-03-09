#!/usr/bin/env node
const amqp = require('amqplib/callback_api');
const mongoose = require('mongoose');
const Profile = require('./models/profile');
const Client = require('instagram-private-api').V1;
const config = require('./config');

const mongohost = process.env.MONGODB_HOST || config.mongo.uri;
const mongodb = process.env.MONGODB_DB || config.mongo.db;

amqp.connect('amqp://'+process.env.RABBIT_URI, function (err, conn) {
  conn.createChannel(function (err, ch) {
    const q = 'dmlist_queue';

    ch.assertQueue(q, { durable: true });
    ch.prefetch(1);
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
    ch.consume(q, function (msg) {
      const message = msg.content.toString()
      const data = JSON.parse(message);
      const user = data.insta_user;
      const pass = data.insta_pass;
      const limit = 0;

      mongoose.connect(`mongodb://${mongohost}:27017/${mongodb}`, (err, res) => {
        if (err) throw err;
        console.log('Connected to MongoDB');
      });
      Profile.findOne({ user: data.user }, (err, profile) => {
        if (err) throw err;
        const last_follower = profile.last_follower
        if (last_follower === data.followers_list[0]) {
          console.log('DM has already been sent to the last follower.');
        } else {
          data.followers_list.every((follow, idx) => {
            if (follow === last_follower || idx > limit) {
              Profile.findOneAndUpdate(
                { user: data.user },
                { last_follower: data.followers_list[0] },
                (err, profile) => {
                  console.log('Updating last follower: ', data.followers_list[0]);
                }
              );
              return false
            } else {
              console.log('Sending DM to: ', follow);
              setTimeout(() => console.log('Sleep...'), 4000);
              const storage = new Client.CookieMemoryStorage();
              const device = new Client.Device(user);

              Client.Session.create(device, storage, user, pass)
                .then(function (session) {
                  return [session, Client.Account.searchForUser(session, follow)]
                })
                .spread(function (session, account) {
                  console.log("Sending message...");
                  return Client.Thread.configureText(session, account.id, data.dm_message)
                })
                .then(function (data) {
                  console.log(" [x] Received %s", msg.content.toString());
                  setTimeout(function () {
                    console.log(" [x] Done");
                    ch.ack(msg);
                  }, 1000);
                })
              return true;
            }
          });
        }
      });
      console.log(" [x] Received %s", msg.content.toString());
      setTimeout(function () {
        console.log(" [x] Done");
        ch.ack(msg);
      }, 1000);
    }, { noAck: false });
  });
});
