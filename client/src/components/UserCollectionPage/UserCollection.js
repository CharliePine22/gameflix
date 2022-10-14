import React, { useState, useEffect } from 'react';
import './UserCollection.css';
import { FaSistrix, FaHome, FaStar } from 'react-icons/fa';
import UserGame from '../UserGame/UserGame';

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
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [searchList, setSearchList] = useState([]);
  const [viewingList, setViewingList] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentlyViewing, setCurrentlyViewing] = useState(null);

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

  const viewGameHandler = (game) => {
    setCurrentlyViewing(game);
  };

  collection.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));

  return (
    <div className='user_collection__wrapper'>
      <div
        className='user_collection__container'
        style={{
          background: '#111',
        }}
        // style={{
        //   background: `linear-gradient(120deg, ${
        //     activeProfile.color || '#00adee'
        //   }, #000000)`,
        // }}
      >
        {/* LEFT SIDE */}
        <div
          className='user_collection__left'
          style={{
            height: viewingList && '250%',
            marginBottom: viewingList && '25px',
            display: isMobile && currentlyViewing && 'none',
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
            }}
          >
            {searchValue == ''
              ? collection.map((game) => (
                  <li
                    className='title_list__item'
                    key={game.id}
                    onClick={() => viewGameHandler(game)}
                  >
                    {' '}
                    <img src={game.imageURL} />
                    <p>{game.name}</p>
                    {game.name == activeProfile.favorite_game && (
                      <FaStar className='list_item_favorite' />
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
          {currentlyViewing !== null && (
            <UserGame
              game={currentlyViewing}
              activeProfile={activeProfile}
              closeStats={() => setCurrentlyViewing(null)}
            />
          )}
          {/* <div className='user_collection__spotlight'></div> */}
          {!currentlyViewing && (
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
                                  ? game.imageURL.replace('cover_big', '1080p')
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
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCollection;
