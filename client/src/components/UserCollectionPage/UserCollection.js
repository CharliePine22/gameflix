import React, { useState, useEffect } from 'react';
import './UserCollection.css';
import { FaSistrix, FaHome, FaStar } from 'react-icons/fa';
import UserGame from '../UserGame/UserGame';
import Notification from '../Notification/Notification';
import useContextMenu from '../../hooks/useContextMenu';
import bronzeTrophy from '../../assets/images/ps-trophy-bronze.png';
import goldTrophy from '../../assets/images/ps-trophy-gold.png';
import platinumTrophy from '../../assets/images/ps-trophy-platinum.png';

const UserCollection = ({
  collection,
  activeProfile,
  backToHome,
  playTrack,
  currentTrack,
  isPlaying,
  pausePlayback,
  resumePlayback,
  spotifyToken,
  setSelectedProfile,
  removeGame,
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [searchList, setSearchList] = useState([]);
  const [viewingList, setViewingList] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentGame, setCurrentGame] = useState(null);
  const [currentlyAdjusting, setCurrentlyAdjusting] = useState(null);
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [changingGame, setChangingGame] = useState(false);
  const [displayNotification, setDisplayNotification] = useState(false);
  const [notification, setNotification] = useState({ status: '', message: '' });
  const [alerttedUser, setAlerttedUser] = useState(false);
  const [spotlightFilter, setSpotlightFilter] = useState('playtime');
  const { anchorPoint, showTitleMenu } = useContextMenu();
  const trophies = [platinumTrophy, goldTrophy, bronzeTrophy];

  const npsso =
    'SmCxqqTxQJ11ZOVQFQo4ZBJZx1OEsffbmwC2hpUHusLeEHvoAyuMQFIIegudospP';

  // If user is typing, filter titles that reflect inputted value
  useEffect(() => {
    if (searchValue == '') return;
    const delaySearch = setTimeout(() => {
      const res = collection.filter((item) => item.name.includes(searchValue));
      setSearchList(res);
    }, 250);

    return () => clearTimeout(delaySearch);
  }, [searchValue]);

  // Listen for screen size to determine if user is on mobile
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 533) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Select which game is being viewed
  const viewGameHandler = (game) => {
    setCurrentGame(game);
  };

  // Open up the menu when the user right clicks
  const viewGameHeaders = (e, game) => {
    e.preventDefault();
    setCurrentlyAdjusting(game);
    setContextMenuVisible(true);
  };

  const removeGameHandler = (e) => {
    e.stopPropagation();
    setContextMenuVisible(false);
    console.log(currentlyAdjusting);
    if (
      Object.keys(currentGame).length > 0 &&
      currentlyAdjusting.id === currentGame.id
    )
      setCurrentGame(null);
    const gameRemoval = removeGame(currentlyAdjusting);
    console.log(gameRemoval);
    setCurrentlyAdjusting(null);
  };

  const mostPlayed = collection
    .sort((a, b) =>
      a.playtime > b.playtime ? -1 : b.playtime > a.playtime ? 1 : 0
    )
    .slice(0, 3);

  const highestRated = collection
    .sort((a, b) =>
      a.user_rating > b.user_rating ? -1 : b.user_rating > a.user_rating ? 1 : 0
    )
    .slice(0, 3);

  collection.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));

  return (
    <div className='user_collection__wrapper'>
      <div
        className='user_collection__container'
        style={{
          background: '#111',
        }}
      >
        {/* LEFT SIDE */}
        <div
          className='user_collection__left'
          style={{
            height: viewingList && '250%',
            marginBottom: viewingList && '25px',
            display: isMobile && currentGame && 'none',
          }}
        >
          <h2>
            <img
              style={{
                height: '50px',
                width: '50px',
                borderRadius: '4px',
                // marginRight: '5px',
              }}
              src={activeProfile.avatar}
            />
            {activeProfile.name}'s Collection
            <FaHome
              className='user_collection__home_icon'
              onClick={backToHome}
            />
          </h2>

          <div className='user_collection__search'>
            <FaSistrix className='user_collection__search_icon' />
            <input
              className='user_collection__search_input'
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>

          <ul
            className='user_collection__title_list'
            style={{
              height: viewingList && '100%',
              display: viewingList && 'flex',
              overflowY: showTitleMenu ? 'hidden' : 'scroll',
            }}
          >
            {searchValue == ''
              ? collection.map((game) => (
                  <li
                    className='title_list__item'
                    key={game.id}
                    onClick={() => viewGameHandler(game)}
                    onContextMenu={(e) => viewGameHeaders(e, game)}
                    style={{
                      background: currentGame?.id == game.id && '#9147ff',
                    }}
                  >
                    {' '}
                    <img src={game.imageURL} />
                    <p>{game.name}</p>
                    {game.name == activeProfile.favorite_game && (
                      <FaStar className='list_item_favorite' />
                    )}
                    {showTitleMenu && contextMenuVisible && (
                      <ul
                        onMouseEnter={(e) => e.stopPropagation(true)}
                        className='user_collection__game_context'
                        style={{
                          top: anchorPoint.y + 5,
                          left: anchorPoint.x,
                          zIndex: 6,
                        }}
                      >
                        <li className='banner_context__item'>
                          Add to Favorites
                        </li>
                        <li
                          className='banner_context__item'
                          onClick={(e) => removeGameHandler(e, game)}
                        >
                          Delete Game
                        </li>
                      </ul>
                    )}
                  </li>
                ))
              : searchList.map((game) => (
                  <li
                    className='title_list__item'
                    key={game.id}
                    onClick={() => viewGameHandler(game)}
                  >
                    {' '}
                    <img src={game.imageURL} />
                    <p>{game.name}</p>
                  </li>
                ))}
          </ul>
          <div className='user_collection__actions'>
            <button onClick={backToHome}>Back</button>
          </div>
        </div>
        {/* RIGHT SIDE */}
        <div className='user_collection__right'>
          {currentGame !== null && (
            <>
              <UserGame
                game={currentGame}
                activeProfile={activeProfile}
                closeStats={() => setCurrentGame(null)}
                setProfile={(profile) => setSelectedProfile(profile)}
                setCurrentGame={(game) => setCurrentGame(game)}
                setNotification={(message, status) => {
                  setNotification(message, status);
                }}
              />
              {/* <Notification
                notification={notification}
                displayNotification={() => setDisplayNotification(true)}
                hideNotification={() => {
                  setDisplayNotification(false);
                  setNotification({ message: '', status: '' });
                }}
              /> */}
            </>
          )}

          {!currentGame && (
            // SPOTLIGHT
            <>
              <div className='user_collection__spotlight_wrapper'>
                <div className='spotlight_filters'>
                  <h3 className='spotlight_filter'>Most Played</h3>
                </div>
                <div className='user_collection__spotlight'>
                  {highestRated.map((top, i) => (
                    <figure className='spotlight_container'>
                      <img
                        className='spotlight_image'
                        src={top.banner_url || top.imageURL}
                      />
                      <img
                        className='spotlight_trophy_image'
                        src={trophies[i]}
                      />
                      <figcaption className='spotlight_details'>
                        <p>{Math.floor(top.playtime / 60)} hours</p>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>

              {/* COVER LIST */}
              <ul className='user_collection__list'>
                {!isMobile || (isMobile && searchValue == '')
                  ? collection.map((game) => (
                      <li
                        className='list_item'
                        key={game.id}
                        onClick={() => viewGameHandler(game)}
                      >
                        <div className='user_collection__poster_container'>
                          <div className='gradient' />
                          <>
                            {/* FRONT OF POSTER */}
                            <div className='user_collection__poster_front'>
                              <img
                                loading='lazy'
                                className='user_collection__poster'
                                src={game.imageURL}
                                alt={game.name}
                              />
                            </div>
                          </>
                        </div>
                      </li>
                    ))
                  : searchList.map((game) => (
                      <li className='list_item' key={game.id}>
                        <div className='user_collection__poster_container'>
                          <div className='gradient' />
                          <>
                            {/* FRONT OF POSTER */}
                            <div className='user_collection__poster_front'>
                              <img
                                loading='lazy'
                                className='user_collection__poster'
                                src={
                                  isMobile
                                    ? game.imageURL.replace(
                                        'cover_big',
                                        '1080p'
                                      )
                                    : game.imageURL
                                }
                                alt={game.name}
                              />
                            </div>
                          </>
                        </div>
                      </li>
                    ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCollection;
