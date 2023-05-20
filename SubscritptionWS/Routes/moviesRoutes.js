const express = require("express");
const moviesBLL = require("../BLL/moviesBLL");

const router = express.Router();

router.route("/").get(async (req, res) => {
    try {
        const movies = await moviesBLL.getAllMovies();
        res.json(movies);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.route("/:id").get(async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await moviesBLL.getMovieById(id);
        res.json(movie);
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

router.route("/:id").post(async (req, res) => {
    try {
        const obj = req.body;
        const { id } = req.params;
        const result = await moviesBLL.updateMovie(id, obj);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.route("/delete/:id").post(async (req, res) => {
    try {
        const { id } = req.params;
        const result = await moviesBLL.deleteMovie(id);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
