import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchMovieById, getMovieToEdit, updateMovie } from "../slices/movies/moviesSlice";

const EditMoviePage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { id } = useParams();
	const movie = useSelector(getMovieToEdit);
	const [inputValue, setInputValue] = useState("");
	const [movieToEdit, setMovieToEdit] = useState({
		name: "",
		genres: [],
		image: "",
		premiered: "",
	});
	// const [words, setWords] = useState([]);

	useEffect(() => {
		dispatch(fetchMovieById(id));
	}, [dispatch, id]);

	useEffect(() => {
		if (movie) {
			setMovieToEdit(movie);
		}
	}, [movie]);

	const handleChange = e => {
		e.preventDefault();
		const { name, value } = e.target;
		setMovieToEdit(prevState => ({ ...prevState, [name]: value }));
	};
	const handleGenresChange = e => {
		e.preventDefault();
		const { value } = e.target;
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
		setMovieToEdit(prevState => ({
			...prevState,
			genres: [...separatedWords],
		}));

		setInputValue("");

		const updatedMovie = {
			_id: movieToEdit._id,
			name: movieToEdit.name,
			genres: separatedWords,
			image: movieToEdit.image,
			premiered: movieToEdit.premiered,
		};
		dispatch(updateMovie(updatedMovie));
		alert("Movie Updated");
		navigate("/movies/allmovies");
	};
	return (
		<div className='container'>
			<h1>Edit Movie:</h1>
			{movieToEdit ? (
				<form className='form-container' onSubmit={handleSubmit}>
					<label>Movie Name:</label>
					<input type='text' id='name' name='name' defaultValue={movieToEdit.name} onChange={handleChange} />
					<label>Genres:</label>
					<input type='text' id='genres' name='genres' defaultValue={movieToEdit.genres ? movieToEdit.genres.map(gener => gener) : null} onChange={handleGenresChange} />

					<label>Image URL:</label>
					<input type='text' id='image' name='image' defaultValue={movieToEdit.image} onChange={handleChange} />
					<input type='date' id='premiered' name='premiered' defaultValue={movieToEdit.premiered} onChange={handleChange} />
					<div className='button-container'>
						<button type='submit'>Save</button>
						<button type='button' onClick={() => navigate(-1)}>
							Cancel
						</button>
					</div>
				</form>
			) : null}
		</div>
	);
};

export default EditMoviePage;
