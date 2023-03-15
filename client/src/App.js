import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';

// Component Imports
import ProfilesPage from './components/Login/Profiles/ProfilesPage';
// File Imports
import loginAudio from './assets/sounds/success.wav';
import axios from 'axios';
import useTwitchAuth from './hooks/useTwitchAuth';
import Authentication from './components/Authentication/Authentication';
import Dashboard from './components/Dashboard/Dashboard';
import SearchResultsIGDB from './components/SearchResults/SearchResultsIGDB';
const code = new URLSearchParams(window.location.search).get('code');

function App() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  // User states
  const [changingUser, setChangingUser] = useState(false);
  const [updatingUser, setUpdatingUser] = useState(false);
  const [editingUser, setEditingUser] = useState(false);
  const [loggedUser, setLoggedUser] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [profileCollection, setProfileCollection] = useState([]);
  const [profileNotesData, setProfileNotesData] = useState(null);
  const [displayNotification, setDisplayNotification] = useState(false);
  const [notification, setNotification] = useState({ status: '', message: '' });
  const [gameDetails, setGameDetails] = useState(null);
  const [currentGameOpen, setCurrentGameOpen] = useState(null);

  // Search States
  const [searchFinished, setSearchFinished] = useState(false);
  const [searchSubmitted, setSearchSubmitted] = useState(false);

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
    setProfileNotesData(request.data);
    return request.data;
  };

  // Check to see which user is currently logged in and which profile is active
  useEffect(() => {
    if (!userEmail) navigate('/login');
    const updateUser = async () => {
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
        navigate('/login');
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
    setSearchSubmitted(true);
    game.replace('Poke', 'Poké');
    let newGame = game.replace('Poke', 'Poké');
    const request = await axios.post('/app/search_game', {
      token: twitchAccessToken,
      gameName: newGame,
    });

    if (request.data.length == 0) {
      setSearchFinished(true);
      setSearchSubmitted(false);
    }
    console.log('HEY');
    navigate(`/search`, {
      state: { name: game, data: request.data },
    });
  };

  // Add game name and id to DB
  const addGameHandler = async (game) => {
    console.log('ADDING GAME');
    const exists = profileCollection.some((item) => item.id === game.id);
    // If user already has game in collection, give notification.
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
      localStorage.setItem('user', request.data.response.email);
      const filteredProfile = request.data.response.profiles.filter((obj) => {
        return obj.name === selectedProfile.name;
      });

      localStorage.setItem('profile', filteredProfile[0].name);
      setSelectedProfile(filteredProfile[0]);
      setProfileCollection(
        filteredProfile[0].collection.filter((game) => game.id !== null)
      );
      // updateCollection(filteredProfile[0].collection);
      setNotification({
        message: `${game.name} sucessfully added to your collection!`,
        status: 'SUCCESS',
      });
      setDisplayNotification(true);
      return;
    } catch (error) {
      console.log(error);
      setNotification({
        message: `Unable to add ${game.name} to your collection!`,
        status: 'ERROR',
      });
      setDisplayNotification(true);
      return error;
    }
  };

  const removeGameHandler = async (game) => {
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
      localStorage.setItem('profile', filteredProfile[0].name);
      setSelectedProfile(filteredProfile[0]);
      setProfileCollection(
        filteredProfile[0].collection.filter((game) => game.id !== null)
      );
      // updateCollection(filteredProfile[0].collection);
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
      return error;
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
    setSearchSubmitted(false);
    navigate('/');
  };

  // Logout the user
  const logoutHandler = () => {
    setLoggedUser(null);
    setSelectedProfile(null);
    localStorage.clear();
    localStorage.setItem('twitch_auth', twitchAccessToken);
  };

  if (!userProfile && loggedUser) {
    return (
      <ProfilesPage
        updatingUser={() => setUpdatingUser(true)}
        saveEdit={() => setEditingUser(true)}
        updateUser={updatingUser}
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
          <Authentication
            loading={isLoading}
            onLogin={loginAuthentication}
            twitchToken={twitchAccessToken}
          />
        }
      />
      <Route
        path='/search'
        element={
          <SearchResultsIGDB
            setGameDetails={(id) => setGameDetails(id)}
            closeSearchResults={closeSearchResults}
            searchGame={fetchSubmittedGame}
            currentGameOpen={currentGameOpen}
            openGame={(game) => openGameWindow(game)}
            closeGameWindow={closeGameWindow}
            addGame={(game) => addGameHandler(game)}
            searchSubmitted={searchSubmitted}
            searchFinished={searchFinished}
          />
        }
      />

      {/* <Route path='/details' 
      
      /> */}

      <Route
        path='/'
        element={
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
            selectProfile={(user) => setSelectedProfile(user)}
            manageProfiles={() => setSelectedProfile(null)}
            userNotes={profileNotesData}
            addGame={(game) => addGameHandler(game)}
            removeGame={(game) => removeGameHandler(game)}
            logoutUser={logoutHandler}
          />
        }
      />
    </Routes>
  );
  // } else {
  //   return (
  //     <div className='auth_login__loading'>
  //       <div className='auth_loading_spinner' />
  //     </div>
  //   );
  // }
}

export default App;
