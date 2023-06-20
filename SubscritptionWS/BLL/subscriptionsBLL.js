const Subscription = require("../models/subscriptionModel");
const memberBLL = require("../BLL/membersBLL");
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
const getMembersByMovieId = async id => {
    try {
        const membersId = await Subscription.find({
            "movies.movieId": id,
        });

        const members = await Promise.all(
            membersId.map(member => memberBLL.getMemberById(member.memberId))
        );

        return members;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

module.exports = {
    getAllSubscriptions,
    addSubscription,
    getSubscriptionById,
    updateSubscriptionById,
    deleteSubscriptionById,
    getMembersByMovieId,
};
