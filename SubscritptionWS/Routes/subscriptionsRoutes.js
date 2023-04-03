const express = require("express");
const subscriptionsBLL = require("../BLL/subscriptionsBLL");

const router = express.Router();

router.route("/").get(async (req, res) => {
    try {
        const subscriptions = await subscriptionsBLL.getAllSubscriptions();
        res.json(subscriptions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.route("/:id").get(async (req, res) => {
    try {
        const { id } = req.params;
        const result = await subscriptionsBLL.getSubscriptionById(id);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.route("/new").post(async (req, res) => {
    try {
        const obj = req.body;
        const result = await subscriptionsBLL.addSubscription(obj);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.route("/:id").post(async (req, res) => {
    try {
        const obj = req.body;
        const { id } = req.params;
        const result = await subscriptionsBLL.updateSubscriptionById(id, obj);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.route("/delete/:id").post(async (req, res) => {
    try {
        const { id } = req.params;
        const result = await subscriptionsBLL.deleteSubscriptionById(id);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
