const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const userBLL = require("../bll/usersBLL");
const bcrypt = require("bcrypt");
const saltRounds = 10;

require("dotenv").config();

const router = express.Router();

// router.route("/getUsers").get(async (req, res) => {
//     try {
//         const data = await userBLL.getUsers();
//         res.json(data);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

router.route("/login").post(async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username: username });
        const checkPassword = await bcrypt.compare(password, user.password);

        if (user && checkPassword) {
            const userId = user.id;
            const ACCESS_SECRET_TOKEN = process.env.SECRET_KEY;
            const accessToken = jwt.sign({ id: userId }, ACCESS_SECRET_TOKEN);
            res.header("access-Token", accessToken);
            res.json({ accessToken, user });
        } else {
            res.status(401).json("Wrong Username or Password");
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.route("/signUp").post(async (req, res) => {
    try {
        const { username, password } = req.body;
        const checkIfUser = await User.find({ username: username });

        if (checkIfUser.length == 1) {
            res.json("User already registered! Try to log in");
        } else {
            const hashPassword = await bcrypt.hash(password, saltRounds);

            const user = new User({ username, password: hashPassword });
            await userBLL.setUsers(user);
            await user.save();
            res.status(201).json("created");
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;