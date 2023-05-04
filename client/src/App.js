import { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import loginAudio from './assets/sounds/success.wav';
import useTwitchAuth from './hooks/useTwitchAuth';
import axios from 'axios';

// Component Imports
const ProfilesPage = lazy(() =>
  import('./components/Login/Profiles/ProfilesPage')
);
const Dashboard = lazy(() => import('./components/Dashboard/Dashboard'));
const Authentication = lazy(() =>
  import('./components/Authentication/Authentication')
);
const SearchResultsIGDB = lazy(() =>
  import('./components/SearchResults/SearchResultsIGDB')
);

const code = new URLSearchParams(window.location.search).get('code');

function App() {
  const navigate = useNavigate();
  // User states
  const [changingUser, setChangingUser] = useState(false);
  const [loggedUser, setLoggedUser] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [profileCollection, setProfileCollection] = useState([]);
  const [profileNotesData, setProfileNotesData] = useState(null);
  const [displayNotification, setDisplayNotification] = useState(false);
  const [notification, setNotification] = useState({ status: '', message: '' });
  const [currentGameOpen, setCurrentGameOpen] = useState(null);
  const [changingGameStatus, setChangingGameStatus] = useState(false);

  // Local Variables
  const baseURL = process.env.REACT_APP_BASE_URL;
  const userEmail = localStorage.getItem('user');
  const userProfile = localStorage.getItem('profile');

  let audio = new Audio(loginAudio);
  const twitchAccessToken = useTwitchAuth(code);

  const getUserNotes = async (id) => {
    const request = await axios.get(`${baseURL}/notes/get_notes`, {
      params: {
        id: id,
      },
    });
    console.log(request);
    setProfileNotesData(request.data);
    return request.data;
  };

  // Check to see which user is currently logged in and which profile is active
  useEffect(() => {
    if (!userEmail) navigate('/login');
    const updateUser = async () => {
      if (!userEmail) navigate('/login');
      try {
        const request = await axios.get(`${baseURL}/app/get_user`, {
          params: {
            email: userEmail,
          },
        });
        const result = await request.data;
        setLoggedUser(result);
        return result;
      } catch (error) {
        console.log(error);
        window.location.reload();
      }
    };
    updateUser();
  }, [userEmail, userProfile]);

  useEffect(() => {
    if (!userProfile || !loggedUser) return;

    const getProfileData = (profile) => {
      const currentProfile = loggedUser.profiles.filter((obj) => {
        return obj.name === profile;
      });
      setSelectedProfile(currentProfile[0]);

      if (currentProfile[0].collection) {
        setProfileCollection(
          currentProfile[0].collection.filter((game) => game.id !== null)
        );
      }
    };
    getProfileData(userProfile);
  }, [selectedProfile, loggedUser]);

  useEffect(() => {
    if (selectedProfile && selectedProfile.notesId) {
      getUserNotes(selectedProfile.notesId);
    }
  }, [selectedProfile]);

  // Search for the game, publisher, or developer that the user types in from nav
  const fetchSubmittedGame = async (game) => {
    navigate(`/search`, {
      state: { name: game },
    });
  };

  const updateGameStatus = async (action, game) => {
    setChangingGameStatus(true);
    if (action == 'ADD') {
      const exists = profileCollection.some((item) => item.id === game.id);
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
          email: loggedUser.email,
          currentProfile: selectedProfile.name,
          name: game.name,
          id: game.id,
          imageURL: `//images.igdb.com/igdb/image/upload/t_1080p_2x/${game.cover.image_id}.jpg`,
          playtime: 0,
          origin: 'gameflix',
          status: 'BACKLOG',
        });

        const filteredProfile = request.data.response.profiles.filter((obj) => {
          return obj.name === selectedProfile.name;
        });

        setProfileCollection(
          filteredProfile[0].collection.filter((game) => game.id !== null)
        );
        setNotification({
          message: `${game.name} sucessfully added to your collection!`,
          status: 'SUCCESS',
        });
        setDisplayNotification(true);
        setChangingGameStatus('success');
        return;
      } catch (error) {
        setNotification({
          message: `Unable to add ${game.name} to your collection!`,
          status: 'ERROR',
        });
        setDisplayNotification(true);
        setChangingGameStatus('error');
        return error;
      }
    } else {
      try {
        const request = await axios.put(`${baseURL}/app/remove_game`, {
          email: loggedUser.email,
          currentProfile: selectedProfile.name,
          game: game.id,
        });

        localStorage.setItem('user', request.data.response.email);
        const filteredProfile = request.data.response.profiles.filter((obj) => {
          return obj.name === selectedProfile.name;
        });
        setProfileCollection(
          filteredProfile[0].collection.filter((game) => game.id !== null)
        );

        setNotification({
          message: `${game.name} sucessfully removed from your collection!`,
          status: 'SUCCESS',
        });
        setDisplayNotification(true);
        setChangingGameStatus('success');
        return;
      } catch (error) {
        console.log(error);
        setNotification({
          message: `Unable to remove ${game.name} from your collection!`,
          status: 'ERROR',
        });
        setDisplayNotification(true);
        setChangingGameStatus('error');
        return error;
      }
    }
  };

  // Login user if verification succeeds.
  const loginAuthentication = (user) => {
    localStorage.setItem('user', user.email);
    setLoggedUser(user);
    audio.play();
    navigate('/', { replace: true });
  };

  const changeProfile = (user) => {
    setChangingUser(true);
    // setSelectedProfile(user.name);
    localStorage.setItem('profile', user.name);
    setTimeout(() => {
      setChangingUser(false);
    }, 2000);
  };

  const openGameWindow = (game) => {
    setCurrentGameOpen(game.id);
    document.body.style.overflow = 'hidden';
  };

  const closeGameWindow = () => {
    document.body.style.overflow = 'auto';
    setCurrentGameOpen(null);
  };

  const closeSearchResults = () => {
    navigate('/');
  };

  // Logout the user
  const logoutHandler = () => {
    setLoggedUser(null);
    setSelectedProfile(null);
    localStorage.clear();
  };

  // Loading screen for profile change
  if (changingUser) {
    return (
      <div className='loading_profile__container'>
        <div
          className='loading_profile'
          style={{ '--color-theme': selectedProfile.color }}
        >
          <img src={selectedProfile.avatar} alt='current user avatar' />
        </div>
      </div>
    );
  }

  if (!userProfile && loggedUser) {
    return (
      <ProfilesPage
        updateUser={(user) => setLoggedUser(user)}
        currentUser={loggedUser}
        selectProfile={(user) => setSelectedProfile(user)}
        twitchAccessToken={twitchAccessToken}
      />
    );
  }

  return (
    <Routes>
      <Route
        path='/login'
        element={
          <Suspense fallback={<>...</>}>
            <Authentication onLogin={loginAuthentication} />
          </Suspense>
        }
      />
      <Route
        path='/search'
        element={
          <Suspense fallback={<>...</>}>
            <SearchResultsIGDB
              closeSearchResults={closeSearchResults}
              currentGameOpen={currentGameOpen}
              openGame={(game) => openGameWindow(game)}
              closeGameWindow={closeGameWindow}
              updateGameStatus={(action, game) =>
                updateGameStatus(action, game)
              }
              currentProfile={selectedProfile}
              setNotification={(status, message) =>
                setNotification({ status, message })
              }
              currentCollection={profileCollection}
            />
          </Suspense>
        }
      />
      <Route
        path='/'
        element={
          <Suspense fallback={<>...</>}>
            <Dashboard
              fetchGame={(game) => fetchSubmittedGame(game)}
              currentUser={loggedUser}
              twitchToken={twitchAccessToken}
              currentProfile={selectedProfile}
              currentCollection={profileCollection}
              updateCollection={(collection) =>
                setProfileCollection(
                  collection.filter((game) => game.id !== null)
                )
              }
              changeProfile={(user) => changeProfile(user)}
              selectProfile={(user) => setSelectedProfile(user)}
              userNotes={profileNotesData}
              updateGameStatus={(action, game) =>
                updateGameStatus(action, game)
              }
              logoutUser={logoutHandler}
              gameStatus={changingGameStatus}
              resetGameStatus={() => setChangingGameStatus(false)}
            />
          </Suspense>
        }
      />
    </Routes>
  );
}

export default App;
