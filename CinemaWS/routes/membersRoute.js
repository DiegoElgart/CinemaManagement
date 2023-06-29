const express = require("express");
const membersBLL = require("../BLL/membersBLL");

const router = express.Router();

router.route("/").get(async (req, res) => {
	try {
		const members = await membersBLL.getAllMembers();
		res.json(members);
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

router.route("/:id").get(async (req, res) => {
	try {
		const { id } = req.params;
		const member = await membersBLL.getMemberById(id);
		res.json(member);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

router.route("/add").post(async (req, res) => {
	try {
		const member = req.body;
		const result = await membersBLL.addMember(member);
		res.json(result);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

router.route("/:id").post(async (req, res) => {
	try {
		const updatedMember = req.body;
		const { id } = req.params;
		const result = await membersBLL.updateMember(updatedMember, id);
		res.json(result);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

router.route("/:id/delete").post(async (req, res) => {
	try {
		const { id } = req.params;
		const result = await membersBLL.deleteMember(id);
		res.json(result);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

module.exports = router;
