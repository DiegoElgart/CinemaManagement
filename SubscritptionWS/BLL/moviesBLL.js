const moviesDAL = require("../DAL/movieWS");
const Movie = require("../models/movieModel");

const getAllMovies = async () => {
    let { data: movies } = await moviesDAL.getAllMovies();

    movies = movies.map(movie => {
        return {
            Name: movie.name,
            Genres: [...movie.genres],
            Image: movie.image.original,
            Premiered: movie.premiered,
        };
    });
    const movieDB = await Movie.find();

    if (movieDB.length <= 1) {
        await Movie.insertMany(movies);
        const moviesDB = await Movie.find();
        return moviesDB;
    } else {
        return movies;
    }
};

module.exports = { getAllMovies };
