const axios = require("axios");

const getAllMovies = () => {
    return axios.get("http://api.tvmaze.com/shows");
};

module.exports = { getAllMovies };
