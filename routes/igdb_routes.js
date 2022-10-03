const express = require('express');
const router = express.Router();
const userModel = require('../models/NewUserModels');
const fetch = require('cross-fetch');

//* IGDB GAME SEARCH
router.post('/search_game', async (req, res) => {
  const token = req.body.token;
  const gameName = req.body.gameName;

  const headers = {
    'Client-ID': 'kr3nccu71yvbuffq6ko4bnokn3kdj1',
    Authorization: `Bearer ${token}`,
  };
  const url = `https://api.igdb.com/v4/games`;
  try {
    const request = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: `fields *, artworks.*, age_ratings.*, name, cover.*, genres.*, involved_companies.*, involved_companies.company.*, release_dates.*, platforms.*, platforms.platform_logo.*, screenshots.*, rating, themes.name, similar_games.*, similar_games.cover.*, similar_games.screenshots.*, similar_games.genres.*, similar_games.platforms.*, similar_games.platforms.platform_logo.*, similar_games.release_dates.*, similar_games.involved_companies.company.name; sort rating_count desc; where name ~ *"${gameName}"* & rating_count > 0 & cover != null & (rating != null & category != (1,3)); limit 100;`,
    });
    const result = await request.json();
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

//* IGDB GAME DETAILS
router.post('/search_game_details', async (req, res) => {
  const token = req.body.token;
  const gameId = req.body.gameId;

  const headers = {
    'Client-ID': 'kr3nccu71yvbuffq6ko4bnokn3kdj1',
    Authorization: `Bearer ${token}`,
  };
  const url = `https://api.igdb.com/v4/games`;
  try {
    const request = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: `fields *, artworks.*, age_ratings.*, name, cover.*, genres.*, involved_companies.*, involved_companies.company.*, release_dates.*, platforms.*, platforms.platform_logo.*, screenshots.*, rating, themes.name, similar_games.*, similar_games.cover.*, similar_games.screenshots.*, similar_games.genres.*, similar_games.platforms.*, similar_games.platforms.platform_logo.*, similar_games.release_dates.*, similar_games.involved_companies.company.name; where id = ${gameId}; limit 1;`,
    });
    const result = await request.json();
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

//* IGDB GAME GENRES
router.post('/game_genre', async (req, res) => {
  const token = req.body.token;
  const genreId = req.body.genreId;

  const headers = {
    'Client-ID': 'kr3nccu71yvbuffq6ko4bnokn3kdj1',
    Authorization: `Bearer ${token}`,
  };
  const url = `https://api.igdb.com/v4/games`;
  try {
    const request = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: `fields *, artworks.*, age_ratings.*, name, cover.*, genres.*, involved_companies.*, involved_companies.company.*, release_dates.*, platforms.*, platforms.platform_logo.*, screenshots.*, rating, themes.name, similar_games.*, similar_games.cover.*, similar_games.screenshots.*, similar_games.genres.*, similar_games.platforms.*, similar_games.platforms.platform_logo.*, similar_games.release_dates.*, similar_games.involved_companies.company.name; sort rating_count desc; where (rating != null & rating_count > 0 & category != (1,5) & themes != 42 & genres = ${genreId}); limit 30;`,
    });
    const result = await request.json();
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

//* IGDB UPCOMING GAME RELEASES
router.post('/upcoming', async (req, res) => {
  const token = req.body.token;
  const currentDate = req.body.currentDate;
  const targetDate = req.body.targetDate;

  const headers = {
    'Client-ID': 'kr3nccu71yvbuffq6ko4bnokn3kdj1',
    Authorization: `Bearer ${token}`,
  };
  const url = `https://api.igdb.com/v4/release_dates`;
  try {
    const request = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: `fields *, game.*, game.cover.*, game.genres.*, game.themes.*, game.platforms.*; sort date asc; where (game.category != (1,2,3) & game.themes != 27 & game.cover != null & date != null & game.hypes != null & category = 0 & date > ${currentDate} & date < ${targetDate}); limit: 150;`,
    });
    const result = await request.json();
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

//* IGDB TRENDING GAMES
router.post('/trending', async (req, res) => {
  const token = req.body.token;
  const currentDate = req.body.currentDate;
  const targetDate = req.body.targetDate;

  console.log(req.body);

  const headers = {
    'Client-ID': 'kr3nccu71yvbuffq6ko4bnokn3kdj1',
    Authorization: `Bearer ${token}`,
  };
  const url = `https://api.igdb.com/v4/release_dates`;
  try {
    const request = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: `fields *, game.*, game.cover.*, game.genres.*, game.themes.*, game.platforms.*; sort date asc; where (game.category != (1,2,3) & game.themes != 27 & game.cover != null & date != null & game.hypes != null & category = 0 & date > ${currentDate} & date < ${targetDate}); limit: 150;`,
    });
    const result = await request.json();
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
