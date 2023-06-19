import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    addNewMovie,
    fetchMovies,
    getMoviesStatus,
} from "../slices/movies/moviesSlice";
import { useNavigate } from "react-router-dom";

const AddMoviePage = () => {
    const dispatch = useDispatch();
    const addMovieStatus = useSelector(getMoviesStatus);
    const navigate = useNavigate();

    const [movieToAdd, setMovieToAdd] = useState({
        name: "",
        genres: [],
        image: "",
        premiered: "",
    });
    const [words, setWords] = useState([]);
    const [inputValue, setInputValue] = useState("");

    const handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        setMovieToAdd(prevState => ({ ...prevState, [name]: value }));
    };
    const handleGenresChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        setInputValue(value);
    };

    const handleSubmit = async e => {
        e.preventDefault();

        let separatedWords = [];

        if (inputValue.includes(",")) {
            separatedWords = inputValue.split(",");
        } else {
            separatedWords = inputValue.split(" ");
        }

        setWords(prevWords => [...prevWords, ...separatedWords]);
        setInputValue("");

        const dateString = movieToAdd.premiered;
        const dateTime = new Date(dateString);
        const modifiedDateString = dateTime.toISOString();

        const newMovie = {
            name: movieToAdd.name,
            genres: separatedWords,
            image: movieToAdd.image,
            premiered: modifiedDateString,
        };

        await dispatch(addNewMovie(newMovie));
        alert("Movie Created");
        navigate("/movies/allmovies");
    };

    return (
        <div className='container'>
            <form className='form-container' onSubmit={handleSubmit}>
                <label>Movie Name:</label>
                <input
                    type='text'
                    id='name'
                    name='name'
                    onChange={handleChange}
                />
                <label>Genres:</label>
                <input
                    type='text'
                    id='genres'
                    name='genres'
                    onChange={handleGenresChange}
                />

                <label>Image URL:</label>
                <input
                    type='text'
                    id='image'
                    name='image'
                    onChange={handleChange}
                />
                <input
                    type='date'
                    id='premiered'
                    name='premiered'
                    onChange={handleChange}
                />
                <div className='button-container'>
                    <button type='submit'>Save</button>
                    <button
                        type='button'
                        onClick={() => navigate("/movies/allmovies")}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddMoviePage;
