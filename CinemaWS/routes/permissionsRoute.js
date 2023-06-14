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

router.route("/:id").get(async (req, res) => {
    try {
        const { id } = req.params;
        const data = await permissionsBLL.getPermissionById(id);
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.route("/new").post(async (req, res) => {
    try {
        const obj = req.body;
        const result = await permissionsBLL.setPermissions(obj);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.route("/:id").post(async (req, res) => {
    try {
        const { id } = req.params;
        const obj = req.body;
        const result = await permissionsBLL.updatePermissionsById(id, obj);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
module.exports = router;
