const Subscription = require("../models/subscriptionModel");
const memberBLL = require("../BLL/membersBLL");
const moviesBLL = require("./moviesBLL");
const { default: mongoose } = require("mongoose");

const getAllSubscriptions = async () => {
	const subscriptions = await Subscription.find();
	return subscriptions;
};

const addSubscription = async obj => {
	const { memberId } = obj;
	const existingSubscription = await Subscription.findOne({ memberId });
	if (existingSubscription) {
		await updateSubscriptionById(existingSubscription._id, obj);
	} else {
		const newSubs = {
			memberId: obj.memberId,
			movies: [{ movieId: obj.movieId, date: obj.date }],
		};
		const subscription = new Subscription(newSubs);
		await subscription.save();
	}
	return "Subscription Created";
};

const getSubscriptionById = async id => {
	const subscriptions = await Subscription.findById(id);
	return subscriptions;
};

const updateSubscriptionById = async (id, obj) => {
	const subscription = await Subscription.findByIdAndUpdate(id, { $push: { movies: [{ movieId: obj.movieId, date: obj.date }] } }, { new: true });
	subscription.save();
	return "Subscription Updated";
};

const deleteSubscriptionByMemberId = async memberId => {
	const result = await Subscription.findOneAndDelete({ memberId: memberId });
	return "Subscription Deleted";
};

const getSubscriptionByMemberId = async id => {
	try {
		const subscription = await Subscription.findOne({ memberId: id });
		if (subscription) {
			const moviesInSubscription = await subscription.getMoviesForMember((err, populatedSubscription) => {
				if (err) console.error(err);
				return;
			});

			return moviesInSubscription;
		}
	} catch (err) {
		console.error(err);
		throw err;
	}
};

const getSubscriptionByMovieId = async movieId => {
	try {
		const subscriptions = await Subscription.find({ "movies.movieId": movieId })
			.populate("memberId")
			.then(member => member)
			.catch(err => console.log(err));

		const subscriptionByMovieId = await subscriptions.map(subs => {
			const { movies } = subs;
			const movie = movies.find(movie => movie.movieId == movieId);
			const obj = {
				movieId: movieId,
				memberId: subs.memberId._id,
				name: subs.memberId.name,
				date: movie.date,
			};
			return obj;
		});

		return subscriptionByMovieId;
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
	deleteSubscriptionByMemberId,
	getSubscriptionByMemberId,
	getSubscriptionByMovieId,
};
