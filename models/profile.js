const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  profileId: {type: String},
  user: {type: String, unique: true, required: true, dropDups: true},
  pass: {type: String},
  userId: {type: String},
  uuid: {type: String},
  insta_user: {type: String},
  insta_pass: {type: String},
  status: {type: String},
  tag_type: {type: String},
  tag_list: {type: Array},
  profile_type: {type: String},
  profile_list: {type: Array},
  dm_type: {type: String},
  dm_message: {type: String},
  last_follower: {type: String}
});

module.exports = mongoose.model('Profile', ProfileSchema);
