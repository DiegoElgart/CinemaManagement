const moviesDAL = require("../DAL/movieWS");
const Movie = require("../models/movieModel");

const getAllMovies = async () => {
    let { data: movies } = await moviesDAL.getAllMovies();

    movies = movies.map(movie => {
        return {
            name: movie.name,
            genres: [...movie.genres],
            image: movie.image.original,
            premiered: movie.premiered,
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

const addMovie = async obj => {
    const { name } = obj;
    const existingMovie = await Movie.findOne({ name });
    if (existingMovie) {
        throw new Error("Movie already exitst with given name");
    }
    const movie = new Movie(obj);
    await movie.save();
    return "Movie Created";
};

const updateMovie = async (id, obj) => {
    await Movie.findByIdAndUpdate(id, obj);
    return "Movie Updated";
};

const deleteMovie = async id => {
    await Movie.findByIdAndDelete(id);
    return "Movie Deleted";
};

module.exports = { getAllMovies, addMovie, updateMovie, deleteMovie };
