import { useState, useEffect } from 'react';

// Component Imports
import Row from '../Row/Row';
import Banner from '../Banner/Banner';
import Nav from '../Nav/Nav';
import MainRow from '../MainRow/MainRow';
import TrendingRow from '../TrendingRow/TrendingRow';
import SearchResultsIGDB from '../SearchResults/SearchResultsIGDB';

// File Imports
import requestsIGDB from '../../requestsIGDB';
import axios from 'axios';
import SpotifyPlayback from '../SpotifyPlayback/SpotifyPlayback';
import useSpotifyAuth from '../../hooks/useSpotifyAuth';
import useSteamAuth from '../../hooks/useSteamAuth';
import UserLibrary from '../UserLibrary/UserLibrary';
import GameDetails from '../GameDetails/GameDetails';
import UserCollection from '../UserCollectionPage/UserCollection';
import Notification from '../Notification/Notification';

const code = new URLSearchParams(window.location.search).get('code');
const windowUrl = window.location.search;
const id = windowUrl.split('?')[1];

const Dashboard = ({
  currentUser,
  twitchToken,
  currentProfile,
  currentCollection,
  allGenres,
  userNotes,
  manageProfiles,
  updateCollection,
  selectProfile,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [displayNotification, setDisplayNotification] = useState(false);
  const [notification, setNotification] = useState({ status: '', message: '' });

  // Spotify States
  const [currentTrack, setCurrentTrack] = useState(null);
  const [playAudio, setPlayAudio] = useState(false);
  const [currentPlaylist, setCurrentPlaylist] = useState([]);

  // User states
  const [changingUser, setChangingUser] = useState(false);
  const [updatingUser, setUpdatingUser] = useState(false);
  const [editingUser, setEditingUser] = useState(false);
  const [loggedUser, setLoggedUser] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [userCollection, setUserCollection] = useState([]);
  const [viewingCollection, setViewingCollection] = useState(false);

  // Row States
  const [currentGameOpen, setCurrentGameOpen] = useState(null);
  const [openWindow, setOpenWindow] = useState(false);

  // Search States
  const [searchSubmitted, setSearchSubmitted] = useState(false);
  const [searchedGame, setSearchedGame] = useState({ name: '', data: [] });
  const [gameDetails, setGameDetails] = useState(null);

  // Local Variables
  const baseURL = process.env.REACT_APP_BASE_URL;

  const spotifyAccessToken = useSpotifyAuth(code);
  const steamCollection = useSteamAuth(id);

  useEffect(() => {
    if (!currentProfile) console.log('No Current Profile');
    if (!currentGameOpen) document.body.style.overflow = 'auto';
  }, []);

  //   setViewingSoundtrack(false);
  //   if (!spotifyToken) {
  //     console.log('Please connect to Spotify!');
  //     return;
  //   }
  //   try {
  //     const request = await axios.get(`${baseURL}/app/spotify_album`, {
  //       params: {
  //         game,
  //         token: spotifyToken,
  //         baseURL,
  //       },
  //     });
  //     if (request.data.status !== 'OK') {
  //       window.location = '/';
  //       localStorage.removeItem('spotify_token');
  //     } else {
  //       setCurrentPlaylist(request.data.tracks);
  //       setViewingSoundtrack(true);
  //     }
  //   } catch (error) {
  //     console.log('OST FETCH ISSUE');
  //   }
  // };

  // Add game name and id to DB
  const addGameHandler = async (game) => {
    console.log('ADDING GAME');
    const exists = currentCollection.some((item) => item.id === game.id);
    if (exists) {
      setNotification({
        message: `${game.name} is already in your collection!`,
        status: 'ERROR',
      });
      setDisplayNotification(true);
      return;
    }
    try {
      const request = await axios.post(`${baseURL}/app/update_collection`, {
        email: currentUser.email,
        currentProfile: currentProfile.name,
        name: game.name,
        id: game.id,
        imageURL: `//images.igdb.com/igdb/image/upload/t_1080p_2x/${game.cover.image_id}.jpg`,
        playtime: 0,
        origin: 'gameflix',
        status: 'BACKLOG',
      });
      localStorage.setItem('user', request.data.response.email);
      const filteredProfile = request.data.response.profiles.filter((obj) => {
        return obj.name === currentProfile.name;
      });

      localStorage.setItem('profile', filteredProfile[0].name);
      setSelectedProfile(filteredProfile[0]);
      updateCollection(filteredProfile[0].collection);
      setNotification({
        message: `${game.name} sucessfully added to your collection!`,
        status: 'SUCCESS',
      });
      setDisplayNotification(true);
      return;
    } catch (error) {
      console.log(error);
      setNotification({
        message: `Unable to add ${game.name} to your collection!`,
        status: 'ERROR',
      });
      setDisplayNotification(true);
      return error;
    }
  };

  const removeGameHandler = async (game) => {
    try {
      const request = await axios.put(`${baseURL}/app/remove_game`, {
        email: currentUser.email,
        currentProfile: currentProfile.name,
        game: game.id,
      });

      localStorage.setItem('user', request.data.response.email);
      const filteredProfile = request.data.response.profiles.filter((obj) => {
        return obj.name === currentProfile.name;
      });
      localStorage.setItem('profile', filteredProfile[0].name);
      setSelectedProfile(filteredProfile[0]);
      updateCollection(filteredProfile[0].collection);
      setNotification({
        message: `${game.name} sucessfully removed from your collection!`,
        status: 'SUCCESS',
      });
      setDisplayNotification(true);
      return;
    } catch (error) {
      console.log(error);
      setNotification({
        message: `Unable to remove ${game.name} from your collection!`,
        status: 'ERROR',
      });
      setDisplayNotification(true);
      return error;
    }
  };

  // Logout the user
  const logoutHandler = () => {
    setLoggedUser(null);
    setSelectedProfile(null);
    localStorage.clear();
    localStorage.setItem('twitch_auth', twitchToken);
    window.location.reload();
  };

  const changeProfile = (user) => {
    setChangingUser(true);
    localStorage.setItem('profile', user.name);
    setTimeout(() => {
      setChangingUser(false);
    }, 2000);
  };

  const fetchGameDetails = (game) => {
    setCurrentGameOpen(game.name);
  };

  const openGameWindow = (game) => {
    setCurrentGameOpen(game.name);
    document.body.style.overflow = 'hidden';
  };

  const closeGameWindow = () => {
    document.body.style.overflow = 'auto';
    setCurrentGameOpen(null);
  };

  const playTrack = (track) => {
    setCurrentTrack(track);
  };

  const closeSearchResults = () => {
    setSearchSubmitted(false);
    setSearchedGame({ name: '', data: [] });
  };

  // Search for the game, publisher, or developer that the user types in from nav
  const fetchSubmittedGame = async (game) => {
    if (searchedGame.name !== null) setSearchedGame({ name: '', data: [] });
    setSearchSubmitted(true);
    const request = await axios.post('/app/search_game', {
      token: twitchToken,
      gameName: game,
    });

    if (request.data.length == 0) {
      setSearchedGame({ name: game, data: null });
    }
    setSearchedGame({ name: game, data: request.data });
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
          <GameDetails
            setNotification={(status, message) =>
              setNotification({ status, message })
            }
            game={gameDetails}
            closeDetails={() => setGameDetails(null)}
            twitchToken={twitchToken}
            addGame={(game) => addGameHandler(game)}
            removeGame={(game) => removeGameHandler(game)}
            activeProfile={currentProfile}
          />
          <Notification
            notification={notification}
            displayNotification={displayNotification}
            hideNotification={() => {
              setNotification({ message: '', status: '' });
            }}
          />
        </>
      );
    }

    if (viewingCollection)
      return (
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
          removeGame={(game) => removeGameHandler(game)}
          updateCollection={updateCollection}
          userNotes={userNotes}
        />
      );

    return (
      <div className='App'>
        {!searchSubmitted ? (
          <>
            <Nav
              currentUser={currentUser}
              activeProfile={currentProfile}
              changeUser={changeProfile}
              onLogout={logoutHandler}
              fetchSubmittedGame={fetchSubmittedGame}
              closeSearchResults={closeSearchResults}
              toProfilePage={() => localStorage.removeItem('profile')}
              selectProfile={(profile) => setSelectedProfile(profile)}
              spotifyToken={spotifyAccessToken}
              twitchToken={twitchToken}
              searchedGame={searchedGame}
              saveEdit={() => setEditingUser(true)}
              setLoggedUser={(user) => setLoggedUser(user)}
              updateCollection={updateCollection}
              currentCollection={currentCollection}
              viewCollection={() => setViewingCollection(true)}
            />
            <>
              <Banner
                setGameDetails={(id) => setGameDetails(id)}
                twitchToken={twitchToken}
                addGame={(game) => addGameHandler(game)}
                activeProfile={currentProfile}
              />
              <MainRow
                twitchToken={twitchToken}
                setGameDetails={(game) => setGameDetails(game)}
              />
              <TrendingRow twitchToken={twitchToken} />
              <UserLibrary
                activeProfile={currentProfile}
                playTrack={playTrack}
                currentTrack={currentTrack}
                isPlaying={playAudio}
                pausePlayback={() => setPlayAudio(false)}
                resumePlayback={() => setPlayAudio(true)}
                spotifyToken={spotifyAccessToken}
                collection={currentCollection}
                setSelectedProfile={(profile) => setSelectedProfile(profile)}
                setGameDetails={(game) => setGameDetails(game)}
                steamCollection={steamCollection}
                removeGame={removeGameHandler}
                viewCollection={() => setViewingCollection(true)}
                setNotification={(status, message) => {
                  setNotification({ status, message });
                  setDisplayNotification(true);
                }}
                setCompleteCollection={(collection) =>
                  setUserCollection(collection)
                }
              />
              {currentGameOpen && (
                <h1 className='row__preview_close' onClick={closeGameWindow}>
                  X
                </h1>
              )}
              <div
                className={`${
                  currentGameOpen !== null && 'game_preview__modal'
                }`}
              />

              {allGenres.map((request) => (
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
                  addGame={(game) => addGameHandler(game)}
                  setNotification={(status, message) =>
                    setNotification({ status, message })
                  }
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
            </>
          </>
        ) : (
          <SearchResultsIGDB
            searchedGame={searchedGame}
            setGameDetails={(id) => setGameDetails(id)}
            closeSearchResults={closeSearchResults}
            searchGame={fetchSubmittedGame}
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

export default Dashboard;
