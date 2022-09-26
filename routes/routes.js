const express = require('express');
const router = express.Router();
const userModel = require('../models/NewUserModels');
const multer = require('multer');
const spotifyWebApi = require('spotify-web-api-node');
const fs = require('fs');
const path = require('path');
const fetch = require('cross-fetch');
const { connected } = require('process');

// Transform upload file into DB Object String
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Determine whether or not email exists in database
const newAccountValidation = async (email) => {
  const result = await userModel.findOne({ email: email });
  return result == null;
};

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
  const spotifyApi = new spotifyWebApi({
    redirectUri: 'http://localhost:3000',
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
  const spotifyApi = new spotifyWebApi({
    redirectUri: 'http://localhost:3000',
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
  const spotifyApi = new spotifyWebApi({
    redirectUri: 'http://localhost:3000',
    clientId: '05e6f02e47724a63b635cfdac09fc991',
    clientSecret: 'eb21ac786045448285ae40cc89db9ad6',
  });
  const game = req.query.game;
  const spotifyToken = req.query.token;
  spotifyApi.setAccessToken(spotifyToken);

  try {
    const request = await spotifyApi.searchAlbums(game);
    const albumId = request.body.albums.items[0].id;
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
  // const url = `https://api.igdb.com/v4/games?fields=*,cover.*,platforms.*,screenshots.*,similar_games.*&search=${gameName}&limit=50`;
  try {
    const request = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: `search "${gameName}"; fields *, name, cover.*, involved_companies.*, involved_companies.company.*, release_dates.*, platforms.*, screenshots.*, rating, themes.name, similar_games.*, similar_games.cover.*, similar_games.genres.*, similar_games.involved_companies.company.name; where (rating != null & category != (1,3)); limit 100;`,
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
      body: `fields *, cover.*, screenshots.*, similar_games.*; where id = ${gameId};`,
    });
    const result = await request.json();
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

//! SIGN UP
router.post('/signup', upload.single('avatar'), (req, res) => {
  const avatar = req.file.destination + '/' + req.file.filename;
  const newUser = new userModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    color: req.body.color,
    avatar: avatar,
  });

  newAccountValidation(req.body.email).then(function (valid) {
    if (valid) {
      newUser.profiles.push({
        name: req.body.firstName,
        avatar: avatar,
        color: req.body.color,
        isAdmin: true,
      });
      newUser
        .save()
        .then((data) => {
          res.json(data);
        })
        .catch((error) => {
          res.json(error);
        });
    } else {
      res.status(400).send({ message: 'Email is already in use!' });
    }
  });
});

//! EMAIL VERIFICATION
router.post('/email_verification', (req, res) => {
  newAccountValidation(req.body.email).then(function (valid) {
    if (valid) {
      res.status(200).send({ status: 'success' });
    } else {
      res.status(400).send({ message: 'Email is already in use!' });
    }
  });
});

//! SIGN IN
router.post('/signin', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  findUser(email).then(function (user) {
    if (user && password == user.password) {
      res.status(200).send({ message: 'User logged in successfully!', user });
    } else {
      res.status(400).send({ message: 'Incorrect email or password!' });
    }
  });
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

//! UPDATE A PROFILE IN USER ACCOUNT
router.post('/update_user_profile', async (req, res) => {
  const email = req.body.email;
  const originalName = req.body.originalName;
  const newName = req.body.newName;
  const gameTitle = req.body.favoriteGame;
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
        $push: {
          'profiles.$.collection': gameTitle,
        },
      }, // list fields you like to change
      { new: true, setDefaultsOnInsert: false, upsert: true }
    );
    res.send({
      code: 200,
      status: 'OK',
      message: 'Profile updated!',
      response: request,
    });
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
  const games = req.body.games;
  const name = req.body.currentProfile;
  try {
    const request = await userModel.findOneAndUpdate(
      { email: email, profiles: { $elemMatch: { name } } },
      {
        $push: {
          'profiles.$.collection': games,
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
  const gameTitle = req.body.gameTitle;
  const name = req.body.currentProfile;

  try {
    const request = await userModel.findOneAndUpdate(
      { email: email, profiles: { $elemMatch: { name } } },
      {
        $pull: {
          'profiles.$.collection': gameTitle,
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