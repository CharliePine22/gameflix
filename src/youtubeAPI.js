import axios from 'axios';

// Base url for RAWG fetch requests
const youtubeAPI = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  params: {
    part: 'snippet',
    maxResults: 5,
    key: 'AIzaSyCFUurYVGCQLT1LTk5JxppB6Zqzypo_TVw',
  },
  headers: {},
});

export default youtubeAPI;
