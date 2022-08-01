import React, { useState, useEffect } from 'react';
import './MainRow.css';
import rawgClient from '../../axios';
import requests from '../../requests';
import { FaAngleUp } from 'react-icons/fa';
import Loading from '../LoadingAnimation/Loading';

const MainRow = () => {
  const [games, setGames] = useState([]);
  const [currentFilter, setCurrentFilter] = useState('Year');
  const [changingFilter, setChangingFilter] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Grab upcoming games based on current date filter
    setLoading(true);
    async function fetchData() {
      const request = await rawgClient.get(
        requests[0][`${currentFilter.toLowerCase()}Url`]
      );
      setGames(request.data.results);
      setLoading(false);
      return request;
    }
    fetchData();
    console.log(games);
  }, [currentFilter]);

  // Handler to change the filter type (Week, Month, Year)
  const changeFilterDate = (e) => {
    setCurrentFilter(e.target.innerText);
    setChangingFilter(false);
  };

  // Filter out any games with adult content/themes or smaller indie games
  const filterOutAdult = (game) => {
    // Grab game tags and game platforms lists
    const gameTags = game.tags;
    const gamePlatforms = game.parent_platforms;

    // If the only platform it's available on is PC, flag it for Indie as ost larger games come
    // out on at least 2 systems, It should also be avaialble for Xbox
    if (gamePlatforms.length == 1 && gamePlatforms[0].platform.name == 'PC') {
      return false;
    }
    // Loop through tag names to look for unwanted tags
    for (let tag of gameTags) {
      if (
        tag.name == 'Nudity' ||
        tag.name == 'Нагота' ||
        tag.name == 'Для взрослых' ||
        tag.name == 'Sexual Content' ||
        tag.name == 'Сексуальный контент'
      ) {
        return false;
      }
    }
    return true;
  };

  // Convert the YYYY-MM-DD to Month, Day, Year
  const convertDate = (date) => {
    let months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    let now = new Date(date.replace(/-/g, '/'));
    let currentDay = now.getDate();
    let formattedDay;

    // Give the numbered day the appropriate abbriviation
    switch (currentDay) {
      case 1:
      case 21:
      case 31:
        formattedDay = currentDay + 'st';
        break;
      case 2:
      case 22:
        formattedDay = currentDay + 'nd';
        break;
      case 3:
      case 23:
        formattedDay = currentDay + 'rd';
        break;
      // Most days have the th ending (28th) so set as default
      default:
        formattedDay = currentDay + 'th';
        break;
    }
    return (
      months[now.getMonth()] + ' ' + formattedDay + ', ' + now.getFullYear()
    );
  };

  // If the games are loaded or data isnt fetched
  if (!games || loading) return <Loading />;

  games.sort((a, b) => new Date(a.released) - new Date(b.released));

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
              game.background_image !== null &&
              filterOutAdult(game) == true && (
                <div
                  className='main_row__poster_container'
                  onClick={() => console.log(game)}
                  key={game.name}
                >
                  <div className='poster__gradient_top' />
                  <div className='poster__gradient_bottom' />
                  <span className='main__poster_released'>
                    {convertDate(game.released)}
                  </span>
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
