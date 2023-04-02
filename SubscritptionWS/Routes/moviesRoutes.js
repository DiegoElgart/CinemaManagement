const express = require("express");
const moviesBLL = require("../BLL/moviesBLL");

const router = express.Router();

router.route("/").get(async (req, res) => {
    const movies = await moviesBLL.getAllMovies();
    res.json(movies);
});

module.exports = router;
