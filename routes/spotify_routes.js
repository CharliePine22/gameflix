const spotifyWebApi = require("spotify-web-api-node");
const express = require("express");
const router = express.Router();

//* AUTH ROUTE
router.post("/spotify_authentication", async (req, res) => {
  const code = req.body.code;
  const baseUrl = req.body.baseURL;

  const spotifyApi = new spotifyWebApi({
    redirectUri: baseUrl,
    clientId: "05e6f02e47724a63b635cfdac09fc991",
    clientSecret: "eb21ac786045448285ae40cc89db9ad6",
  });

  try {
    const tokenRequest = await spotifyApi.authorizationCodeGrant(code);
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
  const refreshToken = req.body.refreshToken;
  const baseUrl = req.body.baseURL;

  const spotifyApi = new spotifyWebApi({
    redirectUri: baseUrl,
    clientId: "05e6f02e47724a63b635cfdac09fc991",
    clientSecret: "eb21ac786045448285ae40cc89db9ad6",
    refreshToken,
  });

  try {
    const request = await spotifyApi.refreshAccessToken();
    res.send({
      code: 200,
      status: "OK",
      message: "Token Refreshed!",
      body: request,
    });
    console.log("Access Token has been refreshed!");
  } catch (error) {
    res.json(error);
  }
});

//* GET PLAYLIST ROUTE
router.get("/spotify_playlist", async (req, res) => {
  const spotifyApi = new spotifyWebApi({
    redirectUri: "http://localhost:3000",
    clientId: "05e6f02e47724a63b635cfdac09fc991",
    clientSecret: "eb21ac786045448285ae40cc89db9ad6",
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
  const baseUrl = req.body.baseURL;
  const spotifyApi = new spotifyWebApi({
    redirectUri: baseUrl,
    clientId: "05e6f02e47724a63b635cfdac09fc991",
    clientSecret: "eb21ac786045448285ae40cc89db9ad6",
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
      status: "OK",
      message: "Tracks fetched",
      tracks: albumTracks.body.items,
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
