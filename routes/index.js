const express = require('express');
const router = express.Router();
const mongooose = require('mongoose');
const Profile = require('../models/profile');

const dataExample = {
  user: 'managerinsta997',
  pass: 'insta@123',
  status: 'stop',
  tag_type: 'disable',
  tag_list: ['hero', 'food'],
  profile_type: 'disable',
  profile_list: ['marvel', 'facebook']
}

router.get('/', (req, res) => {
  Profile.find({}, (err, data) => {
    console.log(data)
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

handlerError = (res, err) => {
  return res.status(500).json({ status: 500, message: err.message });
}

module.exports = router;
