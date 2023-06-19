const moviesDAL = require("../DAL/moviesWS");

const getAllmovies = async () => {
    const { data: movies } = await moviesDAL.getAllMovies();

    return movies;
};

const getMovieById = async id => {
    const movies = await getAllmovies();
    const movie = movies.find(movie => movie._id === id);
    return movie;
};

const addMovie = async obj => {
    const result = await moviesDAL.addMovie(obj);
    return result;
};

const updateMovie = async (id, obj) => {
    await moviesDAL.updateMovie(id, obj);
    return "Movie Updated!";
};

const deleteMovie = async id => {
    await moviesDAL.deleteMovie(id);
    return "Movie Deleted!";
};

module.exports = {
    getAllmovies,
    getMovieById,
    addMovie,
    updateMovie,
    deleteMovie,
};
