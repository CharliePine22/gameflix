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

// Asset Imports
import requests from './requests';
import loginAudio from './assets/sounds/success.wav';
import rawgClient from './axios';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [changingUser, setChangingUser] = useState(false);
  const [loggedUser, setLoggedUser] = useState(null);
  const [searchSubmitted, setSearchSubmitted] = useState(false);
  const [searchedGame, setSearchedGame] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [toLanding, setToLanding] = useState(true);
  const [rowsLoaded, setRowsLoaded] = useState(false);

  let audio = new Audio(loginAudio);

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

  // Login user if verification succeeds.
  const loginAuthentication = (email, password) => {
    setIsLoading(true);
    localStorage.setItem('user', email);
    localStorage.setItem('password', password);
    setTimeout(() => {
      setLoggedUser(email);
      setIsLoading(false);
      audio.play();
    }, 2000);
  };

  // Logout the user
  const logoutHandler = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('profile');
    window.location.reload();
  };

  // Choose active profile
  const changeProfile = (user) => {
    setChangingUser(true);
    setSelectedProfile(user);
    localStorage.setItem('profile', JSON.stringify(user));
    setTimeout(() => {
      setChangingUser(false);
    }, 2000);
  };

  // Check to see if user is logged in
  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setLoggedUser(loggedInUser);
    }
  }, []);

  // Check to see which profile is active
  useEffect(() => {
    const userProfile = localStorage.getItem('profile');
    if (userProfile) {
      setSelectedProfile(userProfile);
    }
  }, []);

  // Display login page if app detects sign out or sign in
  if (!loggedUser && !toLanding) {
    return (
      <Login
        toLanding={() => setToLanding(true)}
        landing={toLanding}
        loading={isLoading}
        onLogin={loginAuthentication}
      />
    );
  }

  // If
  if (toLanding) {
    return <LandingPage toSignIn={() => setToLanding(false)} />;
  }

  // After login redirect to select user profile
  if (!selectedProfile) {
    return <ProfilesPage selectProfile={(user) => setSelectedProfile(user)} />;
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
        currentUser={selectedProfile}
        changeUser={changeProfile}
        onLogout={logoutHandler}
        fetchSubmittedGame={fetchSubmittedGame}
        closeSearchResults={closeSearchResults}
        toProfilePage={() => setSelectedProfile(null)}
      />
      {!searchSubmitted ? (
        <>
          <Banner />
          <MainRow />
          <TrendingRow />
          {requests.map(
            (request) =>
              request.title !== 'COMING SOON' &&
              request.title !== 'TRENDING TITLES' && (
                <Row
                  key={request.requestId}
                  title={request.title}
                  fetchURL={request.url}
                  todaysDate={request.todaysDate}
                />
              )
          )}
        </>
      ) : (
        <SearchResults searchedGame={searchedGame} />
      )}
    </div>
  );
}

export default App;
