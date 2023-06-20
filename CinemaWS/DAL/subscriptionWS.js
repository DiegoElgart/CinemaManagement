const axios = require("axios");

const URL = "http://localhost:4000/subscriptions";

const getAllSubscriptions = async () => {
    return await axios.get(URL);
};

const addSubscription = async obj => {
    return await axios.post(`${URL}/new`, obj);
};

const getMembersByMovieId = async movieId => {
    const result = await axios.get(`${URL}/movies/${movieId}`);
    return result.data;
};

module.exports = { getAllSubscriptions, addSubscription, getMembersByMovieId };
