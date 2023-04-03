const Subscription = require("../models/subscriptionModel");

const getAllSubscriptions = async () => {
    const subscriptions = await Subscription.find();
    return subscriptions;
};

const addSubscription = async obj => {
    const { memberId } = obj;
    const existingSubscription = await Subscription.findOne({ memberId });
    if (existingSubscription) {
        throw new Error("Subscription already exitst");
    }
    const subscription = new Subscription(obj);
    await subscription.save();
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
module.exports = {
    getAllSubscriptions,
    addSubscription,
    getSubscriptionById,
    updateSubscriptionById,
    deleteSubscriptionById,
};
