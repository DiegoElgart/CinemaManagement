const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema(
    {
        Name: { type: String, required: true },
        Genres: [{ type: String, required: true }],
        Image: { type: String, required: true },
        Premiered: { type: Date, required: true },
    },
    { versionKey: false }
);

const Movie = mongoose.model("movie", movieSchema);

module.exports = Movie;
