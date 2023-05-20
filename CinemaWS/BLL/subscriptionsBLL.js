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

module.exports = { getAllSubscriptions, getSubscriptionById, addSubscription };
