import axios from 'axios';

// Base url for RAWG fetch requests
const rawgClient = axios.create({
  baseURL: 'https://api.rawg.io/api/',
});

export default rawgClient;
