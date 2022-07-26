import React, { useState, useEffect } from 'react';
import rawgClient from '../../axios';
import GameDetails from './GameDetails/GameDetails';
import './Row.css';
import youtubeAPI from '../../youtubeAPI';

function Row({ title, fetchURL }) {
  const [games, setGames] = useState([]);
  const [youtubeGame, setYoutubeGame] = useState(null);
  const [currentGame, setCurrentGame] = useState('');
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

  // Grab trailer video from selected game
  const fetchGameTrailer = async (game) => {
    // const request = await youtubeAPI.get('/search', {
    //   params: {
    //     q: game + ' Trailer',
    //   },
    // });
    // setYoutubeGame(request.data.items[0]);
    setDisplayDetails(!displayDetails);
    setCurrentGame(game);
  };

  return (
    <div className='row' key={title}>
      <h2>{title}</h2>
      <div className='row__posters'>
        {games.map(
          (game) =>
            game.background_image !== null && (
              <React.Fragment key={game.name}>
                <div
                  className='row__poster_container'
                  onClick={() => fetchGameTrailer(game)}
                >
                  <span className='row__poster_name'>{game.name}</span>
                  <img
                    className='row__poster'
                    src={game.background_image}
                    alt={game.name}
                  />
                </div>
              </React.Fragment>
            )
        )}
        {displayDetails && (
          <GameDetails
            game={currentGame}
            videoId={youtubeGame}
            hideDetails={() => setDisplayDetails(false)}
          />
        )}
      </div>
    </div>
  );
}

export default Row;
