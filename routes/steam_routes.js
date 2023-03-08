const express = require('express');
const router = express.Router();
const SteamAPI = require('steamapi');
const axios = require('axios');
const cheerio = require('cheerio');

const dotenv = require('dotenv');
dotenv.config();

const steam = new SteamAPI(process.env.STEAM_API_KEY);

// Grab user's Steam Library
router.get('/get_owned_games', async (req, res) => {
  if (req.user == undefined) {
    res.send('Error, please authenticate with steam!');
    return;
  }
  const steamId = req.user.id;
  try {
    const request = await steam.getUserOwnedGames(steamId);
    res.send(request);
  } catch (error) {
    res.send(error);
  }
});

router.get('/steam_trending', async (req, res) => {
  // Fetch and scrape currently trending games
  try {
    const request = await axios.get(
      'https://www.npd.com/news/entertainment-top-10/2023/top-10-video-games/'
    );
    const result = request.data;
    const $ = cheerio.load(result);

    // Only grab name of game from each row
    const games = $('table > tbody > tr > td:nth-child(3)');
    const tags = [];

    // Grab every
    games.each((_idx, el) => {
      tags.push($(el).text());
    });

    res.send(tags.slice(0, 10));
    // res.json(result);
    return;
  } catch (error) {
    res.send(error);
  }
});

router.get('/new_releases', async (req, res) => {
  // Fetch and scrape all games from meta list
  try {
    const gamestop_request = await axios.get(
      'https://www.gamestop.com/collection/new-releases'
    );
    const gamestop_res = await gamestop_request.data;
    const $ = cheerio.load(gamestop_res);

    // Only grab name of game from each row
    const games = $(
      '#catlanding-new-releases > div:nth-child(1) > div:nth-child(3) > div > div > div > div > div > div > div.carousel-4up.has-grid.card-carousel > div'
    );

    const tags = [];

    // Grab every
    games.each((_idx, el) => {
      tags.push($(el));
    });
    res.send(tags.slice(0, 10));
    console.log(tags.slice(0, 10));
    return;
  } catch (error) {
    res.send(error);
  }
});

router.get('/get_steam_achievements', async (req, res) => {
  const steamId = req.query.steamId;
  const gameId = req.query.gameId;

  try {
    const request = await steam.getUserAchievements(steamId, gameId);
    res.send(request);
    return;
  } catch (error) {
    res.send(error);
  }
});

router.get('/get_game_stats', async (req, res) => {
  const gameId = req.query.gameId;

  try {
    const request = await steam.getGameSchema(gameId);
    res.send(request);
    return;
  } catch (error) {
    res.send(error);
  }
});

router.get('/get_game_news', async (req, res) => {
  const gameId = req.query.gameId;

  try {
    const request = await steam.getGameNews(gameId);
    res.send(request);
    return;
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
