import { useState, useEffect } from 'react';
import './App.css';
import Row from './components/Row/Row';
import requests from './requests';
import Banner from './components/Banner/Banner';
import Nav from './components/Nav/Nav';
import MainRow from './components/MainRow/MainRow';
import Login from './components/Login/Login';
import loginAudio from './assets/sounds/success.wav';
import SearchResults from './components/SearchResults/SearchResults';
import rawgClient from './axios';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [loggedUser, setLoggedUser] = useState(null);
  const [searchSubmitted, setSearchSubmitted] = useState(false);
  const [searchedGame, setSearchedGame] = useState(null);

  let audio = new Audio(loginAudio);

  const closeSearchResults = () => {
    setSearchSubmitted(false);
  };

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
    setTimeout(() => {
      setIsLoading(false);
      audio.play();
    }, 2000);
  };

  // Logout the user
  const logoutHandler = () => {
    localStorage.removeItem('user');
    window.location.reload();
  };

  // Check to see if user is logged in
  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setLoggedUser(loggedInUser);
    }
  }, []);

  // useEffect(() => {
  // if(!searchSubmitted) return null;
  //   const fetchSubmittedGame = async (game) => {};
  //   fetchSubmittedGame;
  // }, []);

  if (!loggedUser) {
    return <Login loading={isLoading} onLogin={loginAuthentication} />;
  }

  return (
    <div className='App'>
      <Nav
        onLogout={logoutHandler}
        fetchSubmittedGame={fetchSubmittedGame}
        closeSearchResults={closeSearchResults}
      />
      {!searchSubmitted ? (
        <>
          <Banner />
          <MainRow />
          {requests.map(
            (request) =>
              request.title !== 'COMING SOON' && (
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
