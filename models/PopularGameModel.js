const mongoose = require('mongoose');
const popularGameTemplate = new mongoose.Schema({
  popular_games_list: {
    type: Array,
    required: true,
  },
  last_updated: {
    type: Date,
    required: false,
  },
});

module.exports = mongoose.model('popular_games', popularGameTemplate);
