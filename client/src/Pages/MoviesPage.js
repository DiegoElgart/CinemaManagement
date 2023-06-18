import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { fetchMovies, selectAllMovies } from "../slices/movies/moviesSlice";
import { all } from "axios";
const MoviesPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const allMovies = useSelector(selectAllMovies);

    const [find, setFind] = useState("");
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        dispatch(fetchMovies());
        // setMovies(allMovies);
    }, []);

    useEffect(() => {
        setMovies(allMovies);
    }, [allMovies]);

    const handleChange = e => {
        e.preventDefault();
        setFind(e.target.value);
    };
    const handleFind = e => {
        e.preventDefault();
        if (find !== "") {
            const filteredMovies = allMovies.filter(movie =>
                movie.name.toLowerCase().includes(find.toLowerCase())
            );
            setMovies(filteredMovies);
        } else {
            setMovies(allMovies);
        }
    };

    const handleAllMovies = e => {
        e.preventDefault();
        const input = document.getElementById("find");
        input.value = "";
        setFind("");

        setMovies(allMovies);
    };

    return (
        <div className='movies-container'>
            <div className='button-container'>
                <button onClick={handleAllMovies}>Show All Movies</button>

                <label>Find Movie: </label>
                <input id='find' onChange={handleChange} />
                <button onClick={handleFind}>Find</button>
            </div>
            {movies.map(movie => {
                const dateString = movie.premiered;
                const year = dateString.substring(0, 4);
                return (
                    <div key={movie._id} className='movie-item'>
                        <h2 className='movie-name'>
                            {movie.name}, {year}
                        </h2>
                        <h4>Genres: </h4>
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
                            <button
                                className='movie-button'
                                onClick={() =>
                                    navigate(`/movies/edit/${movie._id}`)
                                }>
                                Edit
                            </button>
                            <button className='movie-button'>Delete</button>
                        </div>
                    </div>
                );
            })}
            <Outlet />
        </div>
    );
};

export default MoviesPage;
