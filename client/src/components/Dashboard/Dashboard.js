import { useState, useEffect, memo, lazy, Suspense } from 'react';

// Component Imports
import Row from '../Row/Row';
import Banner from '../Banner/Banner';
import Nav from '../Nav/Nav';
import MainRow from '../MainRow/MainRow';
import TrendingRow from '../TrendingRow/TrendingRow';
import NewReleases from '../NewReleases/NewReleases';

// File Imports
import SpotifyPlayback from '../SpotifyPlayback/SpotifyPlayback';
import useSpotifyAuth from '../../hooks/useSpotifyAuth';
import useSteamAuth from '../../hooks/useSteamAuth';
import useFetchGenres from '../../hooks/useFetchGenres';
import { SlOptions } from 'react-icons/sl';
import Placeholder from '../Placeholder/Placeholder';

const GameDetails = lazy(() => import('../GameDetails/GameDetails'));
const Notification = lazy(() => import('../Notification/Notification'));
const UserCollection = lazy(() =>
  import('../UserCollectionPage/UserCollection')
);

const windowUrl = window.location.search;
const id = windowUrl.split('?')[1];

const Dashboard = ({
  currentUser,
  twitchToken,
  currentProfile,
  currentCollection,
  userNotes,
  updateCollection,
  selectProfile,
  updateGameStatus,
  fetchGame,
  logoutUser,
  gameStatus,
  resetGameStatus,
  changeProfile,
  spotifyToken,
  refreshSpotifyToken,
}) => {
  const allGenres = useFetchGenres();
  const [displayNotification, setDisplayNotification] = useState(false);
  const [notification, setNotification] = useState({ status: '', message: '' });

  // Spotify States
  const [currentTrack, setCurrentTrack] = useState(null);
  const [playAudio, setPlayAudio] = useState(false);
  const [rowsLoading, setRowsLoading] = useState();

  // User states
  const [viewingCollection, setViewingCollection] = useState(false);

  // Row States
  const [currentGameOpen, setCurrentGameOpen] = useState(null);
  const [viewingGameOptions, setViewingGameOptions] = useState(false);
  const [hoveringGame, setHoveringGame] = useState(null);

  // Search States
  const [gameDetails, setGameDetails] = useState(null);

  // Local Variables
  // const spotifyAccessToken = useSpotifyAuth(code);
  // const steamCollection = useSteamAuth(id);

  useEffect(() => {
    if (!currentGameOpen) document.body.style.overflow = 'auto';
  }, []);

  const resetGame = () => {
    setHoveringGame(null);
    resetGameStatus();
  };

  const openGameWindow = (game) => {
    console.log(game);
    setCurrentGameOpen(game.id);
    document.body.style.overflow = 'hidden';
  };

  const closeGameWindow = () => {
    document.body.style.overflow = 'auto';
    setCurrentGameOpen(null);
  };

  const seeGameOptions = () => {
    setViewingGameOptions(true);
  };

  const playTrack = (track) => {
    setCurrentTrack(track);
  };

  const toProfileSelection = () => {
    localStorage.removeItem('profile');
    window.location.reload();
  };

  if (currentProfile) {
    if (gameDetails !== null) {
      return (
        <>
          <Suspense fallback={<>...</>}>
            <GameDetails
              setNotification={(status, message) =>
                setNotification({ status, message })
              }
              game={gameDetails}
              closeDetails={() => setGameDetails(null)}
              twitchToken={twitchToken}
              updateGameStatus={(action, game) =>
                updateGameStatus(action, game)
              }
              activeProfile={currentProfile}
              currentCollection={currentCollection}
            />

            <Notification
              notification={notification}
              displayNotification={displayNotification}
              hideNotification={() => {
                setNotification({ message: '', status: '' });
              }}
            />
          </Suspense>
        </>
      );
    }

    if (viewingCollection)
      return (
        <Suspense fallback={<>...</>}>
          <UserCollection
            collection={currentCollection}
            activeProfile={currentProfile}
            backToHome={() => setViewingCollection(false)}
            currentTrack={currentTrack}
            playTrack={playTrack}
            isPlaying={playAudio}
            pausePlayback={() => setPlayAudio(false)}
            resumePlayback={() => setPlayAudio(true)}
            spotifyToken={spotifyToken}
            updateGameStatus={(action, game) => updateGameStatus(action, game)}
            updateCollection={updateCollection}
            userNotes={userNotes}
            trackUri={currentTrack?.uri}
            refreshSpotifyToken={refreshSpotifyToken}
          />
        </Suspense>
      );

    return (
      <div className='App'>
        <Nav
          currentUser={currentUser}
          activeProfile={currentProfile}
          changeUser={changeProfile}
          onLogout={logoutUser}
          fetchSubmittedGame={fetchGame}
          toProfilePage={toProfileSelection}
          selectProfile={selectProfile}
          spotifyToken={spotifyToken}
          twitchToken={twitchToken}
          saveEdit={() => console.log('saving edit')}
          updateCollection={updateCollection}
          currentCollection={currentCollection}
          viewCollection={() => setViewingCollection(true)}
        />

        <Banner
          setGameDetails={(id) => setGameDetails(id)}
          addGame={(game) => updateGameStatus('ADD', game)}
          activeProfile={currentProfile}
        />
        <MainRow
          twitchToken={twitchToken}
          setGameDetails={(game) => setGameDetails(game)}
        />

        <NewReleases
          twitchToken={twitchToken}
          setGameDetails={(game) => setGameDetails(game)}
        />

        <TrendingRow
          twitchToken={twitchToken}
          setGameDetails={(game) => setGameDetails(game)}
        />

        {currentGameOpen && (
          <>
            <h1 className='row__preview_close' onClick={closeGameWindow}>
              X
            </h1>
          </>
        )}
        <div
          className={`${currentGameOpen !== null ? 'game_preview__modal' : ''}`}
        />

        {allGenres.genreGamesList.length > 0 ? (
          allGenres.genreGamesList.map((request) => (
            <Row
              key={Object.keys(request)}
              activeProfile={currentProfile}
              spotifyToken={spotifyToken}
              genreDetails={Object.entries(request)}
              playTrack={playTrack}
              currentTrack={currentTrack}
              setGameDetails={(game) => setGameDetails(game)}
              resumePlayback={(e) => setPlayAudio(true)}
              pausePlayback={(e) => setPlayAudio(false)}
              isPlaying={playAudio}
              currentGameOpen={currentGameOpen}
              openGame={(game) => openGameWindow(game)}
              closeGameWindow={closeGameWindow}
              updateGameStatus={(action, game) =>
                updateGameStatus(action, game)
              }
              setNotification={(status, message) =>
                setNotification({ status, message })
              }
              loading={rowsLoading}
              hoverGame={(game) => setHoveringGame(game)}
              hoverAway={() => resetGame()}
              currentHover={hoveringGame}
              currentCollection={currentCollection}
              gameStatus={gameStatus}
            />
          ))
        ) : (
          <div className='row__loading_container'>
            {[...Array(10)].map((item, i) => (
              <div key={i} className='row__placeholder__wrapper'>
                <Placeholder key={i} delay={i} />
              </div>
            ))}
          </div>
        )}

        {spotifyToken && (
          <SpotifyPlayback
            spotifyToken={spotifyToken}
            playAudio={playAudio}
            beginPlayback={(e) => setPlayAudio(true)}
            pausePlayback={(e) => setPlayAudio(false)}
            trackUri={currentTrack?.uri}
            refreshSpotifyToken={refreshSpotifyToken}
          />
        )}

        <Notification
          notification={notification}
          displayNotification={displayNotification}
          hideNotification={() => {
            setNotification({ message: '', status: '' });
          }}
        />
      </div>
    );
  }
};

export default memo(Dashboard);
