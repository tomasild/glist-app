import axios from "axios";

const API_BASE_URL = "https://api.7digital.com/1.2/";
export const getSongs = () => {
  return axios.get(`${API_BASE_URL}/songs`).then((response) => response.data);
};

export const createSong = (song) => {
  return axios
    .post(`${API_BASE_URL}/songs`, song)
    .then((response) => response.data);
};

export const updateSong = (songId, song) => {
  return axios
    .put(`${API_BASE_URL}/songs/${songId}`, song)
    .then((response) => response.data);
};
