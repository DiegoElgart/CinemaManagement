import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieById } from "../slices/movies/moviesSlice";

const MoviesSubsComp = ({ subscription }) => {
	const dispatch = useDispatch();
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const { movies } = subscription;
			const movieDataPromises = movies.map(movie => dispatch(fetchMovieById(movie.movieId)));
			const movieData = await Promise.all(movieDataPromises);
			//setMovies(movieData);
		};

		fetchData();
	}, [dispatch, subscription]);

	return (
		<div>
			{/* {movies.map(movie => (
				<div key={movie._id} className='movie-item'>
					<h4 className='movie-name'>{movie.name}</h4>
				</div>
			))} */}
		</div>
	);
};

export default MoviesSubsComp;
