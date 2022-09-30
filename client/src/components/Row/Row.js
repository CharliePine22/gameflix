import React, { useState, useEffect } from 'react';
import GamePreview from './GamePreview/GamePreview';
import './Row.css';
import axios from 'axios';
import Placeholder from '../Placeholder/Placeholder';
import { SiApplemusic } from 'react-icons/si';
import { FaPlay, FaPause } from 'react-icons/fa';

function Row({
  title,
  playTrack,
  currentTrack,
  resumePlayback,
  pausePlayback,
  isPlaying,
  spotifyToken,
  twitchToken,
  genreId,
  activeProfile,
}) {
  const [games, setGames] = useState([]);
  const [currentGame, setCurrentGame] = useState('');
  const [currentPlaylist, setCurrentPlaylist] = useState([]);
  const [viewingSoundtrack, setViewingSoundtrack] = useState(false);
  const [displayDetails, setDisplayDetails] = useState(false);
  const [currentlyOpen, setCurrentlyOpen] = useState(null);
  const [imgsLoaded, setImgsLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const baseURL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    // Grab games from each genre
    if (!twitchToken) return;
    setLoading(true);
    async function fetchData() {
      try {
        const request = await axios.post(`${baseURL}/app/game_genre`, {
          token: twitchToken,
          genreId,
        });
        setGames(request.data);
        setLoading(false);
        return request;
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [genreId, twitchToken]);

  const fetchGameOST = async (game) => {
    if (!spotifyToken) {
      console.log('Please connect to Spotify!');
      return;
    }
    try {
      const request = await axios.get(`${baseURL}/app/spotify_album`, {
        params: {
          game,
          token: spotifyToken,
          baseURL,
        },
      });
      if (request.data.status !== 'OK') {
        window.location = '/';
        localStorage.removeItem('spotify_token');
      } else {
        setCurrentPlaylist(request.data.tracks);
        setViewingSoundtrack(true);
      }
    } catch (error) {
      console.log(error);
      console.log('OST FETCH ISSUE');
    }
  };

  // Grab trailer video from selected game
  const fetchGameDetails = (game) => {
    setCurrentlyOpen(game.name);
    setCurrentGame(game);
  };

  const closeGameDetails = () => {
    setCurrentlyOpen(null);
    setCurrentGame(null);
  };

  const viewGameSoundtrack = (e, game) => {
    e.stopPropagation();
    fetchGameOST(game.name);
    setCurrentGame(game.name);
  };

  const closeGameSoundtrack = (e) => {
    e.stopPropagation();
    setCurrentGame(null);
    setViewingSoundtrack(false);
  };

  const selectTrackHandler = (e, track) => {
    e.stopPropagation();
    if (currentTrack !== null && track.name == currentTrack.name) {
      resumePlayback();
    }
    playTrack(track);
  };

  const formatTrackTitle = (title) => {
    return title.split('-')[0].split('(')[0];
  };

  if (twitchToken == null || games == null) {
    return;
  }

  return (
    <div className='row' key={title} onClick={() => console.log(games)}>
      <h2 className='row__title'>{title}</h2>

      <div className='row__posters'>
        {games.map(
          (game) =>
            game.cover !== undefined && (
              <React.Fragment key={game.id}>
                <div className='row__poster_wrapper'>
                  <div
                    className={`row__poster_container ${
                      viewingSoundtrack && currentGame == game.name
                        ? 'flip'
                        : ''
                    }`}
                    onClick={() => fetchGameDetails(game)}
                  >
                    {' '}
                    {!loading && (
                      <>
                        {/* FRONT OF POSTER */}
                        <div className='row__poster_front'>
                          <SiApplemusic
                            onClick={(e) => viewGameSoundtrack(e, game)}
                            className='row__poster_music_icon'
                            style={{ color: activeProfile.color }}
                          />
                          {/* <span className='row__poster_name'>{game?.name}</span> */}
                          <img
                            loading='lazy'
                            className='row__poster'
                            src={`//images.igdb.com/igdb/image/upload/t_cover_big_2x/${game.cover?.image_id}.jpg`}
                            alt={game.name}
                          />
                        </div>
                        {/* BACK OF POSTER */}
                        <div
                          className='row__poster_back'
                          onClick={closeGameSoundtrack}
                        >
                          <h3>{game?.name} Spotify OST</h3>
                          <img
                            loading='lazy'
                            className='row__poster_back_img'
                            src={game.background_image}
                            alt={game.name}
                          />
                          <div className='soundtrack_container'>
                            <ul className='soundtracks'>
                              {currentPlaylist?.map((track) => (
                                <li
                                  key={track.id}
                                  onClick={(e) => e.stopPropagation()}
                                  className='soundtrack'
                                >
                                  <p
                                    style={{
                                      color:
                                        currentTrack !== null &&
                                        currentTrack.name == track.name
                                          ? 'green'
                                          : 'white',
                                      fontWeight:
                                        currentTrack !== null &&
                                        currentTrack.name == track.name
                                          ? '600'
                                          : '400',
                                    }}
                                  >
                                    {formatTrackTitle(track.name)}
                                  </p>
                                  {(currentTrack !== null &&
                                    currentTrack.name !== track.name) ||
                                  !isPlaying ? (
                                    <FaPlay
                                      onClick={(e) =>
                                        selectTrackHandler(e, track)
                                      }
                                    />
                                  ) : (
                                    <FaPause onClick={(e) => pausePlayback()} />
                                  )}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  {currentlyOpen === game.name && (
                    <GamePreview
                      game={currentGame}
                      displayDetails={displayDetails}
                      hideDetails={closeGameDetails}
                    />
                  )}
                </div>
              </React.Fragment>
            )
        )}
        {loading && (
          <div className='row__loading_container'>
            {[...Array(10)].map((item, i) => (
              <div key={i} className='row__placeholder__wrapper'>
                <div className='row__poster_container'>
                  <Placeholder key={i} delay={i} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Row;
