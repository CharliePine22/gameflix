import React, { useState, useEffect } from 'react';
import './UserCollection.css';
import { FaSistrix, FaHome, FaStar } from 'react-icons/fa';
import UserGame from '../UserGame/UserGame';
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
  updateCollection,
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [searchList, setSearchList] = useState([]);
  const [viewingList, setViewingList] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentGame, setCurrentGame] = useState(null);
  const [currentlyAdjusting, setCurrentlyAdjusting] = useState(null);
  const [changingGame, setChangingGame] = useState(false);
  // SPOTLIGHT STATES
  const [spotlightList, setSpotlightList] = useState([]);
  const [spotlightFilter, setSpotlightFilter] = useState('playtime');
  // COVER LIST STATES
  const [listFilter, setListFilter] = useState('alphabetical');
  const [filteredList, setFilteredList] = useState([]);
  // STATUS LIST STATES
  const [statusFilter, setStatusFilter] = useState('alphabetical');
  const [statusList, setStatusList] = useState([]);

  const { anchorPoint, showTitleMenu } = useContextMenu();
  const trophies = [platinumTrophy, goldTrophy, bronzeTrophy];

  // If user is typing, filter titles that reflect inputted value
  useEffect(() => {
    if (searchValue == '') {
      setSearchList([]);
      return;
    }
    const delaySearch = setTimeout(() => {
      const res = collection.filter((item) => item.name.includes(searchValue));
      setSearchList(res);
    }, 250);

    return () => clearTimeout(delaySearch);
  }, [searchValue]);

  // Listen for screen size to determine if user is on mobile
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 650) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Listen for spotlight filter change
  useEffect(() => {
    if (spotlightFilter == 'playtime') {
      setSpotlightList(
        [...collection].sort((a, b) => b[spotlightFilter] - a[spotlightFilter])
      );
    } else if (spotlightFilter == 'user_rating') {
      setSpotlightList(
        collection
          .filter((game) => game.user_rating)
          .sort((a, b) => b['user_rating'] - a['user_rating'])
      );
    } else {
      setSpotlightList(
        collection
          .filter((game) => game.achievements)
          .sort((a, b) => b['achievements'] - a['achievements'])
      );
    }
  }, [spotlightFilter, collection]);

  // Listen for list filter change
  useEffect(() => {
    if (listFilter == 'achievements') {
      setFilteredList(
        [...collection]
          .filter((game) => game.achievements)
          .sort((a, b) => b['achievements'] - a['achievements'])
      );
    } else if (listFilter == 'playtime') {
      setFilteredList([...collection].sort((a, b) => b.playtime - a.playtime));
    } else if (listFilter == 'status') {
      setFilteredList([...collection].sort((a, b) => b.status - a.status));
    } else if (listFilter == 'rating') {
      setFilteredList(
        [...collection]
          .filter((game) => game.user_rating)
          .sort((a, b) => b.user_rating - a.user_rating)
      );
    } else if (listFilter == 'trophies') {
      setFilteredList(
        [...collection]
          .filter((game) => game.trophies)
          .sort((a, b) => b.trophies - a.trophies)
      );
    } else {
      setFilteredList(
        [...collection].sort((a, b) =>
          a.name > b.name ? 1 : b.name > a.name ? -1 : 0
        )
      );
      console.log('Hello');
    }
  }, [listFilter]);

  // console.log(
  //   spotlightList
  //     .map((game) => game?.achievements?.filter((el) => el.achieved))
  //     .filter((item) => item.length)
  // );

  // Select which game is being viewed
  const viewGameHandler = (game) => {
    setCurrentGame(game);
  };

  // Open up the menu when the user right clicks
  const viewGameHeaders = (e, game) => {
    e.preventDefault();
    setCurrentlyAdjusting(game);
  };

  const removeGameHandler = (e) => {
    e.stopPropagation();
    if (
      Object.keys(currentGame).length > 0 &&
      currentlyAdjusting.id === currentGame.id
    )
      setCurrentGame(null);
    removeGame(currentlyAdjusting);
    setCurrentlyAdjusting(null);
  };

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
            display: isMobile && currentGame !== null && 'none',
          }}
        >
          <div className='user_collection__left_header'>
            <h2>
              <img
                style={{
                  height: '50px',
                  width: '50px',
                  borderRadius: '4px',
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
          </div>

          <ul
            className='user_collection__title_list'
            style={{
              height: viewingList && '100%',
              display: viewingList && 'flex',
            }}
          >
            <p
              className='user_collection__total'
              style={{
                color: 'white',
                paddingLeft: '7px',
                marginBottom: '5px',
                position: 'fixed',
                top: '132px',
                left: '1px',
                fontSize: '.95rem',
                width: '100%',
                height: '22px',
                background:
                  'linear-gradient(to right, rgba(25,25,25,.5) 0%,rgba(17,17,17,1) 46%,rgba(1,1,1,1) 50%,rgba(10,10,10,1) 53%,rgba(78,78,78,1) 76%,rgba(56,56,56,1) 87%,rgba(27,27,27,1) 100%)',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {searchList.length <= 0 ? 'All' : 'Results'} (
              <span style={{ fontSize: '.75rem' }}>
                {searchValue == '' ? collection.length : searchList.length}
              </span>
              )
            </p>

            {searchValue == '' ? (
              collection
                .sort((a, b) =>
                  a.name > b.name ? 1 : b.name > a.name ? -1 : 0
                )
                .map((game) => (
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
                    {showTitleMenu && (
                      <ul
                        onMouseEnter={(e) => e.stopPropagation(true)}
                        className='user_collection__game_context'
                        style={{
                          top: anchorPoint.y,
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
                  // 255 - 124
                ))
            ) : searchList.length > 0 ? (
              searchList.map((game) => (
                <li
                  className='title_list__item'
                  key={game.id}
                  onClick={() => viewGameHandler(game)}
                >
                  {' '}
                  <img src={game.imageURL} />
                  <p>{game.name}</p>
                </li>
              ))
            ) : (
              <p
                style={{
                  color: 'white',
                  fontSize: '3.5rem',
                  position: 'absolute',
                  top: '38%',
                  left: '26px',
                }}
              >
                No Matches
              </p>
            )}
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
                updateCollection={updateCollection}
              />
            </>
          )}

          {!currentGame && (
            // SPOTLIGHT
            <>
              <div className='user_collection__spotlight_wrapper'>
                <div className='spotlight_filters'>
                  {/* MOST PLAYED, HIGHEST RATED, MOST ACHIEVEMENTS */}
                  <h2 className='spotlight_filter'>
                    {spotlightFilter == 'playtime'
                      ? 'Most Played'
                      : spotlightFilter == 'user_rating'
                      ? 'Highest Rated'
                      : 'Most Achievements'}{' '}
                    {/* <FaAngleDown className='spotlight_filter__arrow' /> */}
                  </h2>
                  <ul className='spotlight_filter__options'>
                    <li
                      onClick={() => setSpotlightFilter('playtime')}
                      style={{
                        color: spotlightFilter == 'playtime' && 'white',
                      }}
                    >
                      Most Played
                    </li>
                    <li
                      onClick={() => setSpotlightFilter('user_rating')}
                      style={{
                        color: spotlightFilter == 'user_rating' && 'white',
                      }}
                    >
                      Highest Rated
                    </li>
                    <li
                      onClick={() => setSpotlightFilter('achievements')}
                      style={{
                        color: spotlightFilter == 'achievements' && 'white',
                      }}
                    >
                      Most Achievements
                    </li>
                  </ul>
                </div>
                <div className='user_collection__spotlight'>
                  {spotlightList.slice(0, 3).map((top, i) => (
                    <figure
                      key={top.id}
                      className='spotlight_container'
                      onClick={() => viewGameHandler(top)}
                    >
                      <img
                        className='spotlight_image'
                        src={top.banner_url || top.imageURL}
                      />
                      <img
                        className='spotlight_trophy_image'
                        src={trophies[i]}
                      />
                      <figcaption className='spotlight_details'>
                        <p>
                          {spotlightFilter == 'playtime'
                            ? `${Math.floor(top.playtime / 60)} hours`
                            : spotlightFilter == 'user_rating'
                            ? top.user_rating + '%'
                            : 'ACHIEVE'}{' '}
                        </p>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>

              {/* COVER LIST */}
              <div className='user_collection__list_container'>
                <div className='user_collection__list_filters'>
                  <p>
                    {listFilter == 'alphabetical'
                      ? 'All Games'
                      : listFilter == 'achievements'
                      ? 'All (Achievements)'
                      : listFilter == 'playtime'}
                  </p>
                  <ul className='user_collection__list_filters__list'>
                    <li
                      style={{ color: listFilter == 'alphabetical' && 'white' }}
                      onClick={() => setListFilter('alphabetical')}
                    >
                      All
                    </li>
                    <span> | </span>
                    <li
                      style={{ color: listFilter == 'achievements' && 'white' }}
                      onClick={() => setListFilter('achievements')}
                    >
                      Achievements
                    </li>
                    <span> | </span>

                    <li
                      style={{ color: listFilter == 'playtime' && 'white' }}
                      onClick={() => setListFilter('playtime')}
                    >
                      Playtime
                    </li>
                    <span> | </span>

                    <li
                      style={{ color: listFilter == 'rating' && 'white' }}
                      onClick={() => setListFilter('rating')}
                    >
                      Rating
                    </li>
                    <span> | </span>

                    <li
                      style={{ color: listFilter == 'status' && 'white' }}
                      onClick={() => setListFilter('status')}
                    >
                      Status
                    </li>
                    <span> | </span>

                    <li
                      style={{ color: listFilter == 'trophies' && 'white' }}
                      onClick={() => setListFilter('trophies')}
                    >
                      Trophies
                    </li>
                  </ul>
                  {listFilter == 'status' && (
                    <div className='user_collection__list_filters'>
                      <ul
                        className='user_collection__list_filters__list_status'
                        style={{ flexDirection: 'row' }}
                      >
                        <li>Backlog</li>
                        <span> | </span>
                        <li>Started</li>
                        <span> | </span>
                        <li>Playing</li>
                        <span> | </span>
                        <li>Finished</li>
                        <span> | </span>
                        <li>100%</li>
                        <span> | </span>
                        <li>Abandonded</li>
                        <span> | </span>
                        <li>Not Owned</li>
                      </ul>
                    </div>
                  )}
                </div>
                <ul className='user_collection__list'>
                  {!isMobile || (isMobile && searchValue == '')
                    ? filteredList.map((game) => (
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
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCollection;
