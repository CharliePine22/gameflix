import React from 'react';
import './UserCollection.css';

const UserCollection = ({ collection, activeProfile }) => {
  // console.log(activeProfile);
  console.log(collection);
  return (
    <div className='user_collection__wrapper'>
      <h2>{activeProfile.name}'s Collection</h2>
      <div className='user_collection__container'>
        <div className='user_collection_left'>
          <ul className='user_collection_list'>
            {collection.map((game) => (
              <li className='list_item'>
                {' '}
                <img src={game.imageURL} />
                <p>{game.name}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className='user_collection__actions'>
        <button></button>
      </div>
    </div>
  );
};

export default UserCollection;
