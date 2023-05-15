const moviesDAL = require("../DAL/moviesWS");

const getAllmovies = async () => {
    const { data: movies } = await moviesDAL.getAllMovies();

    return movies;
};

const addMovie = async obj => {
    await moviesDAL.addMovie(obj);
    return "Movie Added!";
};

const updateMovie = async (id, obj) => {
    await moviesDAL.updateMovie(id, obj);
    return "Movie Updated!";
};

const deleteMovie = async id => {
    await moviesDAL.deleteMovie(id);
    return "Movie Deleted!";
};

module.exports(getAllmovies, addMovie, updateMovie, deleteMovie);
