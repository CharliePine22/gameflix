import React, { useState, useEffect } from 'react';
import './SearchResults.css';
import Skeleton from 'react-loading-skeleton';
import axios from 'axios';
import 'react-loading-skeleton/dist/skeleton.css';
import SkeletonCard from '../SkeletonCard/SkeletonCard';
import { useLocation } from 'react-router-dom';

import { FaSearch } from 'react-icons/fa';
import GamePreview from '../Row/GamePreview/GamePreview';
import eRating from '../../assets/images/ESRB_E.png';
import tRating from '../../assets/images/ESRB_T.png';
import mRating from '../../assets/images/ESRB_M.png';
import rpRating from '../../assets/images/ESRB_RP.png';
import GameDetails from '../GameDetails/GameDetails';
import Notification from '../Notification/Notification';

const SearchResultsIGDB = ({
  setGameDetails,
  game,
  closeSearchResults,
  currentGameOpen,
  openGame,
  closeGameWindow,
  addGameHandler,
}) => {
  const twitchToken = localStorage.getItem('twitch_auth');
  const recentSearches = JSON.parse(localStorage.getItem('searches'));
  const location = useLocation();

  const [recentSearchList, setRecentSearchList] = useState(recentSearches);

  // Game Preview States
  const [currentGame, setCurrentGame] = useState('');
  const [viewingPreview, setViewingPreview] = useState(false);

  // Search States
  const searchString = location.state.name;
  const [searchValue, setSearchValue] = useState(searchString);
  const [searchResults, setSearchResults] = useState([]);
  const [searchFinished, setSearchFinished] = useState(false);
  const [searchSubmitted, setSearchSubmitted] = useState(false);

  const searchGame = async (game) => {
    try {
      setSearchSubmitted(true);
      setSearchFinished(false);
      let newGame = game.replace('Poke', 'Poké');
      const request = await axios.post('/app/search_game', {
        token: twitchToken,
        gameName: newGame,
      });

      setSearchResults(request.data);
      if (searchString !== '') {
        if (!recentSearches) {
          localStorage.setItem('searches', JSON.stringify([searchString]));
          setRecentSearchList(recentSearches);
        } else {
          recentSearches.push(searchString);
          setRecentSearchList(recentSearches);
          localStorage.setItem('searches', JSON.stringify(recentSearches));
        }
      }
      setSearchSubmitted(false);
      setSearchFinished(true);
      return searchResults;
    } catch (error) {
      setSearchSubmitted(false);
      setSearchFinished(true);
      console.log(error);
    }
  };

  useEffect(() => {
    if (searchString == '') return;
    window.scrollTo(0, 0);
    searchGame(searchString);
  }, [searchString]);

  const removeRecentSearchItem = (name) => {
    const newList = recentSearches.filter((item) => item !== name);
    setRecentSearchList([]);
    localStorage.setItem('searches', JSON.stringify(newList));
  };

  const submitSearchHandler = (e) => {
    if (e.key === 'Enter') {
      searchGame(searchValue);
    }
  };

  const uniqueSearches = (searches) => {
    let result = [];
    for (let item of searches) {
      if (result.indexOf(item) === -1) {
        result.push(item);
      }
    }
    localStorage.setItem('searches', JSON.stringify(result));
    return result.reverse();
  };

  const determineESRB = (game) => {
    if (!game || !game.age_ratings)
      return <img className='row__poster__esrb_img' src={rpRating} />;
    const hasRating = game?.age_ratings.filter(
      (rating) => rating.category == 1 || rating.category == 2
    );

    if (hasRating.length == 0 || !game.age_ratings)
      return <img className='row__poster__esrb_img' src={rpRating} />;
    const esrb = hasRating[0].rating;

    switch (esrb) {
      case 1:
      case 2:
      case 8:
      case 9:
        return <img className='row__poster__esrb_img' src={eRating} />;
      case 3:
      case 4:
      case 10:
        return <img className='row__poster__esrb_img' src={tRating} />;
      case 5:
      case 11:
        return <img className='row__poster__esrb_img' src={mRating} />;
      default:
        return <img className='row__poster__esrb_img' src={rpRating} />;
    }
  };

  const displayGameCase = (e, game) => {
    e.stopPropagation();
    setCurrentGame(game);
    openGame(game);
  };

  console.log(game);

  // if(gameDetails) {
  //   <><GameDetails
  //     setNotification={(status, message) => setNotification({ status, message })}
  //     game={gameDetails}
  //     closeDetails={() => setGameDetails(null)}
  //     twitchToken={twitchToken}
  //     addGame={(game) => addGame(game)}
  //     removeGame={(game) => removeGame(game)}
  //     activeProfile={currentProfile} /><Notification
  //       notification={notification}
  //       displayNotification={displayNotification}
  //       hideNotification={() => {
  //         setNotification({ message: '', status: '' });
  //       } } /></>
  // }

  // Skeleton Loader
  if (searchSubmitted && !searchFinished) {
    return (
      <div className='search_results'>
        <div className='search_results__nav'>
          <span onClick={closeSearchResults}>X</span>
          <div className='search_results__nav_search'>
            <input
              placeholder={`${
                searchString !== '' ? searchString : 'Search...'
              }`}
              value={searchValue}
              onKeyDown={submitSearchHandler}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        </div>
        <div className='search_results__container_skeleton'>
          <div className='search_results__recents'>
            <h2>Recent Searches</h2>
            <ul className='recent_searches'>
              {recentSearches &&
                uniqueSearches(recentSearches)
                  .slice(0, 4)
                  .map((name, i) => (
                    <li key={i} className='recent_searches__item'>
                      <p onClick={() => searchGame(name)}>{name}</p>
                      <span onClick={() => removeRecentSearchItem(name)}>
                        X
                      </span>
                    </li>
                  ))}
            </ul>
          </div>
          <div className='top_results_row_skeleton'>
            <h2>Top Results</h2>
            <SkeletonCard count={3} type='full' />
          </div>
          <div className='remainder_results_skeleton'>
            <h2>Results</h2>
            <SkeletonCard count={9} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='search_results'>
      {/* SEARCH NAV */}
      <div className='search_results__nav'>
        <span onClick={closeSearchResults}>X</span>
        <div className='search_results__nav_search'>
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder='Search..'
            onKeyDown={submitSearchHandler}
          />
          <FaSearch
            className='search_results__nav_search_icon'
            onClick={submitSearchHandler}
          />
        </div>
      </div>

      <div className='search_results__container'>
        {currentGameOpen === currentGame.id && (
          <div className='search_results__game_preview'>
            <h1 onClick={closeGameWindow}>X</h1>
            <GamePreview
              style={{ top: '230px' }}
              game={currentGame}
              gameCover={`//images.igdb.com/igdb/image/upload/t_1080p_2x/${currentGame.cover?.image_id}.jpg`}
              ratingImage={determineESRB(currentGame)}
              addGame={addGameHandler}
              displayDetails={setGameDetails}
              hideDetails={closeGameWindow}
              fetchGameDetails={(game) => {
                setGameDetails(game);
              }}
              viewingPreview={viewingPreview}
              openGame={() => setViewingPreview(true)}
              closeGame={() => setViewingPreview(false)}
            />
          </div>
        )}

        {/* RECENT SEARCHES */}
        <div className='search_results__recents'>
          <h2>Recent Searches</h2>
          <ul className='recent_searches'>
            {recentSearchList &&
              uniqueSearches(recentSearchList)
                .slice(0, 4)
                .map((name, i) => (
                  <li key={i} className='recent_searches__item'>
                    <p onClick={() => searchGame(name)}>{name}</p>
                    <span onClick={() => removeRecentSearchItem(name)}>X</span>
                  </li>
                ))}
          </ul>
        </div>
        {searchResults.length == 0 && (
          <div className='search_results__error'>
            <p>
              Sorry, no results for current game, please refine your search and
              try again!
            </p>
          </div>
        )}

        {searchResults.length > 0 && (
          <>
            <h2>Top Results</h2>
            {/* Top 3 Search Results */}
            <div className='top_results_row'>
              {searchResults.slice(0, 3)?.map((game) => (
                <div
                  className='top_result_container'
                  key={game.id}
                  onClick={() => setGameDetails(game)}
                >
                  <div className='top_result_upper'>
                    <div
                      className='result_publisher'
                      onClick={(e) => displayGameCase(e, game)}
                    >
                      <h3>3D</h3>
                    </div>
                    <img
                      src={`//images.igdb.com/igdb/image/upload/t_screenshot_big/${
                        game.artworks
                          ? game.artworks[0]?.image_id
                          : game.cover?.image_id
                      }.jpg`}
                    />
                  </div>
                  <div className='top_result_lower'>
                    <h3 className='game_name'>
                      {game.name || <Skeleton count={1} />}
                    </h3>
                    <ul className='game_theme_list'>
                      {game.themes?.map(
                        (theme) =>
                          theme.name !== 'Sandbox' && (
                            <li key={theme.id}>{theme.name}</li>
                          )
                      )}
                    </ul>
                  </div>
                  <div
                    className='game_cover'
                    style={{
                      backgroundSize: '100% 100%',
                      backgroundImage: `url(//images.igdb.com/igdb/image/upload/t_cover_big/${game.cover?.image_id}.jpg)`,
                      backgroundPosition: 'center',
                    }}
                  />
                </div>
              ))}
            </div>
          </>
        )}
        {/* Remaining Games */}
        {searchResults.length > 0 && (
          <div className='remainder_results'>
            <h2>Results</h2>
            {searchResults.slice(3)?.map(
              (game) =>
                game.cover !== undefined && (
                  <div
                    className='results_container'
                    key={game.id}
                    onClick={() => setGameDetails(game)}
                  >
                    <div
                      className='results_container_img'
                      style={{
                        backgroundSize: 'cover',
                        backgroundImage: `url(//images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg)`,
                        backgroundPosition: 'center',
                      }}
                    />
                    <div className='results_container_content'>
                      <h3 className='game_name_remainder'>{game.name}</h3>
                      <div
                        className='remainder_3d'
                        onClick={(e) => displayGameCase(e, game)}
                      >
                        <h3>3D</h3>
                      </div>
                      {/* <p>{game.publisher}</p> */}
                      <ul className='game_theme_list_lower'>
                        {game.themes?.map(
                          (theme, i) =>
                            theme.name !== 'Sandbox' &&
                            i < 3 && <li key={theme.id}>{theme.name}</li>
                        )}
                      </ul>
                    </div>
                  </div>
                )
            )}
          </div>
        )}
      </div>
      <div className='search_bottom_fade' />
    </div>
  );
};

export default SearchResultsIGDB;
