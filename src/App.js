import './App.css';
import Row from './components/Row/Row';
import requests from './requests';
import Banner from './components/Banner/Banner';
import Nav from './components/Nav/Nav';

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
  //   };
  //   generateTwitchToken();
  // }, []);

  return (
    <div className='App'>
      <Nav />
      <Banner />
      {requests.map((request) => (
        <Row
          key={request.requestId}
          title={request.title}
          fetchURL={request.url}
          todaysDate={request.todaysDate}
        />
      ))}
    </div>
  );
}

export default App;
