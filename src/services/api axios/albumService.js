import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api"; 

export const getAlbums = () => {
  return axios.get(`${API_BASE_URL}/albums`)
  .then((response) => response.data);
};

export const createAlbum = (album) => {
  return axios
    .post(`${API_BASE_URL}/albums`, album)
    .then((response) => response.data);
};

export const updateAlbum = (albumId, album) => {
  return axios
    .put(`${API_BASE_URL}/albums/${albumId}`, album)
    .then((response) => response.data);
};
