const express = require('express');
const router = express.Router();
const SteamAPI = require('steamapi');

const dotenv = require('dotenv');
dotenv.config();

const steam = new SteamAPI(process.env.STEAM_API_KEY);

router.get('/get_owned_games', async (req, res) => {
  if (req.user.id == undefined) {
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

router.get('/get_game_stats', async (req, res) => {
  const steamId = req.user.id;
  const gameId = req.query.gameId;

  try {
    const request = await steam.getUserStats(steamId, gameId);
    // console.log(request);
    res.send(request);
    return;
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
