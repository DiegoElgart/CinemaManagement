import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieById } from "../slices/movies/moviesSlice";

const MoviesSubsComp = ({ subscription }) => {
	const dispatch = useDispatch();
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		const { movies } = subscription;
		if (movies) {
			setMovies(movies);
		}
	}, [subscription]);

	const formattedDate = watchedDate => {
		const date = new Date(watchedDate);
		const formattedDate = date.toISOString().slice(0, 10);
		return formattedDate;
	};

	return (
		<div>
			{movies
				? movies.map(movie => {
						return (
							<ul key={movie._id} className='movie-item'>
								<li>
									<a href={`/movies/edit/${movie.movieId._id}`} className='movie-name'>
										{movie.movieId ? movie.movieId.name : null}
									</a>
									, {formattedDate(movie.date)}
								</li>
							</ul>
						);
				  })
				: null}
		</div>
	);
};

export default MoviesSubsComp;
