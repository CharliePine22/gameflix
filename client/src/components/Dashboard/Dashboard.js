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

const GameDetails = lazy(() => import('../GameDetails/GameDetails'));
const Notification = lazy(() => import('../Notification/Notification'));
const UserCollection = lazy(() =>
  import('../UserCollectionPage/UserCollection')
);

const code = new URLSearchParams(window.location.search).get('code');
const windowUrl = window.location.search;
const id = windowUrl.split('?')[1];

const Dashboard = ({
  currentUser,
  twitchToken,
  currentProfile,
  currentCollection,
  userNotes,
  manageProfiles,
  updateCollection,
  selectProfile,
  updateGameStatus,
  fetchGame,
  addGame,
  removeGame,
  logoutUser,
}) => {
  const allGenres = useFetchGenres();
  const [displayNotification, setDisplayNotification] = useState(false);
  const [notification, setNotification] = useState({ status: '', message: '' });

  // Spotify States
  const [currentTrack, setCurrentTrack] = useState(null);
  const [playAudio, setPlayAudio] = useState(false);
  const [rowsLoading, setRowsLoading] = useState();

  // User states
  const [changingUser, setChangingUser] = useState(false);
  const [editingUser, setEditingUser] = useState(false);
  const [loggedUser, setLoggedUser] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [viewingCollection, setViewingCollection] = useState(false);

  // Row States
  const [currentGameOpen, setCurrentGameOpen] = useState(null);
  const [viewingGameOptions, setViewingGameOptions] = useState(false);
  const [hoveringGame, setHoveringGame] = useState(null);

  // Search States
  const [gameDetails, setGameDetails] = useState(null);

  // Local Variables
  const spotifyAccessToken = useSpotifyAuth(code);
  const steamCollection = useSteamAuth(id);

  useEffect(() => {
    if (!currentGameOpen) document.body.style.overflow = 'auto';
  }, []);

  const changeProfile = (user) => {
    setChangingUser(true);
    localStorage.setItem('profile', user.name);
    setTimeout(() => {
      setChangingUser(false);
    }, 2000);
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

  // Loading screen for profile change
  if (changingUser) {
    return (
      <div className='loading_profile__container'>
        <div className='loading_profile'>
          <img src={currentProfile.avatar} alt='current user avatar' />
        </div>
      </div>
    );
  }

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
              addGame={(game) => addGame(game)}
              removeGame={(game) => removeGame(game)}
              activeProfile={currentProfile}
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
            setSelectedProfile={(profile) => setSelectedProfile(profile)}
            spotifyToken={spotifyAccessToken}
            removeGame={(game) => removeGame(game)}
            updateCollection={updateCollection}
            userNotes={userNotes}
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
          toProfilePage={() => localStorage.removeItem('profile')}
          selectProfile={(profile) => setSelectedProfile(profile)}
          spotifyToken={spotifyAccessToken}
          twitchToken={twitchToken}
          saveEdit={() => setEditingUser(true)}
          setLoggedUser={(user) => setLoggedUser(user)}
          updateCollection={updateCollection}
          currentCollection={currentCollection}
          viewCollection={() => setViewingCollection(true)}
        />

        <Banner
          setGameDetails={(id) => setGameDetails(id)}
          addGame={(game) => addGame(game)}
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
            <h1 className='row__preview_close options' onClick={seeGameOptions}>
              <SlOptions />
            </h1>
          </>
        )}
        <div
          className={`${currentGameOpen !== null && 'game_preview__modal'}`}
        />

        {allGenres.genreGamesList.map((request) => (
          <Row
            key={Object.keys(request)}
            activeProfile={currentProfile}
            spotifyToken={spotifyAccessToken}
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
            updateGameStatus={(action, game) => updateGameStatus(action, game)}
            setNotification={(status, message) =>
              setNotification({ status, message })
            }
            loading={rowsLoading}
            hoverGame={(game) => setHoveringGame(game)}
            hoverAway={() => setHoveringGame(null)}
            currentHover={hoveringGame}
            currentCollection={currentCollection}
          />
        ))}

        {spotifyAccessToken && (
          <SpotifyPlayback
            spotifyToken={spotifyAccessToken}
            playAudio={playAudio}
            beginPlayback={(e) => setPlayAudio(true)}
            pausePlayback={(e) => setPlayAudio(false)}
            trackUri={currentTrack?.uri}
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
