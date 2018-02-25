const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {type: String, unique: true, required: true, dropDups: true},
  pass: {type: String},
  userId: {type: String},
  insta_user: {type: String, default: ''},
  insta_pass: {type: String, default: ''},
  service_on: {type: Boolean, default: true},
  tag_type: {type: Boolean, default: false},
  tag_list: {type: Array},
  profile_type: {type: Boolean, default: false},
  profile_list: {type: Array, default: []},
  dm_type: {type: Boolean, default: false},
  dm_message: {type: String, default: ''},
  verified_account: {type: Boolean, default: false},
  enable_account: {type: Boolean, default: false},
  last_follower: {type: String, default: ''},
});

module.exports = mongoose.model('Profile', ProfileSchema);
