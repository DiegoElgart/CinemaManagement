const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const userBLL = require("../bll/usersBLL");
const bcrypt = require("bcrypt");

require("dotenv").config();

const router = express.Router();

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

// router.route("/signUp").post(async (req, res) => {
//     try {
//         const { username, password } = req.body;
//         const user = {
//             username,
//             password,
//         };

//         const result = await userBLL.checkIfUserExistsAndUpdatePassword(user);

//         if (!result) {
//             res.status(401).json("no username or password");
//         } else {
//             res.status(200).json(result);
//         }
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

module.exports = router;
