const express = require("express");
const subscriptionsBLL = require("../BLL/subscriptionsBLL");

const router = express.Router();

router.route("/").get(async (req, res) => {
	try {
		const data = await subscriptionsBLL.getAllSubscriptions();
		res.json(data);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

router.route("/:id").get(async (req, res) => {
	try {
		const { id } = req.params;
		const data = await subscriptionsBLL.getSubscriptionById(id);
		res.json(data);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

router.route("/subs").get(async (req, res) => {
	try {
		const members = await membersBLL.getAllMembersAndSubscriptios();
		res.json(members);
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

router.route("/movies/:id").get(async (req, res) => {
	try {
		const { id } = req.params;
		const result = await subscriptionsBLL.getMembersByMovieId(id);
		res.json(result);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

router.route("/memberId/:id").get(async (req, res) => {
	try {
		const { id } = req.params;
		const result = await subscriptionsBLL.getMoviesByMemberId(id);
		res.json(result);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

module.exports = router;
