const spotifyWebApi = require("spotify-web-api-node");
const express = require("express");
const router = express.Router();
const querystring = require("querystring");
const axios = require("axios");
const url = require("url");

const generateRandomString = (length) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};

const spotifyApi = new spotifyWebApi({
  redirectUri: process.env.CLIENT_URL,
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

router.get("/test_spotify", (req, res) => {
  var state = generateRandomString(16);
  res.redirect(
    `https://accounts.spotify.com/authorize?client_id=${process.env.SPOTIFY_CLIENT_ID}&state=${state}&response_type=code&redirect_uri=${process.env.SPOTIFY_REDIRECT}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`
  );
});

router.get("/spotify_redirect", async (req, res) => {
  const code = req.query.code || null;
  const state = req.query.state || null;

  if (state === null) {
    res.redirect(
      "/" +
        querystring.stringify({
          error: "state_mismatch",
        })
    );
  } else {
    // const tokenRequest = await spotifyApi.authorizationCodeGrant(code);

    const spotifyHeaders = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: code,
        redirect_uri: process.env.SPOTIFY_REDIRECT,
        grant_type: "authorization_code",
      },
      headers: {
        Authorization:
          "Basic " +
          new Buffer.from(
            process.env.SPOTIFY_CLIENT_ID +
              ":" +
              process.env.SPOTIFY_CLIENT_SECRET
          ).toString("base64"),
        json: true,
      },
    };
    axios
      .post(spotifyHeaders.url, querystring.stringify(spotifyHeaders.form), {
        headers: spotifyHeaders.headers,
      })
      .then((response) => {
        // Handle the response here
        spotifyApi.setAccessToken(response.data.access_token);
        spotifyApi.setRefreshToken(response.data.refresh_token);
        res.redirect(`/?access_token=${response.data.access_token}`);
      })
      .catch((error) => {
        // Handle the error here
        console.error(error);
      });
  }
});

//* AUTH ROUTE
router.post("/spotify_authentication", async (req, res) => {
  const code = req.body.code;

  try {
    const tokenRequest = await spotifyApi.authorizationCodeGrant(code);
    console.log(tokenRequest);
    spotifyApi.setAccessToken(data.body["access_token"]);
    spotifyApi.setRefreshToken(data.body["refresh_token"]);
    res.send({
      code: 200,
      status: "OK",
      message: "Token fetched",
      tokenRequest,
    });
  } catch (error) {
    res.json(error);
  }
});

//* REFRESH AUTH TOKEN
router.post("/refresh_token", async (req, res) => {
  const refreshToken = req.body.token;
  console.log(spotifyApi.getRefreshToken());
  try {
    const request = await spotifyApi.refreshAccessToken();
    console.log(request);
    res.send({
      code: 200,
      status: "OK",
      message: "Token Refreshed!",
      body: request,
    });
  } catch (error) {
    res.send(error);
  }
});

//* GET PLAYLIST ROUTE
router.get("/spotify_playlist", async (req, res) => {
  const spotifyApi = new spotifyWebApi({
    redirectUri: process.env.CLIENT_URL,
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
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
      status: "OK",
      message: "Tracks fetched",
      tracks: playlistTracks.body.items,
    });
  } catch (error) {
    res.send({
      code: 400,
      status: "ERROR",
      message: "Something went wrong, please try again!",
      error,
    });
  }
});

//* GET ALBUM ROUTE
router.get("/spotify_album", async (req, res) => {
  const game = req.query.game;
  const spotifyToken = req.query.token;
  spotifyApi.setAccessToken(spotifyToken);

  try {
    const request = await spotifyApi.searchAlbums(game);
    const albumId = request.body.albums.items[0].id;
    const albumTracks = await spotifyApi.getAlbumTracks(albumId);
    res.send({
      code: 200,
      status: "OK",
      message: "Tracks fetched",
      tracks: albumTracks.body.items,
      albums: request.body.albums,
    });
  } catch (error) {
    res.send({
      code: 400,
      status: "ERROR",
      message: error,
    });
  }
});

module.exports = router;
