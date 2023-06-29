import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllSubscriptions, fetchSubscriptionByMemberId, selectAllSubscriptions, selectSubscription } from "../slices/subscriptions/subscriptionsSlice";
import MoviesSubsComp from "./MoviesSubsComp";
import { fetchMovieById, getMovieToEdit, selectAllMovies } from "../slices/movies/moviesSlice";

const SubscriptionsComponent = ({ subscription }) => {
	const dispatch = useDispatch();
	const moviesFromMovies = useSelector(selectAllMovies);
	const [moviesFromSubscription, setMoviesFromSubscription] = useState([]);
	const [moviesToShow, setMoviesToShow] = useState([]);
	useEffect(() => {
		if (subscription !== null) {
			const { movies } = subscription;
			setMoviesFromSubscription(movies);
		}
	}, [subscription]);

	useEffect(() => {
		moviesFromSubscription.map(movie => dispatch(fetchMovieById(movie.movieId)));
	}, [moviesFromSubscription, dispatch]);

	useEffect(() => {
		const fullMovieData = moviesFromMovies.map(movieDb => {
			const mergedMovies = moviesFromSubscription.find(movie => movie.movieId === movieDb._id);
			const fullMovie = {
				_id: movieDb._id,
				name: movieDb.name,
				memberId: mergedMovies ? mergedMovies.memberId : null,
				date: mergedMovies ? mergedMovies.date : null,
			};
			return fullMovie;
		});
		setMoviesToShow(fullMovieData);
	}, [moviesFromMovies]);
	return (
		<div>
			<h3>Movies watched</h3>
			{/* {console.log(moviesToShow)} */}
			{/* {moviesToShow ? moviesToShow.map(movie => <p>{movie.name}</p>) : null} */}
		</div>
	);
};

export default SubscriptionsComponent;
