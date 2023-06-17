import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMovies, selectAllMovies } from "../slices/movies/moviesSlice";
const MoviesPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const movies = useSelector(selectAllMovies);

    useEffect(() => {
        dispatch(fetchMovies());
    }, []);
    return (
        <div className='movies-container'>
            {movies.map(movie => (
                <div key={movie._id} className='movie-item'>
                    <h2 className='movie-name'>
                        {movie.name}, {movie.premiered}
                    </h2>
                    <ul>
                        {movie.genres.map((genre, genreIndex) => (
                            <li key={genreIndex}>{genre}</li>
                        ))}
                    </ul>
                    <img
                        src={movie.image}
                        alt={movie.name}
                        className='movie-image'
                    />
                    <div className='movie-buttons'>
                        <button className='movie-button'>Edit</button>
                        <button className='movie-button'>Delete</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MoviesPage;
