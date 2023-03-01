import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPause, FaPlay, FaUpload, FaTrash, FaSteam } from 'react-icons/fa';
import { SiApplemusic, SiCounterstrike } from 'react-icons/si';
import './UserLibrary.css';
import '../Row/Row.css';
import Placeholder from '../Placeholder/Placeholder';

const UserLibrary = ({
  activeProfile,
  setSelectedProfile,
  playTrack,
  currentTrack,
  isPlaying,
  pausePlayback,
  resumePlayback,
  collection,
  spotifyToken,
  setGameDetails,
  steamCollection,
  viewCollection,
  setCompleteCollection,
  removeGame,
  setNotification,
}) => {
  const [viewingSoundtrack, setViewingSoundtrack] = useState(false);
  const [hoveringCollection, setHoveringCollection] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentGame, setCurrentGame] = useState('');
  const [currentPlaylist, setCurrentPlaylist] = useState([]);
  const baseURL = process.env.REACT_APP_BASE_URL;
  // MongoDB Query Creds
  const userEmail = localStorage.getItem('user');
  const userProfile = localStorage.getItem('profile');
  const steamID = localStorage.getItem('steamID');
  const steamConnected = localStorage.getItem('steamConn');

  // FOR 10TH SPOT HAVE 3 GAMES STACKED LIKE CARDS AND SLIGHTLY FADE TO SHOW ALL
  //  SHOW ALL WILL LOOK LIKE STEAM
  const integrateSteamGames = async (updatedCollection) => {
    // if (!steamID) return;
    try {
      const gameNames = await Promise.all(
        updatedCollection.map((game) => {
          const existingTitle = collection.some((element) => {
            return element.id === game.appID;
          });

          if (!existingTitle) {
            let gameId;
            let imageURL;
            let origin;

            if (game.hasOwnProperty('cover')) {
              origin = 'gameflix';
              gameId = game.id;
              imageURL = `//images.igdb.com/igdb/image/upload/t_cover_big/${game.cover?.image_id}.jpg`;
            } else {
              origin = 'steam';
              gameId = game.appID;
              imageURL = `https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appID}/capsule_616x353.jpg`;
            }
            return axios.post(`${baseURL}/app/update_collection`, {
              email: userEmail,
              currentProfile: userProfile,
              name: game.name,
              id: gameId,
              imageURL,
              playtime: game.playTime || 0,
              origin: origin,
            });
          }
        })
      );

      const lastItem = gameNames.filter((item) => item !== undefined);
      const response = lastItem[lastItem.length - 1].data.response;
      console.log(response);
      setCompleteCollection(updatedCollection);
      localStorage.setItem('user', JSON.stringify(response.email));
      const currentProfile = response.profiles.filter((obj) => {
        return obj.name === userProfile;
      });
      localStorage.setItem('profile', JSON.stringify(currentProfile[0].name));
      localStorage.setItem('steamConn', true);
      setSelectedProfile(currentProfile[0]);
      console.log('UH OH');
      // setNotification({
      //   message: `Steam games sucessfully added to your collection!`,
      //   status: 'SUCCESS',
      // });
    } catch (error) {
      console.log(error);
      return;
    }
  };

  // List of every steam game to compare to already owned
  useEffect(() => {
    if (
      steamCollection.length == 0 ||
      !steamCollection ||
      !steamID ||
      steamConnected ||
      typeof steamCollection == 'string'
    )
      return;
    const steamGames = new Map(
      steamCollection.map(({ name, ...rest }) => [name.toLowerCase(), rest])
    );

    // If user has game in both gameflix and steam library, dont push gameflix game
    const newGames = collection.reduce(function (result, game) {
      if (!steamGames.get(game.name.toLowerCase())) {
        result.push(game);
      }
      return result;
    }, []);

    integrateSteamGames([...steamCollection, ...newGames]);
  }, [steamID, collection]);

  const fetchGameOST = async (game) => {
    setViewingSoundtrack(false);
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
      console.log('OST FETCH ISSUE');
    }
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
    } else {
      playTrack(track);
    }
  };

  const formatTrackTitle = (title) => {
    return title.split('-')[0].split('(')[0];
  };

  // Sort collection alphabetically
  collection?.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));

  // Display loading placeholder while fetching data
  if (!collection || collection.length == 0) {
    return (
      <div className='user_library__row'>
        {[...Array(5)].map((item, i) => (
          <div key={i} className='row__poster_wrapper'></div>
        ))}
      </div>
    );
  } else if (collection && collection.length == 0) {
    <div>No AVAILABLE GAMES</div>;
  }

  return (
    <div className='user_library__row'>
      <div className='user_library_title'>
        <h2 style={{ color: activeProfile.color }}>YOUR COLLECTION</h2>
        {/* <div className='user_library__filter'>
          <p>Filter By</p>
        </div> */}
        {steamID && (
          <div className='steam_active_container'>
            <FaSteam className='steam_active_icon' />
          </div>
        )}
      </div>
      <div className='user_library__row_posters'>
        {collection?.slice(0, 9).map(
          (game, i) =>
            game.id !== null && (
              <div className={`row__poster_wrapper`} key={game.id}>
                <div
                  className={`row__poster_container ${
                    viewingSoundtrack && currentGame == game.name ? 'flip' : ''
                  }`}
                >
                  {' '}
                  {!loading && (
                    <>
                      {/* FRONT OF POSTER */}
                      <div className='row__poster_front'>
                        {i < 10 && (
                          <>
                            <SiApplemusic
                              onClick={(e) => viewGameSoundtrack(e, game)}
                              className='row__poster_music_icon'
                              style={{ color: activeProfile.color }}
                            />
                            <FaUpload
                              className='user_library_upload_icon'
                              onClick={() => setGameDetails(game)}
                              style={{ color: activeProfile.color }}
                            />
                            <FaTrash
                              className='user_library_trash_icon'
                              onClick={() => removeGame(game)}
                              style={{ color: activeProfile.color }}
                            />
                          </>
                        )}
                        <img
                          loading='lazy'
                          className='row__poster'
                          src={game.imageURL}
                          alt={game.name}
                        />
                      </div>
                      {/* BACK OF POSTER */}
                      <div
                        className='row__poster_back'
                        onClick={closeGameSoundtrack}
                      >
                        <h3>Spotify OST</h3>
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
                                  {track.name}
                                  {/* {formatTrackTitle(track.name)} */}
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
                                  <FaPause onClick={pausePlayback} />
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )
        )}
        <div
          className='user_library__stack_collection_container'
          onMouseOver={() => setHoveringCollection(true)}
          onMouseOut={() => setHoveringCollection(false)}
        >
          {hoveringCollection && collection.length > 10 && (
            <h2>
              View <br /> Collection
            </h2>
          )}
          <div className='user_library__stack_collection'>
            {collection.length > 10 &&
              collection?.slice(9, 12).map((game, i) => (
                <div
                  className='row__poster_wrapper stack_card'
                  key={game.name}
                  onClick={viewCollection}
                >
                  <div
                    className='row__poster_container'
                    style={{ boxShadow: 'none' }}
                  >
                    {!loading && (
                      <div className='row__poster_front'>
                        <img
                          loading='lazy'
                          className='row__poster'
                          src={game.imageURL}
                          alt={game.name}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
        {!collection ||
          (collection.length == 0 &&
            [...Array(4)].map((item, i) => (
              <div key={i} className='main_row__placeholder__wrapper'>
                <Placeholder key={i} delay={i} />
              </div>
            )))}
        {/* COLLECTION UPDATE */}
      </div>
    </div>
  );
};

export default UserLibrary;
