const mongoose = require('mongoose');
const gameGenreModel = new mongoose.Schema({
  genres_list: {
    type: Array,
    required: true,
  },
  last_updated: {
    type: Date,
  },
});

module.exports = mongoose.model('genres', gameGenreModel);
