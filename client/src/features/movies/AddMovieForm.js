import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addNewMovie } from "./moviesSlice";

const AddMovieForm = () => {
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [genres, setGenres] = useState([]);
    const [image, setImage] = useState("");
    const [premiered, setPremiered] = useState("");

    const genresClasses = ["Drama", "Comedy", "Horror", "Action"];
    const genresOptions = genresClasses.map((genresOption, index) => (
        <option key={index} value={genresOption}>
            {genresOption}
        </option>
    ));

    const onNameChanged = e => setName(e.target.value);
    const onGenresChanged = e => setGenres(e.target.value);
    const onImageChanged = e => setImage(e.target.value);
    const onPremieredChange = e => setPremiered(e.target.value);

    const onSaveNewMovie = () => {
        try {
            dispatch(
                addNewMovie({
                    name: name,
                    genres: [genres],
                    image: image,
                    premiered: premiered,
                })
            );
            setName("");
            setGenres("");
            setImage("");
            setPremiered("");
        } catch (err) {
            console.log("Failed to save new movie", err);
        }
    };

    return (
        <section>
            <h2>Add a New Movie</h2>
            <form>
                <label htmlFor='movieName'>Movie Name:</label>
                <input
                    type='text'
                    id='postTitle'
                    name='postTitle'
                    value={name}
                    onChange={onNameChanged}
                />
                <label htmlFor='postAuthor'>Genres:</label>
                <select id='movieGenres' onChange={onGenresChanged}>
                    <option value=''></option>
                    {genresOptions}
                </select>
                <label htmlFor='postContent'>Image URL:</label>
                <input
                    type='text'
                    id='movieImage'
                    name='movieImage'
                    onChange={onImageChanged}
                />
                <input
                    type='date'
                    id='moviePremiered'
                    name='moviePremiered'
                    onChange={onPremieredChange}
                />
                <button type='button' onClick={onSaveNewMovie}>
                    Save New Movie
                </button>
            </form>
        </section>
    );
};

export default AddMovieForm;
