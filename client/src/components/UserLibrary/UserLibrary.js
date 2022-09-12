import React, { useState, useEffect } from 'react';
import rawgClient from '../../axios';
import axios from 'axios';
import { FaPause, FaPlay, FaUpload } from 'react-icons/fa';
import { SiApplemusic } from 'react-icons/si';
import './UserLibrary.css';
import '../Row/Row.css';
import { MdKeyboardArrowRight } from 'react-icons/md';

const UserLibrary = ({
  activeProfile,
  playTrack,
  currentTrack,
  isPlaying,
  pausePlayback,
  resumePlayback,
  updatingUser,
  finishUpdatingUser,
}) => {
  const [collection, setCollection] = useState([]);
  const [viewingSoundtrack, setViewingSoundtrack] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentGame, setCurrentGame] = useState('');
  const [gameName, setGameName] = useState('');
  const [imageLink, setImageLink] = useState('');
  const [updatingCollection, setUpdatingCollection] = useState(false);
  const [updatingImage, setUpdatingImage] = useState(false);
  const [currentPlaylist, setCurrentPlaylist] = useState([]);
  const [expandTitle, setExpandTitle] = useState(false);
  const loggedInUser = JSON.parse(localStorage.getItem('user'));

  // MongoDB Query Creds
  const userEmail = JSON.parse(localStorage.getItem('user')).email;
  const userProfile = JSON.parse(localStorage.getItem('profile')).name;
  const spotifyToken = localStorage.getItem('spotify_token');
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

  // Add game to collection or upload custom game image
  const updateCollectionHandler = (method) => {
    if (method == 'update') {
      setUpdatingCollection(true);
    } else {
      setUpdatingImage(true);
    }
  };

  const addGameHandler = async (e, game) => {
    e.preventDefault();
    updatingUser();
    if (collection.includes(game)) {
      console.log('GAME IN LIBRARY');
      return;
    }
    try {
      await axios.post('/app/update_collection', {
        email: userEmail,
        currentProfile: userProfile,
        gameTitle: game,
      });
    } catch (error) {
      console.log(error);
    }
    setUpdatingCollection(false);
    finishUpdatingUser();
    const currentProfile = loggedInUser.profiles.filter((obj) => {
      return obj.name === activeProfile.name;
    });
    localStorage.setItem('profile', JSON.stringify(currentProfile[0]));
    setCollection(currentProfile[0].collection);
  };

  const formatTrackTitle = (title) => {
    return title.split('-')[0].split('(')[0];
  };

  useEffect(() => {
    setLoading(true);
    const fetchUserCollection = async () => {
      const gameNames = await Promise.all(
        activeProfile.collection.map((game) => {
          return rawgClient.get(
            `/games?key=${process.env.REACT_APP_RAWG_API_KEY}&search=${game}`
          );
        })
      );
      setCollection(gameNames.map(({ data }) => data.results[0]));
      setLoading(false);
    };
    fetchUserCollection();
  }, [activeProfile]);

  collection.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));

  return (
    <div className='user_library__row'>
      <div
        className='user_library_title'
        onMouseOver={() => setExpandTitle(true)}
        onMouseOut={() => setExpandTitle(false)}
      >
        <h2 style={{ color: activeProfile.color }}>YOUR COLLECTION</h2>
        <MdKeyboardArrowRight
          className={`user_library_arrow ${expandTitle ? 'extended' : ''}`}
        />
        <p className='user_library_view_all'>View All</p>
      </div>
      <div className='row__posters'>
        {collection.map((game) => (
          <div className='row__poster_wrapper' key={game.name}>
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
                    <SiApplemusic
                      onClick={(e) => viewGameSoundtrack(e, game)}
                      className='row__poster_music_icon'
                    />
                    <FaUpload
                      className='user_library_upload_icon'
                      onClick={() => updateCollectionHandler('upload')}
                    />
                    <span
                      className='row__poster_name'
                      style={{ color: activeProfile.color, fontWeight: 800 }}
                    >
                      {game.name}
                    </span>
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
                    <h3>{game.name} Spotify OST</h3>
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
                                onClick={(e) => selectTrackHandler(e, track)}
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
        ))}

        {/* COLLECTION UPDATE */}
        <div
          className='user_library_add'
          onClick={() => updateCollectionHandler('update')}
        >
          <span>+</span>
        </div>
        {updatingCollection && (
          <div
            className={`user_library_modal ${
              !updatingCollection || !updatingImage ? 'modal_hidden' : ''
            }`}
          >
            <h3>{updatingCollection ? 'GAME NAME' : 'IMAGE LINK'}</h3>
            <div className='modal_content'>
              <div className='modal_form'>
                <input
                  value={updatingCollection ? gameName : imageLink}
                  onChange={(e) =>
                    updatingCollection
                      ? setGameName(e.target.value)
                      : setImageLink(e.target.value)
                  }
                />
                <button onClick={(e) => addGameHandler(e, gameName)}>
                  Submit
                </button>
                <button
                  onClick={() =>
                    updatingCollection
                      ? setUpdatingCollection(false)
                      : setUpdatingImage(false)
                  }
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserLibrary;
