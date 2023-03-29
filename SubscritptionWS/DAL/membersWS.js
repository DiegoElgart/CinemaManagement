const axios = require("axios");

const getAllMembers = () => {
    return axios.get("https://jsonplaceholder.typicode.com/users");
};

module.exports = { getAllMembers };
