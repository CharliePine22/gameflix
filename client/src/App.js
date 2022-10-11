import { useState, useEffect, useSearchParams } from 'react';
import './App.css';

// Component Imports
import Row from './components/Row/Row';
import Banner from './components/Banner/Banner';
import Nav from './components/Nav/Nav';
import MainRow from './components/MainRow/MainRow';
import Login from './components/Login/Login';
import LandingPage from './components/LandingPage/LandingPage';
import ProfilesPage from './components/Login/Profiles/ProfilesPage';
import TrendingRow from './components/TrendingRow/TrendingRow';
import SearchResultsIGDB from './components/SearchResults/SearchResultsIGDB';

// File Imports
import requestsIGDB from './requestsIGDB';
import loginAudio from './assets/sounds/success.wav';
import axios from 'axios';
import SpotifyPlayback from './components/SpotifyPlayback/SpotifyPlayback';
import useSpotifyAuth from './hooks/useSpotifyAuth';
import useTwitchAuth from './hooks/useTwitchAuth';
import useSteamAuth from './hooks/useSteamAuth';
import UserLibrary from './components/UserLibrary/UserLibrary';
import GameDetails from './components/GameDetails/GameDetails';
import UserCollection from './components/UserCollectionPage/UserCollection';

const code = new URLSearchParams(window.location.search).get('code');
const windowUrl = window.location.search;
const id = windowUrl.split('?')[1];

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [playAudio, setPlayAudio] = useState(false);
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
  const [toLanding, setToLanding] = useState(false);
  const baseURL = process.env.REACT_APP_BASE_URL;

  const userEmail = JSON.parse(localStorage.getItem('user'))?.email;
  const userProfile = JSON.parse(localStorage.getItem('profile'))?.name;

  let audio = new Audio(loginAudio);

  const spotifyAccessToken = useSpotifyAuth(code);
  const twitchAccessToken = useTwitchAuth(code);
  const steamCollection = useSteamAuth(id);

  // Refetch user data if any changes are made
  useEffect(() => {
    const updateUser = async () => {
      if (!loggedUser) return null;
      const request = await axios.get(`${baseURL}/app/get_user`, {
        params: {
          email: loggedUser.email,
        },
      });
      localStorage.setItem('user', JSON.stringify(request.data));
    };
    updateUser();
  }, []);

  // Check to see if user is logged in
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (loggedInUser) {
      setLoggedUser(loggedInUser);
    }
    setEditingUser(false);
    setUpdatingUser(false);
  }, [editingUser, updatingUser]);

  // Check to see which profile is active
  useEffect(() => {
    const userProfile = localStorage.getItem('profile');
    sessionStorage.removeItem('steamID');
    if (userProfile) {
      setSelectedProfile(JSON.parse(userProfile));
    }
  }, [userProfile]);

  // Fetch User Collection
  useEffect(() => {
    setIsLoading(true);
    if (selectedProfile == null || !twitchAccessToken) return;
    const fetchUserCollection = async () => {
      // const gameNames = await Promise.all(
      //   selectedProfile.collection.map((game) => {
      //     return axios.post(`${baseURL}/app/search_game_details`, {
      //       token: twitchAccessToken,
      //       gameId: game.id,
      //     });
      //   })
      // );
      setUserCollection(selectedProfile.collection);
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

  // Add game name and id to DB
  const addGameHandler = async (game) => {
    try {
      const request = await axios.post(`${baseURL}/app/update_collection`, {
        email: userEmail,
        currentProfile: userProfile,
        game: {
          name: game.name,
          id: game.id,
          imageURL: `//images.igdb.com/igdb/image/upload/t_cover_big_2x/${game.cover.image_id}.jpg`,
          playtime: 0,
        },
      });
      localStorage.setItem('user', JSON.stringify(request.data.response));
      const currentProfile = request.data.response.profiles.filter((obj) => {
        return obj.name === userProfile;
      });
      localStorage.setItem('profile', JSON.stringify(currentProfile[0]));
      setSelectedProfile(currentProfile[0]);
      return `Successfully added!`;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const removeGameHandler = async (game) => {
    try {
      const request = await axios.put(`${baseURL}/app/remove_game`, {
        email: userEmail,
        currentProfile: userProfile,
        game,
      });
      localStorage.setItem('user', JSON.stringify(request.data.response));
      const currentProfile = request.data.response.profiles.filter((obj) => {
        return obj.name === userProfile;
      });
      localStorage.setItem('profile', JSON.stringify(currentProfile[0]));
      setSelectedProfile(currentProfile[0]);
      return 'Successfully removed!';
    } catch (error) {
      console.log(error);
    }
  };

  // Login user if verification succeeds.
  const loginAuthentication = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    setLoggedUser(user);
    audio.play();
  };

  // Logout the user
  const logoutHandler = () => {
    window.location = '/';
    localStorage.removeItem('user');
    localStorage.removeItem('profile');
    localStorage.removeItem('password');
    localStorage.removeItem('spotify_token');
    sessionStorage.removeItem('steamID');
    setSelectedProfile(null);
    setLoggedUser(null);
  };

  const changeProfile = (user) => {
    setChangingUser(true);
    setSelectedProfile(user);
    localStorage.setItem('profile', JSON.stringify(user));
    setTimeout(() => {
      setChangingUser(false);
    }, 2000);
  };

  const playTrack = (track) => {
    setCurrentTrack(track);
  };

  // Display login page if app detects sign out or sign in
  if (!loggedUser && !toLanding) {
    return (
      <Login
        error={error}
        toLanding={() => setToLanding(true)}
        landing={toLanding}
        loading={isLoading}
        onLogin={loginAuthentication}
      />
    );
  }

  // If a new user show landing page
  if (toLanding) {
    return (
      <LandingPage
        loginAuthentication={loginAuthentication}
        toSignIn={() => {
          setToLanding(false);
          setChangingUser(true);
        }}
      />
    );
  }

  // After login redirect to select user profile
  if (!selectedProfile) {
    return (
      <ProfilesPage
        updatingUser={() => setUpdatingUser(true)}
        saveEdit={() => setEditingUser(true)}
        updateUser={updatingUser}
        currentUser={loggedUser}
        selectProfile={(user) => setSelectedProfile(user)}
        twitchToken={twitchAccessToken}
      />
    );
  }

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
      <GameDetails
        game={gameDetails}
        closeDetails={() => setGameDetails(null)}
        twitchToken={twitchAccessToken}
        addGame={(game) => addGameHandler(game)}
        removeGame={(game) => removeGameHandler(game)}
        activeProfile={selectedProfile}
      />
    );
  }

  if (viewingCollection)
    return (
      <UserCollection
        collection={userCollection}
        activeProfile={selectedProfile}
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
            setGameDetails={(game) => setGameDetails(game.game.id)}
          />
          <TrendingRow />
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
            viewCollection={() => setViewingCollection(true)}
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
    </div>
  );
}

export default App;
