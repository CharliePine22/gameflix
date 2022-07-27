import React, { useState, useEffect } from 'react';
import './MainRow.css';
import rawgClient from '../../axios';
import requests from '../../requests';
import { FaAngleUp } from 'react-icons/fa';

const MainRow = () => {
  const [games, setGames] = useState([]);
  const [currentFilter, setCurrentFilter] = useState('Year');
  const [changingFilter, setChangingFilter] = useState(false);

  useEffect(() => {
    // Grab upcoming games based on current date filter
    async function fetchData() {
      const request = await rawgClient.get(
        requests[0][`${currentFilter.toLowerCase()}Url`]
      );
      setGames(request.data.results);
      return request;
    }
    fetchData();
  }, [currentFilter]);

  const changeFilterDate = (e) => {
    setCurrentFilter(e.target.innerText);
    setChangingFilter(false);
  };

  return (
    <div className='main_row'>
      <div
        className='main_row__filters'
        onMouseLeave={() => setChangingFilter(false)}
      >
        <h2>Coming Soon</h2>
        {/* Filter Type */}
        <p
          className='filters_filter'
          onMouseOver={() => setChangingFilter(true)}
        >
          {currentFilter}{' '}
          <FaAngleUp
            size={10}
            className={changingFilter ? 'arrow_active' : 'arrow'}
          />
        </p>{' '}
        {changingFilter && (
          <div className='filter_options'>
            <ul>
              <li
                style={{
                  backgroundColor: currentFilter == 'Week' ? 'white' : '',
                  color: currentFilter == 'Week' ? 'black' : '',
                }}
                onClick={changeFilterDate}
              >
                Week
              </li>
              <li
                style={{
                  backgroundColor: currentFilter == 'Month' ? 'white' : '',
                  color: currentFilter == 'Month' ? 'black' : '',
                }}
                onClick={changeFilterDate}
              >
                Month
              </li>
              <li
                style={{
                  backgroundColor: currentFilter == 'Year' ? 'white' : '',
                  color: currentFilter == 'Year' ? 'black' : '',
                }}
                onClick={changeFilterDate}
              >
                Year
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className='main_row__row_posters'>
        {games &&
          games.map(
            (game) =>
              game.background_image !== null && (
                <div className='main_row__poster_container' key={game.name}>
                  <span className='main__poster_name'>{game.name}</span>
                  <img
                    key={game.id}
                    className='main_poster'
                    src={game.background_image}
                    alt={game.name}
                  />
                </div>
              )
          )}
      </div>
    </div>
  );
};

export default MainRow;
