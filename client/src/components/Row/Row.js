import React, { useState, useEffect } from 'react';
import rawgClient from '../../axios';
import GameDetails from './GameDetails/GameDetails';
import './Row.css';
import axios from 'axios';
import Placeholder from '../Placeholder/Placeholder';
import { SiApplemusic } from 'react-icons/si';
import { FaPlay, FaPause } from 'react-icons/fa';

const spotifyToken = localStorage.getItem('spotify_token');

function Row({
  title,
  fetchURL,
  playTrack,
  currentTrack,
  resumePlayback,
  pausePlayback,
  isPlaying,
}) {
  const [games, setGames] = useState([]);
  const [currentGame, setCurrentGame] = useState('');
  const [currentPlaylist, setCurrentPlaylist] = useState([]);
  const [viewingSoundtrack, setViewingSoundtrack] = useState(false);
  const [displayDetails, setDisplayDetails] = useState(false);
  const [currentlyOpen, setCurrentlyOpen] = useState(null);
  const [imgsLoaded, setImgsLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Grab games from each genre
    setLoading(true);
    async function fetchData() {
      const request = await rawgClient.get(fetchURL);
      setGames(request.data.results);
      setLoading(false);
      return request;
    }
    fetchData();
  }, [fetchURL]);

  // useEffect(() => {
  //   if (!twitchToken) return;
  //   const fetchIGDB = async () => {
  //     try {
  //       const request = await axios.post('/app/search', {
  //         token: twitchToken,
  //         clientId: process.env.REACT_APP_IGDB_CLIENT_ID,
  //       });
  //       console.log(request);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchIGDB();
  // }, [twitchToken]);

  const fetchGameOST = async (game) => {
    if (!spotifyToken) {
      console.log('Please connect to Spotify!');
      return;
    }
    try {
      const request = await axios.get('/app/spotify_album', {
        params: {
          game,
          token: spotifyToken,
        },
      });
      setCurrentPlaylist(request.data.tracks);
      setViewingSoundtrack(true);
    } catch (error) {
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
    if (track.name == currentTrack.name) {
      resumePlayback();
    }
    playTrack(track);
  };

  const formatTrackTitle = (title) => {
    return title.split('-')[0];
  };

  return (
    <div className='row' key={title}>
      <h2>{title}</h2>

      <div className='row__posters'>
        {games.map(
          (game) =>
            game.background_image !== null && (
              <React.Fragment key={game.name}>
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
                          />
                          <span className='row__poster_name'>{game?.name}</span>
                          <img
                            loading='lazy'
                            className='row__poster'
                            src={game.background_image}
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
                                  key={track.track.id}
                                  onClick={(e) => e.stopPropagation()}
                                  className='soundtrack'
                                >
                                  <p
                                    style={{
                                      color:
                                        currentTrack &&
                                        currentTrack.name == track.track.name
                                          ? 'green'
                                          : 'white',
                                      fontWeight:
                                        currentTrack &&
                                        currentTrack.name == track.track.name
                                          ? '600'
                                          : '400',
                                    }}
                                  >
                                    {formatTrackTitle(track.track.name)}
                                  </p>
                                  {currentTrack.name !== track.track.name ||
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
                    <GameDetails
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
