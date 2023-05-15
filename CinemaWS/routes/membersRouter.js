const express = require("express");
const membersBLL = require("../BLL/membersBLL");

const router = express.Router();

router.route("/").get(async (req, res) => {
    const members = await membersBLL.getAllMembers();
    res.json(members);
});

router.route("/add").post(async (req, res) => {
    const member = req.body;
    const result = await membersBLL.addMember(member);
    res.json(result);
});

router.route("/:id").post(async (req, res) => {
    const updatedMember = req.body;
    const { id } = req.params;
    const result = await membersBLL.updateMember(updatedMember, id);
    res.json(result);
});

module.exports = router;
