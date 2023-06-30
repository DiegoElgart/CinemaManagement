import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addSubscription, fetchSubscriptionByMemberId, selectSubscriptionByMemberId } from "../slices/subscriptions/subscriptionsSlice";
import MoviesSubsComp from "./MoviesSubsComp";
import { fetchMovies, selectAllMovies } from "../slices/movies/moviesSlice";
import { redirect } from "react-router-dom";
const SubscriptionsComponent = ({ memberId }) => {
	const dispatch = useDispatch();
	const subscriptionDb = useSelector(selectSubscriptionByMemberId);
	const moviesDb = useSelector(selectAllMovies);

	const [subcription, setSubscription] = useState({});
	const [movies, setMovies] = useState([]);
	const [show, setShow] = useState(true);
	const [movieId, setMovieId] = useState("");
	const [date, setDate] = useState("");

	useEffect(() => {
		dispatch(fetchSubscriptionByMemberId(memberId));
	}, [dispatch, memberId]);

	useEffect(() => {
		if (subscriptionDb.memberId === memberId) {
			setSubscription(subscriptionDb);
		}
		if (moviesDb) {
			setMovies(moviesDb);
		}
	}, [subscriptionDb, moviesDb]);

	const handleChange = e => {
		const { name, value } = e.target;

		if (name === "movieId") {
			setMovieId(value);
		}
		if (name === "date") {
			setDate(value);
		}
	};

	const handleDispatch = async () => {
		const newSubscription = {
			memberId: memberId,

			movieId: movieId,
			date: date,
		};
		await dispatch(addSubscription(newSubscription));
		alert("Subscription Created");
		window.location.reload(false);
	};
	return (
		<div>
			<h3>Movies watched</h3>
			<button onClick={() => setShow(!show)}>Subscribe to new movie</button>
			<br />
			<br />
			<span style={show ? { display: "none" } : null}>
				<select onChange={handleChange} name='movieId'>
					{movies
						? movies.map(movie => (
								<option key={movie._id} value={movie._id}>
									{movie.name}
								</option>
						  ))
						: null}
				</select>
				<input type='date' name='date' onChange={handleChange} />
				<button onClick={handleDispatch}>Subscribe</button>
			</span>
			{subcription ? <MoviesSubsComp subscription={subcription} /> : null}
		</div>
	);
};

export default SubscriptionsComponent;
