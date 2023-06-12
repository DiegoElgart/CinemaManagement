const express = require("express");
const User = require("../models/userModel");
const userBLL = require("../bll/usersBLL");

const router = express.Router();

router.route("/getUsers").get(async (req, res) => {
    try {
        const data = await userBLL.getUsers();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.route("/:id").get(async (req, res) => {
    try {
        const { id } = req.params;
        const data = await userBLL.getUserById(id);
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.route("/signUp").post(async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = {
            username,
            password,
        };

        const result = await userBLL.checkIfUserExistsAndUpdatePassword(user);

        if (!result) {
            res.status(401).json("no username or password");
        } else {
            res.status(200).json(result);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.route("/:id").post(async (req, res) => {
    try {
        const { id } = req.params;
        const obj = req.body;
        const result = await userBLL.updateUser(id, obj);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
