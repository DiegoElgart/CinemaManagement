const subscriptionsDAL = require("../DAL/subscriptionWS");

const getAllSubscriptions = async () => {
    const { data } = await subscriptionsDAL.getAllSubscriptions();
    return data;
};

const addSubscription = async obj => {
    await subscriptionsDAL.addSubscription(obj);
    return "Subscription added!";
};

module.exports = { getAllSubscriptions, addSubscription };
