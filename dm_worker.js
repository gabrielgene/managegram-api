#!/usr/bin/env node
const amqp = require('amqplib/callback_api');
const mongoose = require('mongoose');
const Profile = require('./models/profile');
const Client = require('instagram-private-api').V1;

amqp.connect('amqp://localhost', function (err, conn) {
  conn.createChannel(function (err, ch) {
    var q = 'dmlist_queue';

    ch.assertQueue(q, { durable: true });
    ch.prefetch(1);
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
    ch.consume(q, function (msg) {
      const message = msg.content.toString()
      const data = JSON.parse(message);
      const user = data.user;
      const pass = data.pass;
      const limit = 0;

      data.followers_list.forEach((follow, idx) => {

        if (idx <= limit) {

          var storage = new Client.CookieFileStorage(__dirname + '/cookies/' + user + '.json');
          var device = new Client.Device(user);

          Client.Session.create(device, storage, user, pass)
            .then(function (session) {
              // Now you have a session, we can follow / unfollow, anything...
              // And we want to follow Instagram official profile
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

          last_follower_name = data.followers_list[idx]
        }

      });

    }, { noAck: false });
  });
});
