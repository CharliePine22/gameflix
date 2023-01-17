import React, { useState, useEffect, useRef } from 'react';
import './SearchResults.css';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import SkeletonCard from '../SkeletonCard/SkeletonCard';
import { FaSearch } from 'react-icons/fa';
import GamePreview from '../Row/GamePreview/GamePreview';

const SearchResultsIGDB = ({
  searchedGame,
  setGameDetails,
  closeSearchResults,
  searchGame,
  currentGameOpen,
  openGame,
  closeGameWindow,
}) => {
  const recentSearches = JSON.parse(localStorage.getItem('searches'));
  const [topGames, setTopGames] = useState([]);
  const [remainderGames, setRemainderGames] = useState([]);
  const [recentSearchList, setRecentSearchList] = useState(recentSearches);
  const [searchValue, setSearchValue] = useState(searchedGame.name);
  const [currentGame, setCurrentGame] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    setTopGames(searchedGame.data?.slice(0, 3));
    setRemainderGames(searchedGame.data?.slice(3));
    if (searchedGame.name !== '') {
      if (!recentSearches) {
        localStorage.setItem('searches', JSON.stringify([searchedGame.name]));
      } else {
        recentSearches.push(searchedGame.name);
        localStorage.setItem('searches', JSON.stringify(recentSearches));
      }
    }
  }, [searchedGame]);

  const removeRecentSearchItem = (name) => {
    const newList = recentSearches.filter((item) => item !== name);
    console.log(newList);
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

  const displayGameCase = (e, game) => {
    e.stopPropagation();
    setCurrentGame(game);
    openGame(game);
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

  // Skeleton Loader
  if (searchedGame.data.length == 0 || !topGames || !remainderGames) {
    return (
      <div className='search_results'>
        {currentGameOpen === game.name && (
          <GamePreview
            game={currentGame}
            gameCover={`//images.igdb.com/igdb/image/upload/t_1080p_2x/${game.cover?.image_id}.jpg`}
            ratingImage={determineESRB(currentGame)}
            addGame={addGameHandler}
            displayDetails={displayDetails}
            hideDetails={closeGameWindow}
            fetchGameDetails={(game) => {
              fetchGameDetails(game);
            }}
            viewGameSoundtrack={(e, game) => {
              viewGameSoundtrack(e, game);
            }}
            viewingPreview={viewingPreview}
            openGame={() => setViewingPreview(true)}
            closeGame={() => setViewingPreview(false)}
          />
        )}
        <div className='search_results__nav'>
          <span onClick={closeSearchResults}>X</span>
          <div className='search_results__nav_search'>
            <input
              placeholder='Search..'
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

  if (searchedGame.data == null) {
    return (
      <div className='search_results__error'>
        <p>
          Sorry, no results for current game, please refine your search and try
          again!
        </p>
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
          <FaSearch className='search_results__nav_search_icon' />
        </div>
      </div>

      <div className='search_results__container'>
        {/* RECENT SEARCHES */}
        <div className='search_results__recents'>
          <h2>Recent Searches</h2>
          <ul className='recent_searches'>
            {recentSearches &&
              uniqueSearches(recentSearches)
                .slice(0, 4)
                .map((name, i) => (
                  <li key={i} className='recent_searches__item'>
                    <p onClick={() => searchGame(name)}>{name}</p>
                    <span onClick={() => removeRecentSearchItem(name)}>X</span>
                  </li>
                ))}
          </ul>
        </div>
        <h2>Top Results</h2>

        {/* Top 3 Search Results */}
        <div className='top_results_row'>
          {topGames?.map((game) => (
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
                  backgroundSize: 'cover',
                  backgroundImage: `url(//images.igdb.com/igdb/image/upload/t_cover_big/${game.cover?.image_id}.jpg)`,
                  backgroundPosition: 'center',
                }}
              />
            </div>
          ))}
        </div>
        {/* Remaining Games */}
        {remainderGames.length > 0 && (
          <div className='remainder_results'>
            <h2>Results</h2>
            {remainderGames?.map(
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
