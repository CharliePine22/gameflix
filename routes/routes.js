const express = require('express');
const router = express.Router();
const userModel = require('../models/NewUserModels');
const multer = require('multer');
const spotifyWebApi = require('spotify-web-api-node');
// const fs = require('fs');
// const path = require('path');
const fetch = require('cross-fetch');
const { findOneAndUpdate } = require('../models/NewUserModels');
// const { connected } = require('process');

// Transform upload file into DB Object String
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    if (['image/png', 'image/jpg', 'image/jpeg'].includes(file.mimetype)) {
      cb(null, Date.now() + '-' + file.originalname);
    } else {
      cb('Invalid file type', '');
    }
  },
});

const upload = multer({ storage: storage });

// Find user helper function
const findUser = async (email) => {
  const result = await userModel.findOne({ email: email });
  return result;
};

// Fetch user information
router.get('/get_user', async (req, res) => {
  const email = req.query.email;
  try {
    const result = await findUser(email);
    res.send(result);
  } catch (e) {
    res.status(400, { message: 'An error occured.' });
  }
});

//! SPOTIFY API ROUTES
//* AUTH ROUTE
router.post('/spotify_authentication', async (req, res) => {
  const code = req.body.code;
  const baseUrl = req.body.baseURL;

  const spotifyApi = new spotifyWebApi({
    redirectUri: baseUrl,
    clientId: '05e6f02e47724a63b635cfdac09fc991',
    clientSecret: 'eb21ac786045448285ae40cc89db9ad6',
  });

  try {
    const tokenRequest = await spotifyApi.authorizationCodeGrant(code);
    res.send({
      code: 200,
      status: 'OK',
      message: 'Token fetched',
      tokenRequest,
    });
  } catch (error) {
    res.json(error);
  }
});

//* REFRESH AUTH TOKEN
router.post('/refresh_token', async (req, res) => {
  const refreshToken = req.body.refreshToken;
  const baseUrl = req.body.baseURL;

  const spotifyApi = new spotifyWebApi({
    redirectUri: baseUrl,
    clientId: '05e6f02e47724a63b635cfdac09fc991',
    clientSecret: 'eb21ac786045448285ae40cc89db9ad6',
    refreshToken,
  });

  try {
    const request = await spotifyApi.refreshAccessToken();
    res.send({
      code: 200,
      status: 'OK',
      message: 'Token Refreshed!',
      body: request,
    });
    console.log('Access Token has been refreshed!');
  } catch (error) {
    res.json(error);
  }
});

//* GET PLAYLIST ROUTE
router.get('/spotify_playlist', async (req, res) => {
  const spotifyApi = new spotifyWebApi({
    redirectUri: 'http://localhost:3000',
    clientId: '05e6f02e47724a63b635cfdac09fc991',
    clientSecret: 'eb21ac786045448285ae40cc89db9ad6',
  });
  const game = req.query.game;
  const spotifyToken = req.query.token;
  spotifyApi.setAccessToken(spotifyToken);

  try {
    const request = await spotifyApi.searchPlaylists(game);
    const playlistId = request.body.playlists.items[0].id;
    const playlistTracks = await spotifyApi.getPlaylistTracks(playlistId, {
      limit: 10,
    });
    res.send({
      code: 200,
      status: 'OK',
      message: 'Tracks fetched',
      tracks: playlistTracks.body.items,
    });
  } catch (error) {
    res.send({
      code: 400,
      status: 'ERROR',
      message: 'Something went wrong, please try again!',
      error,
    });
  }
});

//* GET ALBUM ROUTE
router.get('/spotify_album', async (req, res) => {
  const baseUrl = req.body.baseURL;
  const spotifyApi = new spotifyWebApi({
    redirectUri: baseUrl,
    clientId: '05e6f02e47724a63b635cfdac09fc991',
    clientSecret: 'eb21ac786045448285ae40cc89db9ad6',
  });
  const game = req.query.game;
  const spotifyToken = req.query.token;
  spotifyApi.setAccessToken(spotifyToken);

  try {
    const request = await spotifyApi.searchAlbums(game);
    const results = request.body.albums.items;
    let albumId;
    for (let result of results) {
      if (game == result.name) {
        albumId = result.id;
        break;
      } else albumId = request.body.albums.items[0].id;
    }

    // albumId = request.body.albums.items[0].id;
    const albumTracks = await spotifyApi.getAlbumTracks(albumId);
    res.send({
      code: 200,
      status: 'OK',
      message: 'Tracks fetched',
      tracks: albumTracks.body.items,
    });
  } catch (error) {
    res.send({
      code: 400,
      status: 'ERROR',
      message: error,
    });
  }
});

//! IGDB API ROUTES
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
      body: `fields *, artworks.*, age_ratings.*, name, cover.*, genres.*, involved_companies.*, involved_companies.company.*, release_dates.*, platforms.*, platforms.platform_logo.*, screenshots.*, rating, themes.name, similar_games.*, similar_games.cover.*, similar_games.screenshots.*, similar_games.genres.*, similar_games.platforms.*, similar_games.platforms.platform_logo.*, similar_games.release_dates.*, similar_games.involved_companies.company.name, videos.*; where id = ${gameId}; limit 1;`,
    });
    const result = await request.json();
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

//* IGDB POPULAR GAMES
router.post('/popular_titles', async (req, res) => {
  const token = req.body.token;

  const headers = {
    'Client-ID': 'kr3nccu71yvbuffq6ko4bnokn3kdj1',
    Authorization: `Bearer ${token}`,
  };
  const url = `https://api.igdb.com/v4/games`;
  try {
    const request = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: `fields *, artworks.*, age_ratings.*, name, cover.*, genres.*, involved_companies.*, involved_companies.company.*, release_dates.*, platforms.*, platforms.platform_logo.*, screenshots.*, rating, themes.name, similar_games.*, similar_games.cover.*, similar_games.screenshots.*, similar_games.genres.*, similar_games.platforms.*, similar_games.platforms.platform_logo.*, similar_games.release_dates.*, similar_games.involved_companies.company.name; sort rating_count desc; where (rating != null & rating_count > 0); limit 100;`,
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
  // const genreTitle = req.body.genreTitle;

  const headers = {
    'Client-ID': 'kr3nccu71yvbuffq6ko4bnokn3kdj1',
    Authorization: `Bearer ${token}`,
  };
  const url = `https://api.igdb.com/v4/games`;
  try {
    const genreTitle = req.body.genreTitle;

    const request = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: `fields *, artworks.*, age_ratings.*, name, cover.*, genres.*, involved_companies.*, involved_companies.company.*, release_dates.*, platforms.*, platforms.platform_logo.*, screenshots.*, rating, themes.name, similar_games.*, similar_games.cover.*, similar_games.screenshots.*, similar_games.genres.*, similar_games.platforms.*, similar_games.platforms.platform_logo.*, similar_games.release_dates.*, similar_games.involved_companies.company.name, videos.*; sort rating_count desc; where (rating != null & rating_count > 0 & category != (1,5) & themes != 42 & genres = ${genreId}); limit 30;`,
    });
    const result = await request.json();
    res.send({ [genreTitle]: result });
  } catch (error) {
    console.log(error);
  }
});

router.post('/');

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

  const headers = {
    'Client-ID': 'kr3nccu71yvbuffq6ko4bnokn3kdj1',
    Authorization: `Bearer ${token}`,
  };
  const url = `https://api.igdb.com/v4/release_dates`;
  try {
    const request = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: `fields *, game.*, game.cover.*, game.genres.*, game.themes.*, game.platforms.*; sort date desc; where (game.category != (1,2,3) & game.themes != 27 & game.cover != null & date != null & game.rating_count > 10 & game.rating != null & date < ${currentDate}); limit: 200;`,
    });
    const result = await request.json();
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

//! UPDATE AVATAR FILE
router.post(
  '/update_avatar_file',
  upload.single('avatar'),
  async function (req, res) {
    const email = req.body.email;
    const name = req.body.name;
    const avatar = req.file.destination + '/' + req.file.filename;
    try {
      const request = await userModel.findOneAndUpdate(
        { email: email, profiles: { $elemMatch: { name: name } } },
        {
          $set: {
            'profiles.$.avatar': avatar,
          },
        }, // list fields you like to change
        { new: true, setDefaultsOnInsert: false, upsert: true }
      );
      res.status(200, { message: 'Sucessfully updated avatar' });
      res.json(request);
    } catch (error) {
      res.status(400, {
        message: 'There was an error with your request, please try again.',
      });
    }
  }
);

//! UPDATE AVATAR LINK
router.post('/update_avatar_link', async function (req, res) {
  const email = req.body.email;
  const name = req.body.name;
  const avatar = req.body.avatar;
  try {
    const request = await userModel.findOneAndUpdate(
      { email: email, profiles: { $elemMatch: { name: name } } },
      {
        $set: {
          'profiles.$.avatar': avatar,
        },
      }, // list fields you like to change
      { new: true, setDefaultsOnInsert: false, upsert: true }
    );
    res.send({
      code: 200,
      status: 'OK',
      data: request,
      message: 'Sucessfully updated avatar',
    });
  } catch (error) {
    res.status(400, {
      message: 'There was an error with your request, please try again.',
    });
  }
});

//! UPDATE ACCOUNT EMAIL
router.post('/update_user_email', async (req, res) => {
  const currentEmail = req.body.originalEmail;
  const newEmail = req.body.newEmail;
  const query = { email: currentEmail };

  try {
    const request = await userModel.findOneAndUpdate(
      query,
      { email: newEmail },
      { upsert: false, new: true }
    );

    if (request !== null) {
      res.send({
        status: 200,
        message: 'Email successfully changed!',
        user: request,
      });
      return;
    } else {
      res.send({
        status: 400,
        message: 'Unable to change email, please try again!',
        user: '',
      });
      return;
    }
  } catch (error) {
    res.send(error);
  }
});

//! DELETE USER ACCOUNT
router.delete('/delete_account', async (req, res) => {
  const id = req.body.id;
  const request = await userModel.findByIdAndRemove(id);
  res.send(request);
});

//! UPDATE A PROFILE IN USER ACCOUNT
router.post('/update_user_profile', async (req, res) => {
  const email = req.body.email;
  const originalName = req.body.originalName;
  const newName = req.body.newName;
  const gameTitle = req.body.favoriteGame;
  const gameId = req.body.gameId;
  const imageURL = req.body.imageURL;
  const gameConsole = req.body.favoriteConsole;
  const color = req.body.newColor;
  const genre = req.body.favoriteGenre;

  // Determine if user changed name or not
  let name;
  if (newName === originalName) {
    name = originalName;
  } else {
    name = newName;
  }

  try {
    const request = await userModel.findOneAndUpdate(
      { email: email, profiles: { $elemMatch: { name: originalName } } },
      {
        $set: {
          'profiles.$.color': color,
          'profiles.$.name': name,
          'profiles.$.favorite_game': gameTitle,
          'profiles.$.favorite_console': gameConsole,
          'profiles.$.favorite_genre': genre,
        },
        $addToSet: {
          'profiles.$.collection': {
            name: gameTitle,
            id: gameId,
            imageURL: imageURL,
            playtime: 0,
          },
        },
      }, // list fields you like to change
      { new: true, setDefaultsOnInsert: false, upsert: true }
    );
    for (let profile of request.profiles) {
      if (profile.name == name) {
        res.send({
          code: 200,
          status: 'OK',
          message: 'Profile updated!',
          response: { user: request, profile: profile },
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400, {
      message: 'There was an error with your request, please try again.',
    });
  }
});

//! UPDATE PROFILE GAME COLLECTIONS
//* ADD GAME
router.post('/update_collection', async (req, res) => {
  const email = req.body.email;
  const gameName = req.body.name;
  const gameId = req.body.id;
  const imageURL = req.body.imageURL;
  const playtime = req.body.playtime;
  const name = req.body.currentProfile;
  const origin = req.body.origin;
  const status = req.body.status;

  try {
    const request = await userModel.findOneAndUpdate(
      { email: email, profiles: { $elemMatch: { name } } },
      {
        $addToSet: {
          'profiles.$.collection': {
            name: gameName,
            id: gameId,
            imageURL,
            playtime,
            origin,
            status,
          },
        },
      }, // list fields you like to change
      { new: true, setDefaultsOnInsert: false, upsert: true }
    );

    res.send({
      code: 200,
      status: 'OK',
      message: 'Game added to collection!',
      response: request,
    });
  } catch (error) {
    console.log(error);
    res.status(400, {
      message: 'There was an error adding games, please try again.',
    });
  }
});

//* REMOVE GAME
router.put('/remove_game', async (req, res) => {
  const email = req.body.email;
  const gameId = req.body.game;
  const name = req.body.currentProfile;

  try {
    const request = await userModel.findOneAndUpdate(
      { email: email, profiles: { $elemMatch: { name } } },
      {
        $pull: {
          'profiles.$.collection': { id: gameId },
        },
      }, // list fields you like to change
      { new: true, upsert: false }
    );
    res.send({
      code: 200,
      status: 'OK',
      message: 'Game remove from collection!',
      response: request,
    });
  } catch (error) {
    console.log(error);
    res.status(400, {
      message: 'There was an error with your request, please try again.',
    });
  }
});

//* UPDATE GAME PLAYTIME
router.put('/update_game_playtime', async (req, res) => {
  const email = req.body.email;
  const gameId = req.body.gameId;
  const name = req.body.currentProfile;
  const playtime = req.body.playtime;

  try {
    const request = await userModel.findOneAndUpdate(
      {
        email: email,
        profiles: { $elemMatch: { name } },
      },
      {
        $set: {
          'profiles.$.collection.$[element].playtime': playtime,
        },
      },
      { arrayFilters: [{ 'element.id': { $eq: gameId } }], new: true }
    );

    if (request == null) {
      res.send({
        code: 400,
        status: 'NOT OK',
        message: 'Unable to update playtime, please try again!',
        response: request,
      });
    } else {
      const currentProfile = request.profiles.filter(
        (profile) => profile.name === name
      );
      const currentPlaytime = currentProfile[0].collection.filter(
        (game) => game.id === gameId
      );

      res.send({
        code: 200,
        status: 'OK',
        message: 'Playtime updated!',
        response: { profile: currentProfile[0], game: currentPlaytime[0] },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400, {
      message: 'There was an error with your request, please try again.',
    });
  }
});

//* UPDATE GAME RATING
router.put('/update_game_rating', async (req, res) => {
  const email = req.body.email;
  const gameId = req.body.gameId;
  const name = req.body.currentProfile;
  const rating = req.body.rating;

  try {
    const request = await userModel.findOneAndUpdate(
      {
        email: email,
        profiles: { $elemMatch: { name } },
      },
      {
        $set: {
          'profiles.$.collection.$[element].user_rating': rating,
        },
      },
      { arrayFilters: [{ 'element.id': { $eq: gameId } }], new: true }
    );

    if (request == null) {
      res.send({
        code: 400,
        status: 'NOT OK',
        message: 'Unable to update playtime, please try again!',
        response: request,
      });
    } else {
      const currentProfile = request.profiles.filter(
        (profile) => profile.name === name
      );
      const currentPlaytime = currentProfile[0].collection.filter(
        (game) => game.id === gameId
      );

      res.send({
        code: 200,
        status: 'OK',
        message: 'Rating updated!',
        response: { profile: currentProfile[0], game: currentPlaytime[0] },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400, {
      message: 'There was an error with your request, please try again.',
    });
  }
});

//* UPDATE GAME BANNER
router.put('/update_game_banner', async (req, res) => {
  const email = req.body.email;
  const gameId = req.body.gameId;
  const name = req.body.currentProfile;
  const bannerURL = req.body.url;

  try {
    const request = await userModel.findOneAndUpdate(
      {
        email: email,
        profiles: { $elemMatch: { name } },
      },
      {
        $set: {
          'profiles.$.collection.$[element].banner_image': bannerURL,
        },
      },
      { arrayFilters: [{ 'element.id': { $eq: gameId } }], new: true }
    );

    if (request == null) {
      res.send({
        code: 400,
        status: 'NOT OK',
        message: 'Unable to update banner image, please try again!',
        response: request,
      });
    } else {
      const currentProfile = request.profiles.filter(
        (profile) => profile.name === name
      );
      const currentPlaytime = currentProfile[0].collection.filter(
        (game) => game.id === gameId
      );

      res.send({
        code: 200,
        status: 'OK',
        message: 'Banner image updated!',
        response: { profile: currentProfile[0], game: currentPlaytime[0] },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400, {
      message: 'There was an error with your request, please try again.',
    });
  }
});

//* UPDATE GAME ACHIEVEMENTS
router.put('/update_game_achievements', async (req, res) => {
  const email = req.body.email;
  const gameId = req.body.gameId;
  const name = req.body.currentProfile;
  const achievements = req.body.achievements;

  try {
    const request = await userModel.findOneAndUpdate(
      {
        email: email,
        profiles: { $elemMatch: { name } },
      },
      {
        $set: {
          'profiles.$.collection.$[element].achievements': achievements,
        },
      },
      { arrayFilters: [{ 'element.id': { $eq: gameId } }], new: true }
    );

    if (request == null) {
      res.send({
        code: 400,
        status: 'NOT OK',
        message: 'Unable to update achievements, please try again!',
        response: request,
      });
    } else {
      const currentProfile = request.profiles.filter(
        (profile) => profile.name === name
      );
      const currentPlaytime = currentProfile[0].collection.filter(
        (game) => game.id === gameId
      );

      res.send({
        code: 200,
        status: 'OK',
        message: 'Achivements updated!',
        response: { profile: currentProfile[0], game: currentPlaytime[0] },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400, {
      message: 'There was an error with your request, please try again.',
    });
  }
});

//* UPDATE GAME TROPHIES
router.put('/update_game_trophies', async (req, res) => {
  const email = req.body.email;
  const gameId = req.body.gameId;
  const name = req.body.name;
  const trophies = req.body.trophies;

  try {
    const request = await userModel.findOneAndUpdate(
      {
        email: email,
        profiles: { $elemMatch: { name } },
      },
      {
        $set: {
          'profiles.$.collection.$[element].trophies': trophies,
        },
      },
      { arrayFilters: [{ 'element.id': { $eq: gameId } }], new: true }
    );

    console.log(request);

    if (request == null) {
      res.send({
        code: 400,
        status: 'NOT OK',
        message: 'Unable to update trophies, please try again!',
        response: request,
      });
    } else {
      const currentProfile = request.profiles.filter(
        (profile) => profile.name === name
      );
      const currentPlaytime = currentProfile[0].collection.filter(
        (game) => game.id === gameId
      );

      res.send({
        code: 200,
        status: 'OK',
        message: 'Trophies updated!',
        response: { profile: currentProfile[0], game: currentPlaytime[0] },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400, {
      message: 'There was an error with your request, please try again.',
    });
  }
});

//* UPDATE GAME BACKLOG STATUS
router.put('/update_game_backlog', async (req, res) => {
  const email = req.body.email;
  const gameId = req.body.gameId;
  const name = req.body.currentProfile;
  const backlogStatus = req.body.status;

  try {
    const request = await userModel.findOneAndUpdate(
      {
        email: email,
        profiles: { $elemMatch: { name } },
      },
      {
        $set: {
          'profiles.$.collection.$[element].status': backlogStatus,
        },
      },
      { arrayFilters: [{ 'element.id': { $eq: gameId } }], new: true }
    );

    if (request == null) {
      res.send({
        code: 400,
        status: 'NOT OK',
        message: 'Unable to update backlog, please try again!',
        response: request,
      });
      return;
    } else {
      const currentProfile = request.profiles.filter(
        (profile) => profile.name === name
      );
      const currentPlaytime = currentProfile[0].collection.filter(
        (game) => game.id === gameId
      );

      res.send({
        code: 200,
        status: 'OK',
        message: 'Backlog status updated!',
        response: { profile: currentProfile[0], game: currentPlaytime[0] },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400, {
      message: 'There was an error with your request, please try again.',
    });
    return;
  }
});

//! CREATE A NEW PROFILE
router.post('/create_new_profile', async (req, res) => {
  const userEmail = req.body.email;
  try {
    const user = await findUser(userEmail);
    user.profiles.push({
      name: req.body.name,
      avatar: req.body.avatar,
      color: req.body.color,
      favorite_console: req.body.favoriteConsole,
      favorite_genre: req.body.favoriteGenre,
      favorite_game: req.body.favoriteGame,
      isAdmin: false,
    });
    user.save();
    res.send({
      code: 200,
      status: 'OK',
      message: 'Profile created!',
      response: user,
    });
  } catch (e) {
    res.status(400, { message: 'An error occured, please try again later!' });
  }
});

// Delete a single profile helper function
const deleteProfile = async (name, email) => {
  const query = { email: email };
  try {
    const request = await userModel.findOneAndUpdate(
      query,
      {
        $pull: { profiles: { name: name } },
      },
      { safe: true, upsert: true }
    );
    return request;
  } catch (error) {
    return error;
  }
};

//! DELETE EXISTING PROFILE
router.delete('/delete_profile', async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;

  try {
    const request = await deleteProfile(name, email);
    res.send({
      code: 200,
      status: 'OK',
      response: request,
      message: 'Profile successfully erased',
    });
  } catch (error) {
    res.send({
      code: 400,
      status: 'ERROR',
      response: error,
      message: 'Something went wrong',
    });
  }
});

module.exports = router;
