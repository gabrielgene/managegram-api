const express = require('express');
const router = express.Router();
const mongooose = require('mongoose');
const Profile = require('../models/profile');
const md5 = require('blueimp-md5');
const Client = require('instagram-private-api').V1;
const fs = require('fs');

const dataExample = {
  user: 'mmanagerinsta97',
  pass: 'insta@123',
  status: 'start',
  tag_type: 'enable',
  tag_list: ['hero'],
  profile_type: 'enable',
  profile_list: ['marvel'],
  dm_type: 'enable',
  dm_message: 'Olá, se chegou é pq funcionou.',
  last_follower: ''
}

router.get('/', (req, res) => {
  return res.status(200).send('Ok');
});

router.get('/all', (req, res) => {
  Profile.find({}, (err, data) => {
    return res.status(200).json(data);
  });
});

router.post('/login', (req, res) => {
  const { body } = req;
  const { user, pass } = body;
  const userId = md5(user);
  const userData = {
    ...body,
    userId,
  };

  Profile.findOne({ user, pass }, (err, data) => {
    if (err) handlerError(res, err);
    if (data !== null) {
      res.cookie('userId', userId, { maxAge: 900000 });
      return res.status(200).send('Logado');
    }

    Profile.findOne({ user }, (err, data) => {
      if (err) handlerError(res, err);
      if (data !== null) {
        return res.status(409).send('Usuario existente');
      }

      Profile.create(userData, (err, profile) => {
        if (err) handlerError(res, err);
        res.cookie('userId', userId, { maxAge: 900000 });
        return res.status(201).send('Criado');
      });
    });
  });
});

router.get('/verify', (req, res) => {
  const { userId } = req.cookies;

  Profile.findOne({ userId }, (err, data) => {
    if (err) handlerError(res, err);
    if (data !== null) {
      return res.status(200).json(data);
    }
    return res.status(403).send('Forbidden');
  })
});

router.post('/update', (req, res) => {
  const { userId } = req.cookies;
  const { body } = req;
  Profile.findOneAndUpdate(
    {
      userId,
    },
    {
      ...body,
    },
    (err, data) => {
      if (err) handlerError(res, err);
      if (data !== null) {
        return res.status(200).json(data);
      }
    }
  )
});

router.post('/instaverify', (req, res) => {
  res.connection.setTimeout(7000);
  const { body } = req;
  const { user, pass } = body;
  const storage = new Client.CookieMemoryStorage();
  const device = new Client.Device(user);
  console.log('Request', user);
  Client.Session.create(device, storage, user, pass)
    .then(function (session) {
      session.getAccountId()
        .then(function (id) {
          return res.status(200).send('ok');
        });
    });
});

handlerError = (res, err) => {
  return res.status(500).json({ status: 500, message: err.message });
}

module.exports = router;
