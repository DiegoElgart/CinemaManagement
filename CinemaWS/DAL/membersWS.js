const axios = require("axios");

const URL = "http://localhost:4000/members";

const getAllMembers = () => {
	return axios.get(URL);
};

const addMember = async obj => {
	return await axios.post(`${URL}/new`, obj);
};

const updateMember = async (id, obj) => {
	const result = await axios.post(`${URL}/${id}`, obj);

	return result;
};

const deleteMember = async id => {
	return await axios.post(`${URL}/delete/${id}`);
};

const getAllMembersAndSubscriptios = async () => {
	return await axios.get(`${URL}/subs`);
};

module.exports = { getAllMembers, addMember, updateMember, deleteMember, getAllMembersAndSubscriptios };
