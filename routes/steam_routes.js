const express = require('express');
const router = express.Router();
const SteamAPI = require('steamapi');

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

router.get('/get_game_achievements', async (req, res) => {
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
