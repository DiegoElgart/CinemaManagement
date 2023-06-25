const Subscription = require("../models/subscriptionModel");
const memberBLL = require("../BLL/membersBLL");
const moviesBLL = require("./moviesBLL");
const getAllSubscriptions = async () => {
	const subscriptions = await Subscription.find();
	return subscriptions;
};

const addSubscription = async obj => {
	const { memberId } = obj;
	const existingSubscription = await Subscription.findOne({ memberId });
	if (existingSubscription) {
		await updateSubscriptionById(memberId, obj);
	} else {
		const subscription = new Subscription(obj);
		await subscription.save();
	}
	return "Subscription Created";
};

const getSubscriptionById = async id => {
	const subscriptions = await Subscription.findById(id);
	return subscriptions;
};

const updateSubscriptionById = async (id, obj) => {
	await Subscription.findByIdAndUpdate(id, obj);
	return "Subscription Updated";
};

const deleteSubscriptionById = async id => {
	await Subscription.findByIdAndDelete(id);
	return "Subscription Deleted";
};

// NO ESTOY MUY SEGURO DE ESTO
// const getMembersByMovieId = async id => {
// 	try {
// 		const membersId = await Subscription.find({
// 			"movies.movieId": id,
// 		});
// 		console.log(membersId);
// 		const members = await Promise.all(membersId.map(member => memberBLL.getMemberById(member.memberId)));

// 		return members;
// 	} catch (error) {
// 		console.error(error);
// 		throw error;
// 	}
// };

const getMoviesByMemberId = async id => {
	try {
		const { movies } = await Subscription.findOne({ memberId: id });
		const moviesObj = await Promise.all(movies.map(movie => moviesBLL.getMovieById(movie.movieId)));
		return moviesObj;
	} catch (err) {
		console.error(err);
		throw err;
	}
};

module.exports = {
	getAllSubscriptions,
	addSubscription,
	getSubscriptionById,
	updateSubscriptionById,
	deleteSubscriptionById,
	//getMembersByMovieId,
	getMoviesByMemberId,
};
