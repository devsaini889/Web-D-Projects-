const mongoose = require('mongoose');
require('dotenv').config();

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: [true, 'Name must be unique']
  },
    email: {
    type: String,
    required: true,
    unique: [true, 'Email is used by another user']
  },
    password: {
    type: String,
    required: true
  },


});

const UserModel = mongoose.model('UserModel', userSchema);

module.exports = UserModel;