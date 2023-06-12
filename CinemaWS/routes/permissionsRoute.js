const express = require("express");
const permissionsBLL = require("../BLL/permissionsBLL");

const router = express.Router();

router.route("/").get(async (req, res) => {
    try {
        const data = await permissionsBLL.getPermissions();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
module.exports = router;
