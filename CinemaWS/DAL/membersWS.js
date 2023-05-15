const axios = require("axios");

const URL = "http://localhost:4000/members";

const getAllMembers = () => {
    return axios.get(URL);
};

const addMember = async obj => {
    return await axios.post(`${URL}/new`, obj);
};

const updateMember = async (obj, id) => {
    return await axios.post(`${URL}/${id}`, obj);
};

const deleteMember = async id => {
    return await axios.post(`${URL}/${id}`);
};

module.exports = { getAllMembers, addMember, updateMember, deleteMember };
