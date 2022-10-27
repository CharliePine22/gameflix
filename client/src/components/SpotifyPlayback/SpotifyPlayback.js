import React, { useState, useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import SpotifyWebApi from 'spotify-web-api-node';
import './SpotifyPlayback.css';

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
});

const activeProfile = localStorage.getItem('profile');

const SpotifyPlayback = ({
  trackUri,
  playAudio,
  beginPlayback,
  pausePlayback,
  spotifyToken,
}) => {
  useEffect(() => {
    spotifyApi.setAccessToken(spotifyToken);
  }, [spotifyToken]);

  useEffect(() => {
    beginPlayback();
  }, [trackUri]);

  if (!spotifyToken) return;
  return (
    <>
      <div className='playback_container'>
        <SpotifyPlayer
          token={spotifyToken}
          callback={(state) => {
            if (!state.isPlaying) pausePlayback();
          }}
          uris={trackUri ? [trackUri] : []}
          play={playAudio}
          styles={{
            color: 'white',
            bgColor: 'rgba(0,0,0,0.8)',
            sliderColor: activeProfile.color,
            trackArtistColor: 'white',
            trackNameColor: activeProfile.color,
          }}
        />
      </div>
    </>
  );
};

export default SpotifyPlayback;
