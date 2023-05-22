import React, { useEffect } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import SpotifyWebApi from "spotify-web-api-node";
import "./SpotifyPlayback.css";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
});

const SpotifyPlayback = ({
  trackUri,
  playAudio,
  beginPlayback,
  pausePlayback,
  spotifyToken,
  refreshSpotifyToken,
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
      <div className="playback_container">
        <SpotifyPlayer
          token={spotifyToken}
          callback={(state) => {
            if (state.error) {
              console.log("ERROR");
              refreshSpotifyToken(spotifyToken);
            }
            if (!state.isPlaying) pausePlayback();
          }}
          uris={trackUri ? [trackUri] : []}
          play={playAudio}
          styles={{
            color: "white",
            bgColor: "rgba(0,0,0,0.9)",
            // sliderColor: activeProfile.color,
            trackArtistColor: "white",
            trackNameColor: "white",
          }}
        />
      </div>
    </>
  );
};

export default SpotifyPlayback;
