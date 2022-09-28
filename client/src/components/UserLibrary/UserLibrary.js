import React, { useState, useEffect } from 'react';
import rawgClient from '../../axios';
import axios from 'axios';
import { FaPause, FaPlay, FaUpload, FaTrash } from 'react-icons/fa';
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
  collection,
  setSelectedProfile,
  spotifyToken,
  setGameDetails,
}) => {
  const [viewingSoundtrack, setViewingSoundtrack] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentGame, setCurrentGame] = useState('');
  const [currentPlaylist, setCurrentPlaylist] = useState([]);
  const [expandTitle, setExpandTitle] = useState(false);
  const baseURL = process.env.REACT_APP_BASE_URL;

  // MongoDB Query Creds
  const userEmail = JSON.parse(localStorage.getItem('user')).email;
  const userProfile = JSON.parse(localStorage.getItem('profile')).name;

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
        gameTitle: game.name,
      });
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
                      onClick={() => setGameDetails(game)}
                    />
                    <FaTrash
                      className='user_library_trash_icon'
                      onClick={() => removeGameHandler(game)}
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
                    <h3>Spotify OST</h3>
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
      </div>
    </div>
  );
};

export default UserLibrary;
