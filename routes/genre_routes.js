const genreModel = require('../models/GameGenreModel');
const express = require('express');
const router = express.Router();

router.get('/game_genres', async (req, res) => {
  const result = await genreModel.find();
  res.send(result);
  return;
});

router.post('/update_genre_info', async (req, res) => {
  const id = req.body.genreId;
  // Determine whether or not email exists in database
  const request = await genreModel.findOne({ genreId: id });
  console.log(request);
  return;
});

module.exports = router;
