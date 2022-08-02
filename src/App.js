import { useState } from 'react';
import './App.css';
import Row from './components/Row/Row';
import requests from './requests';
import Banner from './components/Banner/Banner';
import Nav from './components/Nav/Nav';
import MainRow from './components/MainRow/MainRow';
import Login from './components/Login/Login';
import loginAudio from './assets/sounds/success.wav';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  let audio = new Audio(loginAudio);

  // Login user if verification succeeds.
  const loginAuthentication = (email, password) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      audio.play();
      setIsAuthenticated(true);
    }, 2000);
  };

  // Logout the user
  const logoutHandler = () => {
    setIsAuthenticated(false);
    window.location.reload();
  };

  if (!isAuthenticated) {
    return <Login loading={isLoading} onLogin={loginAuthentication} />;
  }

  return (
    <div className='App'>
      <Nav onLogout={logoutHandler} />
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
    </div>
  );
}

export default App;
