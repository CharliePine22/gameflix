import React, { useState, lazy, Suspense } from 'react';
import './Row.css';
import axios from 'axios';
import Placeholder from '../Placeholder/Placeholder';
import {
  FaPlay,
  FaPause,
  FaPlusSquare,
  FaGamepad,
  FaMusic,
} from 'react-icons/fa';
import { CiSquareMore } from 'react-icons/ci';
// ESRB Logos
import eRating from '../../assets/images/ESRB_E.png';
import tRating from '../../assets/images/ESRB_T.png';
import mRating from '../../assets/images/ESRB_M.png';
import rpRating from '../../assets/images/ESRB_RP.png';

const GamePreview = lazy(() => import('./GamePreview/GamePreview'));

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
  loading,
  hoverGame,
  hoverAway,
  currentHover,
}) {
  const [currentGame, setCurrentGame] = useState(null);
  const baseURL = process.env.REACT_APP_BASE_URL;
  const [currentPlaylist, setCurrentPlaylist] = useState([]);
  const [viewingSoundtrack, setViewingSoundtrack] = useState(false);
  const [viewingPreview, setViewingPreview] = useState(false);
  const [playlistLoading, setPlaylistLoading] = useState(false);

  const genreTitle = genreDetails[0][0];
  const genreList = genreDetails[0][1];

  const fetchGameOST = async (game) => {
    if (!spotifyToken) {
      setCurrentGame(null);
      setNotification(
        'ERROR',
        'Please connect to Spotify through the nav dropdown!'
      );
      return;
    }
    try {
      setPlaylistLoading(true);
      const request = await axios.get(`${baseURL}/app/spotify_album`, {
        params: {
          game: game.name,
          token: spotifyToken,
          baseURL,
        },
      });
      if (request.data.status !== 'OK') {
        console.log(request.data);

        setPlaylistLoading(false);
      } else {
        setCurrentGame(game.id);
        setCurrentPlaylist(request.data.tracks);
        setViewingSoundtrack(true);
        setPlaylistLoading(false);

        return request.data.tracks;
      }
    } catch (error) {
      console.log(error);
      console.log('OST FETCH ISSUE');
      setPlaylistLoading(false);
      return;
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
    setCurrentGame(game.id);
    fetchGameOST(game);
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
        return (
          <img
            className='row__poster__esrb_img'
            alt='esrb E rating'
            src={eRating}
          />
        );
      case 3:
      case 4:
      case 10:
        return (
          <img
            className='row__poster__esrb_img'
            alt='esrb T rating'
            src={tRating}
          />
        );
      case 5:
      case 11:
        return (
          <img
            className='row__poster__esrb_img'
            alt='esrb M rating'
            src={mRating}
          />
        );
      default:
        return (
          <img
            className='row__poster__esrb_img'
            alt='esrb RP rating'
            src={rpRating}
          />
        );
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
                      currentGameOpen == game.id && 'viewing_game'
                    }`}
                    style={{
                      zIndex:
                        currentGameOpen !== game.id &&
                        currentGameOpen !== null &&
                        '-1',
                    }}
                    onMouseOver={() => hoverGame(game.id)}
                    onMouseLeave={() =>
                      viewingSoundtrack ? hoverGame(game.id) : hoverAway()
                    }
                  >
                    {currentHover == game.id && !currentGameOpen && (
                      <div className='row__blur_wrapper'>
                        {!playlistLoading ? (
                          <div
                            className='row__blur_details'
                            style={{
                              display: currentGame == game.id && 'none',
                            }}
                          >
                            {/* ADD GAME */}
                            <div
                              className='row__blur_item'
                              onClick={(e) => addGameHandler(e, game)}
                            >
                              <FaPlusSquare className='blur_item_icon' />
                              <p>Add</p>
                            </div>
                            {/* GET DETAILS */}
                            <div
                              className='row__blur_item'
                              onClick={() => {
                                fetchGameDetails(game);
                              }}
                            >
                              <CiSquareMore className='blur_item_icon more' />
                              <p>See Details</p>
                            </div>
                            {/* GET SOUNDTRACK */}
                            <div
                              onClick={(e) => viewGameSoundtrack(e, game)}
                              className='row__blur_item'
                            >
                              <FaMusic className='blur_item_icon music' />
                              <p>Play Soundtrack</p>
                            </div>
                            {/* VIEW 3D CASE */}
                            <div
                              className='row__blur_item'
                              onClick={() => openGame(game)}
                            >
                              <FaGamepad className='blur_item_icon' />
                              <p>View Case</p>
                            </div>
                          </div>
                        ) : (
                          <div className='playlist_loading'>
                            <div className='playlist_loading_dot' />
                            <div className='playlist_loading_dot' />
                            <div className='playlist_loading_dot' />
                          </div>
                        )}
                        {viewingSoundtrack && currentGame == game.id && (
                          <div className='soundtrack_container'>
                            <span onClick={(e) => closeGameSoundtrack(e)}>
                              ←
                            </span>
                            <h3>Spotify OST</h3>
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
                        )}
                      </div>
                    )}
                    <div className='row__poster_container'>
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
                            src={`https://images.igdb.com/igdb/image/upload/t_cover_big_2x/${game.cover?.image_id}.jpg`}
                            alt={game.name + ' cover image'}
                          />
                        </div>
                      </>
                    </div>
                    {currentGameOpen === game.id && (
                      <Suspense fallback={<>...</>}>
                        <GamePreview
                          game={game}
                          gameCover={`https://images.igdb.com/igdb/image/upload/t_1080p_2x/${game.cover?.image_id}.jpg`}
                          ratingImage={determineESRB(game)}
                          addGame={addGameHandler}
                          viewingPreview={viewingPreview}
                          openGame={() => setViewingPreview(true)}
                          closeGame={() => setViewingPreview(false)}
                        />
                      </Suspense>
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
