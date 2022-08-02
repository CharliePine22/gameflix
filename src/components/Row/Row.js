import React, { useState, useEffect } from 'react';
import rawgClient from '../../axios';
import GameDetails from './GameDetails/GameDetails';
import './Row.css';
import youtubeAPI from '../../youtubeAPI';

function Row({ title, fetchURL }) {
  const [games, setGames] = useState([]);
  const [currentGame, setCurrentGame] = useState('');
  const [displayDetails, setDisplayDetails] = useState(false);
  const [currentlyOpen, setCurrentlyOpen] = useState(null);
  const [imgsLoaded, setImgsLoaded] = useState(false);

  useEffect(() => {
    // Grab games from each genre
    async function fetchData() {
      const request = await rawgClient.get(fetchURL);
      setGames(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchURL]);

  // useEffect(() => {
  //   const loadImage = image => {
  //     return new Promise((resolve, reject) => {
  //       const loadImg = new Image()
  //       loadImg.src = image.url
  //       // wait 2 seconds to simulate loading time
  //       loadImg.onload = () =>
  //         setTimeout(() => {
  //           resolve(image.url)
  //         }, 2000)

  //       loadImg.onerror = err => reject(err)
  //     })
  //   }

  //   Promise.all(IMAGES.map(image => loadImage(image)))
  //     .then(() => setImgsLoaded(true))
  //     .catch(err => console.log("Failed to load images", err))
  // }, [])

  // Grab trailer video from selected game
  const fetchGameDetails = (game) => {
    console.log(game);
    setCurrentlyOpen(game.name);
    setCurrentGame(game);
  };

  const closeGameDetails = () => {
    setCurrentlyOpen(null);
    setCurrentGame(null);
  };

  return (
    <div className='row' key={title}>
      <h2>{title}</h2>

      <div className='row__posters'>
        {games.map(
          (game) =>
            game.background_image !== null && (
              <React.Fragment key={game.name}>
                <div className='row__poster_wrapper'>
                  <div
                    className='row__poster_container'
                    // onMouseEnter={() => fetchGameDetails(game)}
                    onClick={() => fetchGameDetails(game)}
                  >
                    <span className='row__poster_name'>{game?.name}</span>
                    <img
                      loading='lazy'
                      className='row__poster'
                      src={game.background_image}
                      alt={game.name}
                    />
                  </div>
                  {currentlyOpen === game.name && (
                    <GameDetails
                      game={currentGame}
                      displayDetails={displayDetails}
                      hideDetails={closeGameDetails}
                    />
                  )}
                </div>
              </React.Fragment>
            )
        )}
      </div>
    </div>
  );
}

export default Row;
