import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getIsAdmin } from "../slices/users/authSlice";

const SubscribedToMovieComponent = ({ subscriptions, movieId }) => {
	const [subsToShow, setSubsToShow] = useState([]);
	const isAdmin = useSelector(getIsAdmin);

	useEffect(() => {
		if (subscriptions.length >= 1) {
			setSubsToShow(subscriptions);
		}
	}, [subscriptions, movieId]);

	const formattedDate = movies => {
		const movie = movies.find(movie => movie.movieId === movieId);
		const date = new Date(movie.date);
		const formattedDate = date.toISOString().slice(0, 10);
		return formattedDate;
	};
	return (
		<div>
			{subsToShow.length > 0 ? (
				<div>
					<h4>Subscriptions watched</h4>
					{subsToShow.map(subs => {
						return (
							<ul key={subs._id}>
								<li>
									{isAdmin ? <a href={`/subscriptions/members/${subs.memberId._id}`}> {subs.memberId.name}</a> : <p>{subs.memberId.name}</p>}

									<p>{formattedDate(subs.movies)}</p>
								</li>
							</ul>
						);
					})}
				</div>
			) : null}
		</div>
	);
};

export default SubscribedToMovieComponent;
