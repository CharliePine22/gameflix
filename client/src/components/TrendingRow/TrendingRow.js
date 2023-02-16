import React, { useState, useEffect } from 'react';
import './TrendingRow.css';
import rawgClient from '../../axios';
import requests from '../../requests';
import Placeholder from '../Placeholder/Placeholder';
import GamePreview from '../Row/GamePreview/GamePreview';
import axios from 'axios';

const TrendingRow = ({ twitchToken, setGameDetails, trendingList }) => {
  const [games, setGames] = useState([]);
  const [currentGame, setCurrentGame] = useState('');
  const [displayDetails, setDisplayDetails] = useState(false);
  const [currentlyOpen, setCurrentlyOpen] = useState(null);
  const [imgsLoaded, setImgsLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const baseURL = process.env.REACT_APP_BASE_URL;
  let currentDate = Math.floor(new Date().getTime() / 1000);
  let trendingTitlesFetched = JSON.parse(sessionStorage.getItem('trending'));

  useEffect(() => {
    if (!twitchToken) return;
    if (trendingTitlesFetched && trendingTitlesFetched.length > 0) {
      setGames(trendingTitlesFetched);
      return;
    }
    // Grab games from each genre
    setLoading(true);
    async function fetchData() {
      try {
        let trendingTitles = [];
        const request = await axios.post(`${baseURL}/app/trending`, {
          token: twitchToken,
          currentDate: currentDate,
        });
        const uniqueTitles = new Set();
        request.data.filter(
          (item) =>
            !uniqueTitles.has(item.game.id) &&
            uniqueTitles.add(item.game.id).add(item.game)
        );

        uniqueTitles.forEach(
          (game) => typeof game == 'object' && trendingTitles.push(game)
        );

        setGames(trendingList);
        sessionStorage.setItem('trending', JSON.stringify(trendingList));
        setLoading(false);
        return request;
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [twitchToken, trendingList]);

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
    setGameDetails(game);
    setCurrentlyOpen(game.name);
    setCurrentGame(game);
  };

  const closeGameDetails = () => {
    setCurrentlyOpen(null);
    setCurrentGame(null);
  };

  games?.sort((a, b) =>
    a.rating_count > b.rating_count
      ? -1
      : b.rating_count > a.rating_count
      ? 1
      : 0
  );

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
                onClick={() => fetchGameDetails(game.game)}
              >
                {' '}
                {!loading && (
                  <>
                    <img
                      loading='lazy'
                      className='trending_row__poster'
                      src={`//images.igdb.com/igdb/image/upload/t_cover_big_2x/${game.game.cover?.image_id}.jpg`}
                      alt={game.name}
                    />
                  </>
                )}
              </div>
              {currentlyOpen === game.name && (
                <GamePreview
                  game={currentGame}
                  displayDetails={displayDetails}
                  hideDetails={closeGameDetails}
                />
              )}
            </div>
          </React.Fragment>
        ))}
        {loading ||
          (games.length == 0 && (
            <div className='row__loading_container'>
              {[...Array(10)].map((item, i) => (
                <div key={i} className='trending_row__placeholder__wrapper'>
                  <Placeholder key={i} delay={i} />
                </div>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default TrendingRow;
