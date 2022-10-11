import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPause, FaPlay, FaUpload, FaTrash, FaSteam } from 'react-icons/fa';
import { SiApplemusic } from 'react-icons/si';
import './UserLibrary.css';
import '../Row/Row.css';
import Placeholder from '../Placeholder/Placeholder';

const UserLibrary = ({
  activeProfile,
  playTrack,
  currentTrack,
  isPlaying,
  pausePlayback,
  resumePlayback,
  collection,
  setSelectedProfile,
  spotifyToken,
  setGameDetails,
  steamCollection,
  viewCollection,
}) => {
  const [viewingSoundtrack, setViewingSoundtrack] = useState(false);
  const [hoveringCollection, setHoveringCollection] = useState(false);
  const [completeCollection, setCompleteCollection] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentGame, setCurrentGame] = useState('');
  const [currentPlaylist, setCurrentPlaylist] = useState([]);
  const baseURL = process.env.REACT_APP_BASE_URL;
  // MongoDB Query Creds
  const userEmail = JSON.parse(localStorage.getItem('user')).email;
  const userProfile = JSON.parse(localStorage.getItem('profile')).name;
  const steamID = sessionStorage.getItem('steamID');

  // # SHOW 10 GAMES BASED ON FILTER AND THEN
  // FOR 10TH SPOT HAVE 3 GAMES STACKED LIKE CARDS AND SLIGHTLY FADE TO SHOW ALL
  //  SHOW ALL WILL LOOK LIKE STEAM

  const integrateSteamGames = async () => {
    if (completeCollection.length == 0 || !steamID) return;
    try {
      const gameNames = await Promise.all(
        completeCollection.map((game) => {
          let gameId;
          let imageURL;

          if (game.hasOwnProperty('cover')) {
            gameId = game.id;
            imageURL = `//images.igdb.com/igdb/image/upload/t_cover_big/${game.cover?.image_id}.jpg`;
          } else {
            gameId = game.appID;
            imageURL = `https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appID}/capsule_616x353.jpg`;
          }

          if (game.id == null) return;

          return axios.post(`${baseURL}/app/update_collection`, {
            email: userEmail,
            currentProfile: userProfile,
            game: {
              name: game.name,
              id: gameId,
              imageURL,
              playtime: game.playTime || 0,
            },
          });
        })
      );
      console.log(gameNames);
    } catch (error) {
      console.log(error);
    }
  };

  const compareCollections = (arr1, arr2) => {
    if (arr1 == [] || arr2 == []) return;
    return arr1.filter((object1) => {
      return !arr2.some((object2) => {
        return object1.name.toLowerCase() === object2.name.toLowerCase();
      });
    });
  };

  useEffect(() => {
    if (!steamID || !completeCollection) return;
    integrateSteamGames();
  }, [steamID, completeCollection]);

  useEffect(() => {
    if (steamCollection.length == 0) return;
    setCompleteCollection([
      ...compareCollections(steamCollection, collection),
      ...compareCollections(collection, steamCollection),
    ]);
  }, [steamCollection]);

  useEffect(() => {
    if (completeCollection.length > 0 && collection.length > 0) return;
    if (steamCollection.length == 0 && collection.length > 0)
      setCompleteCollection(collection);
  }, [steamCollection, collection]);

  const fetchGameOST = async (game) => {
    setViewingSoundtrack(false);
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
      setCurrentPlaylist(request.data.tracks);
      setViewingSoundtrack(true);
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

  const removeGameHandler = async (game) => {
    try {
      const request = await axios.put(`${baseURL}/app/remove_game`, {
        email: userEmail,
        currentProfile: userProfile,
        game: game.id,
      });
      console.log(request);
      localStorage.setItem('user', JSON.stringify(request.data.response));
      const currentProfile = request.data.response.profiles.filter((obj) => {
        return obj.name === userProfile;
      });
      localStorage.setItem('profile', JSON.stringify(currentProfile[0]));
      setSelectedProfile(currentProfile[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const formatTrackTitle = (title) => {
    return title.split('-')[0].split('(')[0];
  };

  // Sort collection alphabetically
  completeCollection.sort((a, b) =>
    a.name > b.name ? 1 : b.name > a.name ? -1 : 0
  );

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

  console.log(completeCollection);

  return (
    <div className='user_library__row'>
      <div className='user_library_title'>
        <h2 style={{ color: activeProfile.color }}>YOUR COLLECTION</h2>
        <div className='user_library__filter'>
          <p>Filter By</p>
        </div>
        {steamID && (
          <div className='steam_active_container'>
            <FaSteam className='steam_active_icon' />
          </div>
        )}
      </div>
      <div className='user_library__row_posters'>
        {completeCollection?.slice(0, 9).map(
          (game, i) =>
            game.id !== null && (
              <div className={`row__poster_wrapper`} key={game.name}>
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
                              onClick={() => setGameDetails(game.id)}
                              style={{ color: activeProfile.color }}
                            />
                            <FaTrash
                              className='user_library_trash_icon'
                              onClick={() => removeGameHandler(game)}
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
          {hoveringCollection && (
            <h2>
              View <br /> Collection
            </h2>
          )}
          <div className='user_library__stack_collection'>
            {completeCollection?.slice(9, 12).map((game, i) => (
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
