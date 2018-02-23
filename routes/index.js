const express = require('express');
const router = express.Router();
const mongooose = require('mongoose');
const Profile = require('../models/profile');

const dataExample = {
  user: 'managerinsta97',
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

router.get('/profile', (req, res) => {
  // const { body } = req;
  const body = dataExample;
  Profile.findOne({ user: body.user }, (err, data) => {
    if (err) handlerError(res, err);
    if (data != null) {
      return res.status(200).send('Invalid user');
    }
    Profile.create(body, (err, profile) => {
      return res.status(201).json(profile);
    });
  })
});

router.get('/update/:user', (req, res) => {
  const { user } = req.params;
})

handlerError = (res, err) => {
  return res.status(500).json({ status: 500, message: err.message });
}

module.exports = router;
