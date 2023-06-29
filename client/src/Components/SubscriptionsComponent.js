import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSubscriptionByMemberId, selectSubscription } from "../slices/subscriptions/subscriptionsSlice";
import MoviesSubsComp from "./MoviesSubsComp";

const SubscriptionsComponent = ({ memberId }) => {
	const dispatch = useDispatch();
	const subscription = useSelector(selectSubscription);
	// useEffect(() => {
	// 	dispatch(fetchSubscriptionByMemberId(memberId));
	// }, [dispatch]);
	return (
		<div>
			<h5>Movies watched</h5>
			<p>This is memberId: {memberId}</p>
			{console.log(subscription)}
			{/* {subscription.memberId === memberId ? <MoviesSubsComp /> : null} */}
		</div>
	);
};

export default SubscriptionsComponent;
