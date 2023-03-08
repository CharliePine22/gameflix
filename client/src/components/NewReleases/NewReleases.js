import React, { useState, useEffect } from 'react';
import './NewReleases.css';
import Placeholder from '../Placeholder/Placeholder';
import GamePreview from '../Row/GamePreview/GamePreview';
import axios from 'axios';

const NewReleases = ({ twitchToken, setGameDetails }) => {
  const [games, setGames] = useState([]);
  const [currentGame, setCurrentGame] = useState('');
  const [displayDetails, setDisplayDetails] = useState(false);
  const [loading, setLoading] = useState(false);
  const baseURL = process.env.REACT_APP_BASE_URL;
  const newReleases = [];

  useEffect(() => {
    if (!twitchToken) return;

    async function fetchNewReleases() {
      setLoading(true);

      try {
        const scrape_request = await axios.get(`${baseURL}/steam/new_releases`);
        console.log(scrape_request);
        // console.log(scrape_request.data);
        return;
        for (let title of scrape_request.data) {
          const splitTitle = title.trim().split(' ');
          newReleases.push(
            splitTitle
              .slice(0, splitTitle.length - 3)
              .join(' ')
              .trim()
          );
        }
        console.log(newReleases);
        const newReleasesData = await Promise.all(
          newReleases.map(async (game) => {
            const res = await axios.post(
              `${baseURL}/app/search_trending_game`,
              {
                token: twitchToken,
                gameName: game,
              }
            );
            return res.data[0].game;
          })
        );
        setGames(newReleasesData);
        setLoading(false);
        return newReleasesData;
      } catch (error) {
        console.log(error);
      }
    }
    fetchNewReleases();
  }, [twitchToken]);

  // Grab trailer video from selected game
  // const fetchGameDetails = (game) => {
  //   setGameDetails(game);
  //   setCurrentlyOpen(game.name);
  //   setCurrentGame(game);
  // };

  const closeGameDetails = () => {
    // setCurrentlyOpen(null);
    // setCurrentGame(null);
  };

  games?.sort((a, b) =>
    a.rating_count > b.rating_count
      ? -1
      : b.rating_count > a.rating_count
      ? 1
      : 0
  );

  return (
    <div className='new_releases_row'>
      <h2>NEW RELEASES</h2>

      <div className='new_releases_row__posters'>
        {games.map((game, i) => (
          <React.Fragment key={game.name}>
            <div className='new_releases_row__poster_wrapper'>
              <div
                className='new_releases_row__poster_container'
                onClick={() => setGameDetails(game)}
              >
                {' '}
                {!loading && (
                  <>
                    <img
                      loading='lazy'
                      className='new_releases_row__poster'
                      src={`//images.igdb.com/igdb/image/upload/t_cover_big_2x/${game.cover?.image_id}.jpg`}
                      alt={game.name}
                    />
                  </>
                )}
              </div>
              {/* {currentlyOpen === game.name && (
                <GamePreview
                  game={currentGame}
                  displayDetails={displayDetails}
                  hideDetails={closeGameDetails}
                />
              )} */}
            </div>
          </React.Fragment>
        ))}
        {loading && (
          <div className='row__loading_container'>
            {[...Array(10)].map((item, i) => (
              <div key={i} className='new_releases_row__placeholder__wrapper'>
                <Placeholder key={i} delay={i} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewReleases;
