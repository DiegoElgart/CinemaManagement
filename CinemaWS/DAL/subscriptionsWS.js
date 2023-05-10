const axios = require("axios");

const getAllMembers = () => {
    return axios.get("http://localhost:4000/members");
};

const addMember = async obj => {
    return await axios.post("http://localhost:4000/members/new", obj);
};

module.exports = { getAllMembers, addMember };
