import React, { useState, useEffect } from 'react';
import GamePreview from './GamePreview/GamePreview';
import './Row.css';
import axios from 'axios';
import Placeholder from '../Placeholder/Placeholder';
import { SiApplemusic } from 'react-icons/si';
import { FaPlay, FaPause, FaPlusSquare } from 'react-icons/fa';

function Row({
  genreDetails,
  playTrack,
  currentTrack,
  resumePlayback,
  pausePlayback,
  isPlaying,
  spotifyToken,
  twitchToken,
  activeProfile,
  setGameDetails,
  addGame,
  setNotification,
}) {
  const [currentGame, setCurrentGame] = useState('');
  const [currentPlaylist, setCurrentPlaylist] = useState([]);
  const [viewingSoundtrack, setViewingSoundtrack] = useState(false);
  const [displayDetails, setDisplayDetails] = useState(false);
  const [currentlyOpen, setCurrentlyOpen] = useState(null);
  const [imgsLoaded, setImgsLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const baseURL = process.env.REACT_APP_BASE_URL;
  // const games = Object.keys(title).map((game) => title[game])[0];
  // console.log(games.map((game) => game.name));
  const genreTitle = genreDetails[0][0];
  const genreList = genreDetails[0][1];

  const fetchGameOST = async (game) => {
    if (!spotifyToken) {
      setNotification(
        'ERROR',
        'Please connect to Spotify through the nav dropdown!'
      );
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
    setGameDetails(game);
  };

  const closeGameDetails = () => {
    setCurrentlyOpen(null);
    setCurrentGame(null);
  };

  const addGameHandler = (e, game) => {
    e.stopPropagation();
    addGame(game);
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

  return (
    <div className='row'>
      <h2 className='row__title'>{genreTitle}</h2>
      <div className='row__posters'>
        {genreList.map(
          (game) =>
            game.cover !== undefined && (
              <React.Fragment key={game.id}>
                {!loading && (
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
                      {/* {!loading && ( */}
                      <>
                        {/* FRONT OF POSTER */}
                        <div className='row__poster_front'>
                          <SiApplemusic
                            onClick={(e) => viewGameSoundtrack(e, game)}
                            className='row__poster_music_icon'
                            style={{ color: activeProfile.color }}
                          />
                          <FaPlusSquare
                            onClick={(e) => addGameHandler(e, game)}
                            className='row__poster_add_icon'
                            style={{ color: activeProfile.color }}
                          />
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
                            src={`//images.igdb.com/igdb/image/upload/t_cover_big_2x/${game.cover?.image_id}.jpg`}
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
                      {/* )} */}
                    </div>
                  </div>
                )}
              </React.Fragment>
            )
        )}
        {loading && (
          <div className='row__loading_container'>
            {[...Array(10)].map((item, i) => (
              <div key={i} className='row__placeholder__wrapper'>
                <Placeholder key={i} delay={i} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Row;
