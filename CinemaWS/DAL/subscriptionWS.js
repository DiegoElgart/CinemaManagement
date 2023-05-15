const axios = require("axios");

const URL = "http://localhost:4000/subscriptions";

const getAllSubscriptions = () => {
    return axios.get(URL);
};

const addSubscription = async obj => {
    return await axios.post(`${URL}/new`, obj);
};

module.exports = { getAllSubscriptions, addSubscription };
