import React, { useState, useEffect } from 'react';
import rawgClient from '../../axios';
import GameDetails from './GameDetails/GameDetails';
import './Row.css';
import axios from 'axios';
import Placeholder from '../Placeholder/Placeholder';
import { SiApplemusic } from 'react-icons/si';

function Row({ title, fetchURL, spotifyToken }) {
  const [games, setGames] = useState([]);
  const [currentGame, setCurrentGame] = useState('');
  const [currentSoundtrack, setCurrentSoundtrack] = useState(null);
  const [displayDetails, setDisplayDetails] = useState(false);
  const [currentlyOpen, setCurrentlyOpen] = useState(null);
  const [imgsLoaded, setImgsLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [viewingSoundtrack, setViewingSoundtrack] = useState(false);

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

  const fetchGameOST = async (game) => {
    try {
      const request = await axios.get('/app/spotify_playlist', {
        params: {
          game,
          token: spotifyToken,
        },
      });
      console.log(request.data);
      setCurrentSoundtrack(request.data.tracks);
      setViewingSoundtrack(true);
    } catch (error) {
      console.log(error);
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
                          <h3>{game?.name} OST</h3>
                          <img
                            loading='lazy'
                            className='row__poster_back_img'
                            src={game.background_image}
                            alt={game.name}
                          />
                          <div className='soundtrack_container'>
                            <ul className='soundtracks'>
                              {currentSoundtrack?.map((track) => (
                                <li key={track.track.id} className='soundtrack'>
                                  {track.track.name}
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
