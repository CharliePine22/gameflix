const express = require('express');
const router = express.Router();
const userModel = require('../models/newUserModels');
const multer = require('multer');
const spotifyWebApi = require('spotify-web-api-node');
const fs = require('fs');
const path = require('path');

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
const spotifyApi = new spotifyWebApi({
  redirectUri: 'http://localhost:3000',
  clientId: '05e6f02e47724a63b635cfdac09fc991',
  clientSecret: 'eb21ac786045448285ae40cc89db9ad6',
});
//* AUTH ROUTE
router.post('/spotify_authentication', async (req, res) => {
  try {
    const tokenRequest = await spotifyApi.clientCredentialsGrant();
    spotifyApi.setAccessToken(tokenRequest.body.access_token);
    res.send({
      code: 200,
      status: 'OK',
      message: 'Token fetched',
      tokenData: tokenRequest.body,
    });
  } catch (error) {
    res.send({
      code: 400,
      status: 'ERROR',
      message: 'Token fetch failed',
      error,
    });
  }
});

//* GET PLAYLIST ROUTE
router.get('/spotify_playlist', async (req, res) => {
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

//! Sign Up Route
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

//! Landing Page Email Verification
router.post('/email_verification', (req, res) => {
  newAccountValidation(req.body.email).then(function (valid) {
    if (valid) {
      res.status(200).send({ status: 'success' });
    } else {
      res.status(400).send({ message: 'Email is already in use!' });
    }
  });
});

//! Sign In Route
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

//! Update Avatar File Route
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

//! Update Avatar Route if it's a link
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

// Update one of the user profiles
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

//! ROUTE TO CREATE A NEW PROFILE
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

//! ROUTE TO DELETE EXISTING PROFILE
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
