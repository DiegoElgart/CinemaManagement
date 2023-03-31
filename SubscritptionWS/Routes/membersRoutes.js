const express = require("express");
const membersBLL = require("../BLL/membersBLL");

const router = express.Router();

router.route("/").get(async (req, res) => {
    const members = await membersBLL.getAllMembers();
    res.json(members);
});

module.exports = router;
