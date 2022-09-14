import React, { useState, useEffect } from 'react';
import './TrendingRow.css';
import rawgClient from '../../axios';
import requests from '../../requests';
import Placeholder from '../Placeholder/Placeholder';
import GameDetails from '../Row/GameDetails/GameDetails';

const TrendingRow = () => {
  const [games, setGames] = useState([]);
  const [currentGame, setCurrentGame] = useState('');
  const [displayDetails, setDisplayDetails] = useState(false);
  const [currentlyOpen, setCurrentlyOpen] = useState(null);
  const [imgsLoaded, setImgsLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Grab games from each genre
    setLoading(true);
    async function fetchData() {
      const request = await rawgClient.get(requests[1].url);
      setGames(request.data.results);
      setLoading(false);
      return request;
    }
    fetchData();
  }, []);

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
    <div className='trending_row'>
      <h2>TRENDING TITLES</h2>

      <div className='trending_row__posters'>
        {games.map(
          (game, i) =>
            game.background_image !== null && (
              <React.Fragment key={game.name}>
                <div className='trending_row__poster_wrapper'>
                  <div className='trending_row__rank'>{i + 1}</div>
                  <div
                    className='trending_row__poster_container'
                    onClick={() => fetchGameDetails(game)}
                  >
                    {' '}
                    {!loading && (
                      <>
                        <span className='trending_row__poster_name'>
                          {game?.name}
                        </span>
                        <img
                          loading='lazy'
                          className='trending_row__poster'
                          src={game.background_image}
                          alt={game.name}
                        />
                      </>
                    )}
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
        {loading && (
          <div className='row__loading_container'>
            {[...Array(10)].map((item, i) => (
              <div key={i} className='trending_row__placeholder__wrapper'>
                <Placeholder key={i} delay={i} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrendingRow;
