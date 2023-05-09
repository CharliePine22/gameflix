const mongoose = require('mongoose');
const newUserTemplate = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: 'black',
  },
  avatar: {
    type: String,
  },
  profiles: {
    type: Array,
    default: [],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('users', newUserTemplate);
