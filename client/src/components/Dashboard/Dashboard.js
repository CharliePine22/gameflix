import { useState, useEffect } from 'react';
import './App.css';

// Component Imports
import Row from './components/Row/Row';
import Banner from './components/Banner/Banner';
import Nav from './components/Nav/Nav';
import MainRow from './components/MainRow/MainRow';
import TrendingRow from './components/TrendingRow/TrendingRow';
import SearchResultsIGDB from './components/SearchResults/SearchResultsIGDB';

// File Imports
import requestsIGDB from './requestsIGDB';
import axios from 'axios';
import SpotifyPlayback from './components/SpotifyPlayback/SpotifyPlayback';
import useSpotifyAuth from './hooks/useSpotifyAuth';
import useTwitchAuth from './hooks/useTwitchAuth';
import useSteamAuth from './hooks/useSteamAuth';
import UserLibrary from './components/UserLibrary/UserLibrary';
import GameDetails from './components/GameDetails/GameDetails';
import UserCollection from './components/UserCollectionPage/UserCollection';
import Notification from './components/Notification/Notification';

const code = new URLSearchParams(window.location.search).get('code');
const windowUrl = window.location.search;
const id = windowUrl.split('?')[1];

function App() {
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
  // Search States
  const [searchSubmitted, setSearchSubmitted] = useState(false);
  const [searchedGame, setSearchedGame] = useState('');
  const [gameDetails, setGameDetails] = useState(null);

  // Local Variables
  const baseURL = process.env.REACT_APP_BASE_URL;
  const userEmail = localStorage.getItem('user');
  const userProfile = JSON.parse(localStorage.getItem('profile'));

  let audio = new Audio(loginAudio);

  const spotifyAccessToken = useSpotifyAuth(code);
  const twitchAccessToken = useTwitchAuth(code);
  const steamCollection = useSteamAuth(id);

  // console.log(steamCollection);
  // console.log(twitchAccessToken);

  // Refetch user data if any changes are made
  useEffect(() => {
    const userEmail = localStorage.getItem('user');
    if (!userEmail) return;
    const updateUser = async () => {
      const request = await axios.get(`${baseURL}/app/get_user`, {
        params: {
          email: loggedUser,
        },
      });
      setLoggedUser(request.data);
    };
    updateUser();
  }, []);

  // Check to see if user is logged in
  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setLoggedUser(loggedInUser);
    }
    setEditingUser(false);
    setUpdatingUser(false);
  }, [editingUser, updatingUser, selectedProfile]);

  // Check to see which profile is active
  useEffect(() => {
    localStorage.removeItem('steamID');
    localStorage.removeItem('steamConn');
    if (!loggedUser || !userProfile) return;
    if (userProfile) {
      const currentProfile = loggedUser.profiles.filter((obj) => {
        return obj.name === userProfile;
      });
      console.log(currentProfile);
      setSelectedProfile(currentProfile[0]);
    }
  }, [userProfile]);

  // Fetch User Collection
  useEffect(() => {
    setIsLoading(true);
    if (selectedProfile == null || !selectedProfile.collection) return;
    const fetchUserCollection = async () => {
      setUserCollection(
        selectedProfile.collection.filter((game) => game.id !== null)
      );
      setIsLoading(false);
    };
    fetchUserCollection();
  }, [selectedProfile, twitchAccessToken]);

  const closeSearchResults = () => {
    setSearchSubmitted(false);
    setSearchedGame(null);
  };

  // Search for the game, publisher, or developer that the user types in from nav
  const fetchSubmittedGame = async (game) => {
    if (searchedGame !== null) setSearchedGame(null);
    setSearchSubmitted(true);
    const request = await axios.post('/app/search_game', {
      token: twitchAccessToken,
      gameName: game,
    });
    setSearchedGame(request.data);
  };

  // const fetchGameOST = async (game) => {
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
    const exists = userCollection.some((item) => item.id === game.id);
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
        email: userEmail,
        currentProfile: userProfile,
        name: game.name,
        id: game.id,
        imageURL: `//images.igdb.com/igdb/image/upload/t_cover_big_2x/${game.cover.image_id}.jpg`,
        playtime: 0,
        origin: 'gameflix',
      });
      localStorage.setItem('user', JSON.stringify(request.data.response));
      const currentProfile = request.data.response.profiles.filter((obj) => {
        return obj.name === userProfile;
      });
      localStorage.setItem('profile', JSON.stringify(currentProfile[0]));
      setSelectedProfile(currentProfile[0]);
      setNotification({
        message: `${game.name} sucessfully added to your collection!`,
        status: 'SUCCESS',
      });
      setDisplayNotification(true);
      return;
    } catch (error) {
      setNotification({
        message: `Unable to add ${game.name} to your collection!`,
        status: 'ERROR',
      });
      setDisplayNotification(true);
      return error;
    }
  };

  const removeGameHandler = async (game) => {
    console.log(game);
    try {
      const request = await axios.put(`${baseURL}/app/remove_game`, {
        email: userEmail,
        currentProfile: userProfile,
        game: game.id,
      });
      localStorage.setItem('user', JSON.stringify(request.data.response));
      const currentProfile = request.data.response.profiles.filter((obj) => {
        return obj.name === userProfile;
      });
      localStorage.setItem('profile', JSON.stringify(currentProfile[0]));
      setSelectedProfile(currentProfile[0]);
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
      return;
    }
  };

  // Login user if verification succeeds.
  const loginAuthentication = (user) => {
    localStorage.setItem('user', user.email);
    setLoggedUser(user);
    audio.play();
  };

  // Logout the user
  const logoutHandler = () => {
    setLoggedUser(null);
    setSelectedProfile(null);
    localStorage.clear('user');
  };

  const changeProfile = (user) => {
    setChangingUser(true);
    // setSelectedProfile(user.name);
    localStorage.setItem('profile', user.name);
    setTimeout(() => {
      setChangingUser(false);
    }, 2000);
  };

  const playTrack = (track) => {
    setCurrentTrack(track);
  };

  // Loading screen for profile change
  if (changingUser) {
    return (
      <div className='loading_profile__container'>
        <div className='loading_profile'>
          <img src={selectedProfile.avatar} alt='current user avatar' />
        </div>
      </div>
    );
  }

  if (gameDetails !== null) {
    return (
      <>
        <GameDetails
          setNotification={(status, message) =>
            setNotification({ status, message })
          }
          game={gameDetails}
          closeDetails={() => setGameDetails(null)}
          twitchToken={twitchAccessToken}
          addGame={(game) => addGameHandler(game)}
          removeGame={(game) => removeGameHandler(game)}
          activeProfile={selectedProfile}
        />
        <Notification
          notification={notification}
          displayNotification={displayNotification}
          hideNotification={() => {
            setDisplayNotification(false);
            setNotification({ message: '', status: '' });
          }}
        />
      </>
    );
  }

  if (viewingCollection)
    return (
      <UserCollection
        collection={userCollection}
        activeProfile={selectedProfile}
        backToHome={() => setViewingCollection(false)}
        currentTrack={currentTrack}
        playTrack={playTrack}
        isPlaying={playAudio}
        pausePlayback={() => setPlayAudio(false)}
        resumePlayback={() => setPlayAudio(true)}
        setSelectedProfile={(profile) => setSelectedProfile(profile)}
        spotifyToken={spotifyAccessToken}
        removeGame={(game) => removeGameHandler(game)}
      />
    );

  return (
    <div className='App'>
      <Nav
        currentUser={loggedUser}
        activeProfile={selectedProfile}
        changeUser={changeProfile}
        onLogout={logoutHandler}
        fetchSubmittedGame={fetchSubmittedGame}
        closeSearchResults={closeSearchResults}
        toProfilePage={() => setSelectedProfile(null)}
        selectProfile={(profile) => setSelectedProfile(profile)}
        spotifyToken={spotifyAccessToken}
        twitchToken={twitchAccessToken}
        searchedGame={searchedGame}
        saveEdit={() => setEditingUser(true)}
        setLoggedUser={(user) => setLoggedUser(user)}
      />
      {!searchSubmitted ? (
        <>
          <Banner
            setGameDetails={(id) => setGameDetails(id)}
            twitchToken={twitchAccessToken}
            addGame={(game) => addGameHandler(game)}
            activeProfile={selectedProfile}
          />
          <MainRow
            twitchToken={twitchAccessToken}
            setGameDetails={(game) => setGameDetails(game)}
          />
          <TrendingRow twitchToken={twitchAccessToken} />
          <UserLibrary
            activeProfile={selectedProfile}
            playTrack={playTrack}
            currentTrack={currentTrack}
            isPlaying={playAudio}
            pausePlayback={() => setPlayAudio(false)}
            resumePlayback={() => setPlayAudio(true)}
            spotifyToken={spotifyAccessToken}
            collection={userCollection}
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

          {requestsIGDB.map(
            (request) =>
              request.title !== 'COMING SOON' &&
              request.title !== 'TRENDING' && (
                <Row
                  activeProfile={selectedProfile}
                  spotifyToken={spotifyAccessToken}
                  twitchToken={twitchAccessToken}
                  key={request.requestId}
                  title={request.title}
                  fetchURL={request.url}
                  todaysDate={request.todaysDate}
                  playTrack={playTrack}
                  currentTrack={currentTrack}
                  isPlaying={playAudio}
                  genreId={request.genreId}
                  setGameDetails={(game) => setGameDetails(game)}
                  pausePlayback={(e) => setPlayAudio(false)}
                  resumePlayback={(e) => setPlayAudio(true)}
                  addGame={(game) => addGameHandler(game)}
                  removeGame={(game) => removeGameHandler(game)}
                  setNotification={(status, message) =>
                    setNotification({ status, message })
                  }
                />
              )
          )}
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
      ) : (
        <SearchResultsIGDB
          searchedGame={searchedGame}
          setGameDetails={(id) => setGameDetails(id)}
        />
      )}
      <Notification
        notification={notification}
        displayNotification={displayNotification}
        hideNotification={() => {
          setNotification({ message: '', status: '' });
        }}
      />
      {/* <Notification message={notificationMessage} status={notificationStatus} /> */}
    </div>
  );
}

export default App;
