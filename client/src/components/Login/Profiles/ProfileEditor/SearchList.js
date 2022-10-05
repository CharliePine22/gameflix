import React, { useState } from 'react';
import './ProfileEditor.css';

const SearchList = ({ list, selectGame }) => {
  return (
    <div className='search_list_container'>
      <ul className='search_list'>
        {list.slice(0, 5).map((game) => (
          <li className='search_list_item' onClick={() => selectGame(game)}>
            <img className='item_thumbnail' src={game.cover.url} />
            <p className='item_title'>{game.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchList;
