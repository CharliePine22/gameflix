import React, { useState, useEffect } from 'react';
import rawgClient from '../../axios';
import axios from 'axios';
import { FaPause, FaPlay } from 'react-icons/fa';
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
  spotifyToken,
}) => {
  const [collection, setCollection] = useState([]);
  const [viewingSoundtrack, setViewingSoundtrack] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentGame, setCurrentGame] = useState('');
  const [currentPlaylist, setCurrentPlaylist] = useState([]);
  const [expandTitle, setExpandTitle] = useState(false);

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
      console.log(request.data.tracks);
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
    if (track.name == currentTrack.name) {
      resumePlayback();
    }
    playTrack(track);
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

  return (
    <div className='user_library__row'>
      <div className='user_library_title'>
        <h2 style={{ color: activeProfile.color }}>YOUR COLLECTION</h2>
        <MdKeyboardArrowRight className='user_library_arrow' />
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
                                  currentTrack?.name == track.name
                                    ? 'green'
                                    : 'white',
                                fontWeight:
                                  currentTrack?.name == track.name
                                    ? '600'
                                    : '400',
                              }}
                            >
                              {track.name}
                            </p>
                            {currentTrack.name !== track.name || !isPlaying ? (
                              <FaPlay
                                onClick={(e) =>
                                  selectTrackHandler(e, track.track)
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
        ))}
        <div className='user_library_add'>
          <span>+</span>
        </div>
      </div>
    </div>
  );
};

export default UserLibrary;
