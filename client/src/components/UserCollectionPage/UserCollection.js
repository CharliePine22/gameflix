import React, { useState } from 'react';
import './UserCollection.css';
import { FaSistrix, FaAngleUp, FaHome } from 'react-icons/fa';

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
  const [viewingList, setViewingList] = useState(false);

  return (
    <div className='user_collection__wrapper'>
      <div className='user_collection__container'>
        {/* LEFT SIDE */}
        <div
          className='user_collection__left'
          style={{
            height: viewingList && '250%',
            marginBottom: viewingList && '25px',
          }}
        >
          <h2>
            <img
              style={{ height: '50px', width: '50px', borderRadius: '4px' }}
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
          <FaAngleUp
            className='user_collection__arrow'
            onClick={() => setViewingList(!viewingList)}
            style={{
              position: viewingList && 'absolute',
              transform: viewingList && 'rotate(0deg)',
            }}
          />

          <ul
            className='user_collection__title_list'
            style={{
              height: viewingList && '100%',
              display: viewingList && 'flex',
            }}
          >
            {collection.map((game) => (
              <li className='title_list__item' key={game.name}>
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
          <ul className='user_collection__list'>
            {collection.map((game) => (
              <li className='list_item' key={game.name}>
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
            ))}
          </ul>
        </div>
      </div>

      {/* <div className='user_collection__actions'>
        <button onClick={backToHome}>Back</button>
      </div> */}
    </div>
  );
};

export default UserCollection;
