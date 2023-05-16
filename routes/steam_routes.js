const express = require('express');
const router = express.Router();
const SteamAPI = require('steamapi');
const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

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
  console.log('HERE');

  try {
    const request = await axios.get(
      'https://www.behindthevoiceactors.com/top-listings/?type=pop_game_weekly'
    );
    // const request = await axios.get(
    //   'https://www.npd.com/news/entertainment-top-10/2023/top-10-video-games/'
    // );
    const result = request.data;

    const $ = cheerio.load(result);

    // Only grab name of game from each row
    // const games = $('table > tbody > tr > td:nth-child(3)');
    const games = $(
      '#top_listings > tbody > tr:nth-child(2) > td:nth-child(2) > a > b'
    );

    const tags = [];

    // Grab every
    games.each((_idx, el) => {
      tags.push($(el).text());
    });

    res.send(tags.slice(0, 10));
    return;
  } catch (error) {
    res.send(error);
  }
});

const getNewReleases = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  // Open a new page and wait until Gamestop new releases are loaded into DOM
  const page = await browser.newPage();

  await page.goto('https://www.gamestop.com/collection/new-releases', {
    waitUntil: 'domcontentloaded',
  });

  const games = await page.evaluate(() => {
    // Fetch the first element with class "quote"
    const gameList = document.querySelectorAll(
      '#catlanding-new-releases > div:nth-child(1) > div:nth-child(3) > div > div > div > div > div > div > div.carousel-4up.has-grid.card-carousel > div'
    );

    // Fetch the sub-elements from the previously fetched quote element
    // Get the displayed text and return it (`.innerText`)
    return Array.from(gameList).map((game) => {
      const link = game.querySelector('a').getAttribute('href');
      return { link };
    });
  });

  const nameValues = games.map(async (element) => {
    const searchPage = await browser.newPage();
    // If it's only available on 1 console, the link will be complete otherwise
    // the link needs to be revised into complete URL
    if (element.link[0] == '/') {
      element.link = 'https://www.gamestop.com' + element.link;
    }
    await searchPage.goto(element.link);

    let selector;
    // If it's only available on 1 console, the link will automatically take you
    // to the product page, requiring a different DOM Selector
    if (element.link.substring(element.link.length - 4) == 'html') {
      selector =
        '#primary-details > div.mobile-selection.product-details-top-desktop > div.product-name-section > h2';
    } else {
      selector =
        '#product-search-results > div.align-items-start.flex-nowrap.flex-column.flex-md-row > div > div.row.product-grid > div.row.infinitescroll-results-grid.product-grid-redesign.wide-tiles > div:nth-child(2) > div > div > div.d-flex.flex-column.full-height.justify-content-between > div.tile-body > div > a > div > p';
    }

    const newGameName = await searchPage.waitForSelector(selector);
    return await newGameName.evaluate(async (el) => {
      const value = el.textContent.split('-')[0].trim();
      // await searchPage.close();
      return { value };
    });
  });

  return nameValues;
};

router.get('/new_releases', async (req, res) => {
  // Fetch and scrape all games from meta list
  try {
    const request = await getNewReleases();
    console.log(request);
    res.send(request);
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
