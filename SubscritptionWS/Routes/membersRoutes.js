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

router.route("/:id").get(async (req, res) => {
    try {
        const { id } = req.params;
        const member = await membersBLL.getMemberById(id);
        res.json(member);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.route("/new").post(async (req, res) => {
    try {
        const obj = req.body;
        const result = await membersBLL.addMember(obj);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.route("/:id").post(async (req, res) => {
    try {
        const obj = req.body;
        const { id } = req.params;
        const result = await membersBLL.updateMember(id, obj);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.route("/delete/:id").post(async (req, res) => {
    try {
        const { id } = req.params;
        const result = await membersBLL.deleteMember(id);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
