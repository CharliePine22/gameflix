import React, { useState, useEffect } from 'react';
import rawgClient from '../../axios';
import './Row.css';

function Row({ title, fetchURL, todaysDate }) {
  const [games, setGames] = useState([]);

  useEffect(() => {
    // Grab games from each genre
    async function fetchData() {
      const request = await rawgClient.get(fetchURL);
      setGames(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchURL]);

  return (
    <div className='row' key={title}>
      <h2>{title}</h2>
      <div className='row__posters'>
        {games.map(
          (game) =>
            game.background_image !== null && (
              <img
                key={game.id}
                className={todaysDate ? 'row__main_poster' : 'row__poster'}
                src={game.background_image}
                alt={game.name}
              />
            )
        )}
      </div>
    </div>
  );
}

export default Row;
