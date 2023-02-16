import React, { useState, useEffect } from 'react';
import './MainRow.css';
import axios from 'axios';
import { FaAngleUp } from 'react-icons/fa';
import Placeholder from '../Placeholder/Placeholder';

const MainRow = ({ twitchToken, setGameDetails }) => {
  const [games, setGames] = useState([]);
  const [currentFilter, setCurrentFilter] = useState('Week');
  const [changingFilter, setChangingFilter] = useState(false);
  const [currentlyViewing, setCurrentlyViewing] = useState(false);
  const [loading, setLoading] = useState(true);
  const baseURL = process.env.REACT_APP_BASE_URL;

  let todaysDate = new Date();
  const weekDateFormat = Math.floor(
    new Date(todaysDate.getTime() + 7 * 24 * 60 * 60 * 1000) / 1000
  );
  const monthDateFormat = Math.floor(
    new Date(
      new Date(weekDateFormat * 1000).setMonth(
        new Date(weekDateFormat * 1000).getMonth() + 1
      )
    ).getTime() / 1000
  );
  const yearDateFormat = Math.floor(
    new Date(
      new Date(monthDateFormat * 1000).setMonth(
        new Date(monthDateFormat * 1000).getMonth() + 12
      )
    ).getTime() / 1000
  );

  // use pagination (scroll api) to get all game titles and year. Maybe get it every 24 hours using a cron job. Cache it locally and use that to autocomplete game titles. That's what we do internally.

  const filterUniques = (list) => {
    const uniques = [];
    const filteredList = [];
    list.map((game) => {
      if (uniques.indexOf(game.game.name) === -1) {
        uniques.push(game.game.name);
        filteredList.push(game);
      }
    });
    return filteredList;
  };

  useEffect(() => {
    // Grab upcoming games based on current date filter
    if (!twitchToken) return;
    setLoading(true);
    async function fetchData() {
      let startDate;
      let targetDate;

      switch (currentFilter) {
        case 'Month':
          startDate = weekDateFormat;
          targetDate = monthDateFormat;
          break;
        case 'Year':
          startDate = monthDateFormat;
          targetDate = yearDateFormat;
          break;
        default:
          startDate = Math.floor(todaysDate.getTime() / 1000);
          targetDate = weekDateFormat;
          break;
      }

      try {
        const retries = 3;
        for (let i = 0; i < retries; i++) {
          try {
            const request = await axios.post(`${baseURL}/app/upcoming`, {
              token: twitchToken,
              currentDate: startDate,
              targetDate,
            });
            setGames(filterUniques(request.data));
            setLoading(false);
            break;
          } catch (error) {
            console.log('Issue fetching data');
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchData();
  }, [currentFilter, twitchToken]);

  // Handler to change the filter type (Week, Month, Year)
  const changeFilterDate = (e) => {
    setCurrentFilter(e.target.innerText);
    setChangingFilter(false);
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

    // Replace hypens with dashes to get correct date
    // Hypens returned the date previous from current due to some weird Date bug
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

  return (
    <div
      onMouseOver={() => setCurrentlyViewing(true)}
      onMouseOut={() => setCurrentlyViewing(false)}
      className='main_row'
    >
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
          !loading &&
          games.map((game, i) => (
            <div
              className={`main_row__poster_container ${
                currentlyViewing && 'dimmed'
              }`}
              onClick={() => setGameDetails(game.game)}
              key={game.id}
            >
              <h4 className='main__poster_released'>
                {convertDate(game.human)}
              </h4>
              <img
                key={game.id}
                className='main_poster'
                src={`//images.igdb.com/igdb/image/upload/t_cover_big_2x/${game.game.cover?.image_id}.jpg`}
                alt={game.name}
              />
            </div>
          ))}
        {loading && (
          <div className='main_row__loading_container'>
            {[...Array(4)].map((item, i) => (
              <div key={i} className='main_row__placeholder__wrapper'>
                <Placeholder key={i} delay={i} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MainRow;
