import './App.css';
import Row from './components/Row/Row';
import requests from './requests';
import Banner from './components/Banner/Banner';
import Nav from './components/Nav/Nav';
import MainRow from './components/MainRow/MainRow';

function App() {
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
