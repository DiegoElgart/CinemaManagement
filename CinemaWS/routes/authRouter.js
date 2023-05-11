const express = require("express");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const router = express.Router();

// Entry point 'http://localhost:3000/auth'

router.route("/login").post(async (req, res) => {
    const { username, password } = req.body;
});
