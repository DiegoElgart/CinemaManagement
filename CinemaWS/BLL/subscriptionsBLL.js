const subscriptionsDAL = require("../DAL/subscriptionWS");

const getAllSubscriptions = async () => {
	const { data } = await subscriptionsDAL.getAllSubscriptions();
	return data;
};

const getSubscriptionById = async id => {
	const subscriptions = await getAllSubscriptions();
	const subscription = subscriptions.find(subs => subs._id === id);
	return subscription;
};

const addSubscription = async obj => {
	await subscriptionsDAL.addSubscription(obj);
	return "Subscription added!";
};

const getSubscriptionByMovieId = async movieId => {
	const members = await subscriptionsDAL.getSubscriptionByMovieId(movieId);
	return members;
};

const getSubscriptionByMemberId = async memberId => {
	const members = await subscriptionsDAL.getSubscriptionByMemberId(memberId);
	return members;
};
const deleteSubscriptionByMemberId = async memberId => {
	const deletedMember = await subscriptionsDAL.deleteSubscriptionByMemberId(memberId);
	return deletedMember;
};
module.exports = {
	getAllSubscriptions,
	getSubscriptionById,
	addSubscription,
	getSubscriptionByMovieId,
	getSubscriptionByMemberId,
	deleteSubscriptionByMemberId,
};
