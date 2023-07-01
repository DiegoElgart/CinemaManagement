const axios = require("axios");

const URL = "http://localhost:4000/subscriptions";

const getAllSubscriptions = async () => {
	return await axios.get(URL);
};

const addSubscription = async obj => {
	return await axios.post(`${URL}/new`, obj);
};

const getSubscriptionByMovieId = async movieId => {
	const result = await axios.get(`${URL}/movieId/${movieId}`);
	return result.data;
};

const getSubscriptionByMemberId = async memberId => {
	const result = await axios.get(`${URL}/memberId/${memberId}`);
	return result.data;
};

const deleteSubscriptionByMemberId = async memberId => {
	const result = await axios.post(`${URL}/delete/${memberId}`);
	return result.data;
};

module.exports = { getAllSubscriptions, addSubscription, getSubscriptionByMovieId, getSubscriptionByMemberId, deleteSubscriptionByMemberId };
