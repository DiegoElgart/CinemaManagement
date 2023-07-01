import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchSubscriptionByMovieId, selectSubscription } from "../slices/subscriptions/subscriptionsSlice";

const SubscribedToMovieComponent = ({ movieId }) => {
	const dispatch = useDispatch();
	const subscriptions = useSelector(selectSubscription);
	const [subsToShow, setSubsToShow] = useState([]);

	useEffect(() => {
		dispatch(fetchSubscriptionByMovieId(movieId));
	}, [dispatch, movieId]);

	useEffect(() => {
		if (subscriptions.length > 0) {
			subscriptions.map(subs => {
				if (subs.movieId === movieId) {
					setSubsToShow(subscriptions);
				}
				return "Added";
			});
		}
	}, [subscriptions, movieId]);

	const formattedDate = watchedDate => {
		const date = new Date(watchedDate);
		const formattedDate = date.toISOString().slice(0, 10);
		return formattedDate;
	};
	return (
		<div>
			{subsToShow.length > 0 ? (
				<div>
					<h4>Subscriptions watched</h4>
					{subsToShow.map((subs, index) => (
						<ul key={index}>
							<li>
								<a href={`/subscriptions/members/${subs.memberId}`}> {subs.name}</a>
								<p>{formattedDate(subs.date)}</p>
							</li>
						</ul>
					))}
				</div>
			) : null}
		</div>
	);
};

export default SubscribedToMovieComponent;
