const axios = require("axios");

const URL = "http://localhost:4000/movies";

const getAllMovies = () => {
    return axios.get(URL);
};

const addMovie = async obj => {
    return await axios.post(`${URL}/new`, obj);
};
const updateMovie = async (id, obj) => {
    return await axios.post(`${URL}/${id}`, obj);
};

const deleteMovie = async id => {
    return await axios.post(`${URL}/delete/${id}`);
};

module.exports = { getAllMovies, addMovie, updateMovie, deleteMovie };
