const mongoose = require('mongoose');
const gameGenreModel = new mongoose.Schema({
  genreId: {
    type: Number,
    required: true,
  },
  genreName: {
    type: String,
    required: true,
  },
  genreList: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model('genres', gameGenreModel);
