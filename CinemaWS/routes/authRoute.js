const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const usersBLL = require("../BLL/usersBLL");
const bcrypt = require("bcrypt");

require("dotenv").config();

const router = express.Router();

router.route("/login").post(async (req, res) => {
	try {
		const { username, password } = req.body;
		const user = await User.findOne({ username: username });

		const fullUser = await usersBLL.getUserById(user._id.toString());
		const checkPassword = await bcrypt.compare(password, user.password);

		if (user && checkPassword) {
			const userId = user.id;
			const ACCESS_SECRET_TOKEN = process.env.SECRET_KEY;
			const accessToken = jwt.sign({ id: userId }, ACCESS_SECRET_TOKEN);
			res.header("access-Token", accessToken);
			res.json({ accessToken, user, fname: fullUser.fname, sessionTimeOut: fullUser.sessionTimeOut, permissions: fullUser.permissions });
		} else {
			res.status(401).json("Wrong Username or Password");
		}
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

module.exports = router;
