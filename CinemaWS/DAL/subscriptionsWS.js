const axios = require("axios");

const getAllMembers = () => {
    return axios.get("http://localhost:4000/members");
};

const addMember = async obj => {
    return await axios.post("http://localhost:4000/members/new", obj);
};

const updateMember = async (obj, id) => {
    return await axios.post(`http://localhost:4000/members/${id}`, obj);
};

const deleteMember = async id => {
    return await axios.post(`http://localhost:4000/members/${id}`);
};

module.exports = { getAllMembers, addMember, updateMember, deleteMember };
