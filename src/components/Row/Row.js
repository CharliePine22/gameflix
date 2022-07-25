import React, { useState, useEffect } from 'react';
import rawgClient from '../../axios';
import GameDetails from './GameDetails/GameDetails';
import './Row.css';
import youtubeAPI from '../../youtubeAPI';

function Row({ title, fetchURL }) {
  const [games, setGames] = useState([]);
  const [youtubeGame, setYoutubeGame] = useState('');
  const [displayDetails, setDisplayDetails] = useState(false);

  useEffect(() => {
    // Grab games from each genre
    async function fetchData() {
      const request = await rawgClient.get(fetchURL);
      setGames(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchURL]);

  const fetchGameTrailer = async (game) => {
    console.log(game);
    // const request = await youtubeAPI.get('/search', {
    //   params: {
    //     q: game,
    //   },
    // });
    // console.log(request);
  };

  return (
    <div
      className='row'
      key={title}
      onMouseOver={() => setDisplayDetails(true)}
    >
      <h2>{title}</h2>
      <div className='row__posters'>
        {games.map(
          (game) =>
            game.background_image !== null && (
              <React.Fragment key={game.name}>
                <div
                  className='row__poster_container'
                  onClick={() => fetchGameTrailer(game.name)}
                >
                  <span className='row__poster_name'>{game.name}</span>
                  <img
                    onMouseOver={() => setDisplayDetails(true)}
                    onMouseLeave={() => setDisplayDetails(false)}
                    className='row__poster'
                    src={game.background_image}
                    alt={game.name}
                  />
                </div>
                {/* {displayDetails && <GameDetails />} */}
              </React.Fragment>
            )
        )}
      </div>
    </div>
  );
}

export default Row;
