const express = require("express");
const moviesBLL = require("../BLL/movieBLL");

const router = express.Router();

router.route("/").get(async (req, res) => {
    try {
        const movies = await moviesBLL.getAllmovies();
        res.json(movies);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.route("/new").post(async (req, res) => {
    try {
        const obj = req.body;
        const result = await moviesBLL.addMovie(obj);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
