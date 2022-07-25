import './App.css';
import { useState } from 'react';
import Row from './components/Row/Row';
import requests from './requests';
import Banner from './components/Banner/Banner';
import Nav from './components/Nav/Nav';
import MainRow from './components/MainRow/MainRow';
import Loading from './components/LoadingAnimation/Loading';

function App() {
  // const [accessToken, setAccessToken] = useState(localStorage.getItem('token'));

  // useEffect(() => {
  //   // Generate Twitch Access Token for the IGDB API
  //   const generateTwitchToken = async () => {
  //     const response = await fetch(
  //       'https://id.twitch.tv/oauth2/token?client_id=kr3nccu71yvbuffq6ko4bnokn3kdj1&client_secret=822m4qvsvzquzfk6l4whad2owiu3vr&grant_type=client_credentials',
  //       { method: 'POST' }
  //     );
  //     const data = await response.json();
  //     setAccessToken(data['access_token']);
  //     localStorage.setItem('token', accessToken);
  //     console.log(accessToken);
  //   };
  //   generateTwitchToken();
  // }, []);

  const [loading, setLoading] = useState(false);
  if (loading) {
    return <Loading />;
  }

  return (
    <div className='App'>
      <Nav />
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
