import React, { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import './SearchResults.css';
import Skeleton from 'react-loading-skeleton';
import axios from 'axios';
import 'react-loading-skeleton/dist/skeleton.css';
import SkeletonCard from '../SkeletonCard/SkeletonCard';
import { useLocation } from 'react-router-dom';

import { FaSearch, FaPlusSquare } from 'react-icons/fa';
import eRating from '../../assets/images/ESRB_E.png';
import tRating from '../../assets/images/ESRB_T.png';
import mRating from '../../assets/images/ESRB_M.png';
import rpRating from '../../assets/images/ESRB_RP.png';
import Pagination from '../Pagination/Pagination';
import GameDetails from '../GameDetails/GameDetails';

const GamePreview = lazy(() => import('../Row/GamePreview/GamePreview'));
let PageSize = 13;

const SearchResultsIGDB = ({
  closeSearchResults,
  currentGameOpen,
  openGame,
  closeGameWindow,
  updateGameStatus,
  setNotification,
  currentProfile,
  currentCollection,
}) => {
  const twitchToken = localStorage.getItem('twitch_auth');
  const recentSearches = JSON.parse(localStorage.getItem('searches'));
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const [recentSearchList, setRecentSearchList] = useState(recentSearches);
  const baseURL = process.env.REACT_APP_BASE_URL;
  const [gameDetails, setGameDetails] = useState(null);

  // Game Preview States
  const [currentGame, setCurrentGame] = useState('');
  const [viewingPreview, setViewingPreview] = useState(false);

  // Search States
  const searchString = location.state.name;
  const [searchValue, setSearchValue] = useState(searchString);
  const [searchResults, setSearchResults] = useState([]);
  const [searchFinished, setSearchFinished] = useState(false);
  const [searchSubmitted, setSearchSubmitted] = useState(false);

  // Slice searched data based on current pagincation settings
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;

    return searchResults.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, searchResults]);

  const searchGame = async (game) => {
    try {
      setSearchSubmitted(true);
      setSearchFinished(false);
      let newGame = game.replace('Poke', 'Poké');
      const request = await axios.post(`${baseURL}/app/search_game`, {
        token: twitchToken,
        gameName: newGame,
      });

      setSearchResults(request.data);
      setCurrentPage(1);
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

  const goToDetails = (game) => {
    console.log(game);
    setGameDetails(game);
  };

  if (gameDetails) {
    return (
      <>
        <GameDetails
          setNotification={setNotification}
          game={gameDetails}
          closeDetails={() => setGameDetails(null)}
          twitchToken={twitchToken}
          updateGameStatus={updateGameStatus}
          activeProfile={currentProfile}
          currentCollection={currentCollection}
        />
      </>
    );
  }

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
            <Suspense fallback={<>...</>}>
              <GamePreview
                style={{ top: '230px' }}
                game={currentGame}
                gameCover={`https://images.igdb.com/igdb/image/upload/t_1080p_2x/${currentGame.cover?.image_id}.jpg`}
                ratingImage={determineESRB(currentGame)}
                displayDetails={setGameDetails}
                hideDetails={closeGameWindow}
                viewingPreview={viewingPreview}
                openGame={() => setViewingPreview(true)}
                closeGame={() => setViewingPreview(false)}
              />
            </Suspense>
          </div>
        )}

        {searchResults.length == 0 && (
          <div className='search_results__error'>
            <p>
              Sorry, no results for current game, please refine your search and
              try again!
            </p>
          </div>
        )}

        {currentTableData.length > 0 && (
          <>
            <h2>Top Results</h2>
            {/* Top 3 Search Results */}
            <div className='top_results_row'>
              {searchResults.slice(0, 3)?.map((game) => (
                <div
                  className='top_result_container'
                  key={game.id}
                  onClick={() => goToDetails(game)}
                >
                  <div className='top_result_upper'>
                    <div
                      className='result_publisher'
                      onClick={(e) => displayGameCase(e, game)}
                    >
                      <h3>3D</h3>
                    </div>
                    <img
                      src={`https://images.igdb.com/igdb/image/upload/t_screenshot_big/${
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
                      backgroundImage: `url(https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover?.image_id}.jpg)`,
                      backgroundPosition: 'center',
                    }}
                  />
                </div>
              ))}
            </div>
          </>
        )}
        {/* Remaining Games */}
        {currentTableData.length > 3 && (
          <div className='remainder_results'>
            <h2>Results</h2>
            {currentTableData.slice(3)?.map(
              (game) =>
                game.cover !== undefined && (
                  <div
                    className='results_container'
                    key={game.id}
                    onClick={() => goToDetails(game)}
                  >
                    <div
                      className='remainder_3d'
                      onClick={(e) => displayGameCase(e, game)}
                    >
                      <h3>3D</h3>
                    </div>
                    {/* <div
                      className='remainder_add'
                      onClick={() => updateGameStatus('ADD', game)}
                    >
                      <h3>
                        <FaPlusSquare />
                      </h3>
                    </div> */}
                    <div
                      className='results_container_img'
                      style={{
                        backgroundSize: '100% 105%',
                        backgroundImage: `url(//images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg)`,
                        backgroundPosition: 'center',
                      }}
                    />
                    <div className='results_container_content'>
                      <h3 className='game_name_remainder'>{game.name}</h3>

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
        <Pagination
          className='pagination-bar'
          currentPage={currentPage}
          totalCount={searchResults.length - 3}
          pageSize={PageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
      {/* <div className='search_bottom_fade' /> */}
    </div>
  );
};

export default SearchResultsIGDB;
