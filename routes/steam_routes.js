const express = require('express');
const router = express.Router();
const SteamAPI = require('steamapi');

const dotenv = require('dotenv');
dotenv.config();

const steam = new SteamAPI(process.env.STEAM_API_KEY);

router.get('/get_owned_games', async (req, res) => {
  const steamId = req.user.id;
  try {
    const request = await steam.getUserOwnedGames(steamId);
    res.send(request);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
