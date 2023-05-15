const subscriptionsDAL = require("../DAL/subscriptionWS");

const getAllSubscriptions = () => {
    const data = subscriptionsDAL.getAllSubscriptions();
    return data;
};

const addSubscription = async obj => {
    await subscriptionsDAL.addSubscription(obj);
    return "Subscription added!";
};

module.export = { getAllSubscriptions, addSubscription };
