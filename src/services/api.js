import axios from 'axios';

const API_KEY = 'T7f18476f06msh514343831444335p1e6899jsn20ca860b03f4';
const BASE_URL = 'https://genius-song-lyrics1.p.rapidapi.com/song/details/';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'X-RapidAPI-Key': API_KEY,
  },
});

export default api;

