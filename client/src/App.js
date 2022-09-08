import { useState, useEffect } from 'react';
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
import SearchResults from './components/SearchResults/SearchResults';

// File Imports
import requests from './requests';
import loginAudio from './assets/sounds/success.wav';
import rawgClient from './axios';
import axios from 'axios';
import SpotifyPlayback from './components/SpotifyPlayback/SpotifyPlayback';
import useSpotifyAuth from './hooks/useSpotifyAuth';
import useTwitchAuth from './hooks/useTwitchAuth';
import UserLibrary from './components/UserLibrary/UserLibrary';

const code = new URLSearchParams(window.location.search).get('code');

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [currentTrack, setCurrentTrack] = useState('');
  const [playAudio, setPlayAudio] = useState(false);
  // User states
  const [changingUser, setChangingUser] = useState(false);
  const [updatingUser, setUpdatingUser] = useState(false);
  const [editingUser, setEditingUser] = useState(false);
  const [loggedUser, setLoggedUser] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState({});
  // Search States
  const [searchSubmitted, setSearchSubmitted] = useState(false);
  const [searchedGame, setSearchedGame] = useState('');
  const [toLanding, setToLanding] = useState(false);
  const [rowsLoaded, setRowsLoaded] = useState(false);

  let audio = new Audio(loginAudio);
  // "proxy": "http://localhost:5000"
  // "proxy": "https://gameflixx-server.herokuapp.com/",

  const spotifyAccessToken = useSpotifyAuth(code);
  const twitchAccessToken = useTwitchAuth(code);

  const closeSearchResults = () => {
    setSearchSubmitted(false);
    setSearchedGame(null);
  };

  // Search for the game, publisher, or developer that the user types in from nav
  const fetchSubmittedGame = async (game) => {
    setSearchSubmitted(true);
    const request = await rawgClient.get(
      `/games?key=df0a614ea95743f7a9e2008a796b5249&search=${game}&ordering=-added&search_exact=true`
    );
    setSearchedGame(request.data.results);
  };

  const fetchUserCollection = async () => {};

  fetchUserCollection();

  // Login user if verification succeeds.
  const loginAuthentication = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    setLoggedUser(user);
    audio.play();
  };

  // Logout the user
  const logoutHandler = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('profile');
    localStorage.removeItem('password');
    setSelectedProfile(null);
    setLoggedUser(null);
    window.location = '/';
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

  // Refetch user data if any changes are made
  useEffect(() => {
    const updateUser = async () => {
      if (!loggedUser) return null;
      const request = await axios.get('/app/get_user', {
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
    if (userProfile) {
      setSelectedProfile(JSON.parse(userProfile));
    }
  }, []);

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
        spotifyToken={spotifyAccessToken}
      />
      {!searchSubmitted ? (
        <>
          <Banner />
          <MainRow />
          <TrendingRow />
          <UserLibrary activeProfile={selectedProfile} />
          {requests.map(
            (request) =>
              request.title !== 'COMING SOON' &&
              request.title !== 'TRENDING' && (
                <Row
                  spotifyToken={spotifyAccessToken}
                  twitchToken={twitchAccessToken}
                  key={request.requestId}
                  title={request.title}
                  fetchURL={request.url}
                  todaysDate={request.todaysDate}
                  playTrack={playTrack}
                  currentTrack={currentTrack}
                  isPlaying={playAudio}
                  pausePlayback={(e) => setPlayAudio(false)}
                  resumePlayback={(e) => setPlayAudio(true)}
                />
              )
          )}
        </>
      ) : (
        <SearchResults searchedGame={searchedGame} />
      )}
      {code && (
        <SpotifyPlayback
          playAudio={playAudio}
          beginPlayback={(e) => setPlayAudio(true)}
          pausePlayback={(e) => setPlayAudio(false)}
          token={spotifyAccessToken}
          trackUri={currentTrack?.uri}
        />
      )}
    </div>
  );
}

export default App;
