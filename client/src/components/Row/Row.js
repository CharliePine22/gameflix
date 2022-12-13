import React, { useState, useEffect } from 'react';
import GamePreview from './GamePreview/GamePreview';
import './Row.css';
import axios from 'axios';
import Placeholder from '../Placeholder/Placeholder';
import { FaPlay, FaPause } from 'react-icons/fa';
// ESRB Logos
import eRating from '../../assets/images/ESRB_E.png';
import tRating from '../../assets/images/ESRB_T.png';
import mRating from '../../assets/images/ESRB_M.png';
import rpRating from '../../assets/images/ESRB_RP.png';

function Row({
  activeProfile,
  spotifyToken,
  genreDetails,
  playTrack,
  currentTrack,
  setGameDetails,
  resumePlayback,
  pausePlayback,
  isPlaying,
  currentGameOpen,
  closeGameWindow,
  openGame,
  addGame,
  setNotification,
}) {
  const [currentGame, setCurrentGame] = useState('');
  const [currentPlaylist, setCurrentPlaylist] = useState([]);
  const [viewingSoundtrack, setViewingSoundtrack] = useState(false);
  const [displayDetails, setDisplayDetails] = useState(false);
  const [loading, setLoading] = useState(false);
  const baseURL = process.env.REACT_APP_BASE_URL;
  const [viewingPreview, setViewingPreview] = useState(false);

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
    closeGameWindow();
    setGameDetails(game);
  };

  const addGameHandler = (e, game) => {
    e.stopPropagation();
    addGame(game);
  };

  const viewGameSoundtrack = (e, game) => {
    e.stopPropagation();
    closeGameWindow();
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

  // Return a ESRB rating picture according to fetched game
  const determineESRB = (game) => {
    if (!game || !game.age_ratings)
      return <img className='row__poster__esrb_img' src={rpRating} />;
    const hasRating = game?.age_ratings.filter(
      (rating) => rating.category == 1 || rating.category == 2
    );

    if (hasRating.length == 0 || !game.age_ratings)
      return <img className='row__poster__esrb_img' src={rpRating} />;
    const esrb = hasRating[0].rating;

    switch (esrb) {
      case 1:
      case 2:
      case 8:
      case 9:
        return <img className='row__poster__esrb_img' src={eRating} />;
      case 3:
      case 4:
      case 10:
        return <img className='row__poster__esrb_img' src={tRating} />;
      case 5:
      case 11:
        return <img className='row__poster__esrb_img' src={mRating} />;
      default:
        return <img className='row__poster__esrb_img' src={rpRating} />;
    }
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
                  <div
                    className={`row__poster_wrapper ${
                      currentGameOpen == game.name && 'viewing_game'
                    }`}
                    style={{
                      zIndex:
                        currentGameOpen !== game.name &&
                        currentGameOpen !== null &&
                        '-1',
                      pointerEvents:
                        currentGameOpen && viewingPreview ? 'none' : 'revert',
                    }}
                  >
                    <div
                      className={`row__poster_container ${
                        viewingSoundtrack && currentGameOpen == game.name
                          ? 'flip'
                          : ''
                      }`}
                      onClick={() => openGame(game)}
                    >
                      <>
                        {/* FRONT OF POSTER */}
                        <div
                          className='row__poster_front'
                          style={{
                            transformStyle: currentGameOpen && 'revert',
                          }}
                        >
                          <img
                            loading='lazy'
                            className='row__poster'
                            src={`//images.igdb.com/igdb/image/upload/t_cover_big_2x/${game.cover?.image_id}.jpg`}
                            alt={game.name}
                          />
                          {determineESRB(game)}
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
                    </div>
                    {currentGameOpen === game.name && (
                      <GamePreview
                        game={game}
                        gameCover={`//images.igdb.com/igdb/image/upload/t_cover_big_2x/${game.cover?.image_id}.jpg`}
                        ratingImage={determineESRB(game)}
                        addGame={addGameHandler}
                        displayDetails={displayDetails}
                        hideDetails={closeGameWindow}
                        fetchGameDetails={(game) => {
                          fetchGameDetails(game);
                        }}
                        viewGameSoundtrack={(e, game) => {
                          viewGameSoundtrack(e, game);
                        }}
                        viewingPreview={viewingPreview}
                        openGame={() => setViewingPreview(true)}
                        closeGame={() => setViewingPreview(false)}
                      />
                    )}
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
