import React, { useState, useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import SpotifyWebApi from 'spotify-web-api-node';
import './SpotifyPlayback.css';

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
});

const SpotifyPlayback = ({
  token,
  trackUri,
  playAudio,
  beginPlayback,
  pausePlayback,
}) => {
  useEffect(() => {
    spotifyApi.setAccessToken(token);
  }, [token]);

  useEffect(() => {
    beginPlayback();
  }, [trackUri]);

  if (!token) return;
  return (
    <>
      <div className='playback_container'>
        <SpotifyPlayer
          token={token}
          callback={(state) => {
            if (!state.isPlaying) pausePlayback();
          }}
          uris={trackUri ? [trackUri] : []}
          play={playAudio}
          styles={{
            color: 'white',
            bgColor: 'rgba(0,0,0,0.8)',
            sliderColor: '#1cb954',
            trackArtistColor: 'white',
            trackNameColor: '#1cb954',
          }}
        />
      </div>
    </>
  );
};

export default SpotifyPlayback;
