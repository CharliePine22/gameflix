import React, { useState, useEffect } from 'react';
import './TrendingRow.css';
import Placeholder from '../Placeholder/Placeholder';
import axios from 'axios';

const TrendingRow = ({ twitchToken, setGameDetails }) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const baseURL = process.env.REACT_APP_BASE_URL;
  let currentDate = Math.floor(new Date().getTime() / 1000);
  let trendingTitlesFetched = JSON.parse(sessionStorage.getItem('trending'));

  useEffect(() => {
    if (!twitchToken) return;
    if (trendingTitlesFetched && trendingTitlesFetched.length > 0) {
      setGames(trendingTitlesFetched);
      setLoading(false);
      return;
    }
    // Grab games from each genre
    async function fetchData() {
      setLoading(true);
      try {
        let trendingTitles = [];
        const request = await axios.post(`${baseURL}/app/trending`, {
          token: twitchToken,
          currentDate: currentDate,
        });

        console.log(request);

        if (request.data.message) {
          localStorage.removeItem('twitch_auth');
          window.location.refresh();
        }

        const uniqueTitles = new Set();
        request.data.filter(
          (item) =>
            !uniqueTitles.has(item.game.id) &&
            uniqueTitles.add(item.game.id).add(item.game)
        );

        uniqueTitles.forEach(
          (game) => typeof game == 'object' && trendingTitles.push(game)
        );

        trendingTitles.sort(
          (a, b) =>
            b.release_dates.findLast((dates) => dates.date) -
              a.release_dates.findLast((dates) => dates.date) ||
            b.hypes - a.hypes
        );

        setGames(trendingTitles.slice(0, 10));

        sessionStorage.setItem(
          'trending',
          JSON.stringify(trendingTitles.slice(0, 10))
        );
        setLoading(false);
        return request;
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
    fetchData();
  }, [twitchToken]);

  if (loading) return null;
  // return (
  //   <div className='row__loading_container'>
  //     {[...Array(10)].map((item, i) => (
  //       <div key={i} className='trending_row__placeholder__wrapper'>
  //         <Placeholder key={i} delay={i} />
  //       </div>
  //     ))}
  //   </div>
  // );

  return (
    <div className='trending_row'>
      <h2>TRENDING TITLES</h2>

      <div className='trending_row__posters'>
        {games.map((game, i) => (
          <React.Fragment key={game.name}>
            <div className='trending_row__poster_wrapper'>
              <div className='trending_row__rank'>{i + 1}</div>
              <div
                className='trending_row__poster_container'
                style={{
                  marginLeft: (i == 9 && '160px') || (i == 0 && '65px'),
                }}
                onClick={() => setGameDetails(game)}
              >
                {' '}
                {!loading && (
                  <>
                    <img
                      loading='lazy'
                      className='trending_row__poster'
                      src={`https://images.igdb.com/igdb/image/upload/t_cover_big_2x/${game.cover?.image_id}.jpg`}
                      alt={game.name}
                    />
                  </>
                )}
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default TrendingRow;
