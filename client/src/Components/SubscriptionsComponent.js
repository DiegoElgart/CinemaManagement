import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSubscriptionById } from "../slices/subscriptions/subscriptionsSlice";

const SubscriptionsComponent = ({ movieId }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchSubscriptionById(movieId));
    }, []);

    return (
        <div>
            <h5>Subscriptions watched</h5>
            <p>This is movieId: {movieId}</p>
        </div>
    );
};

export default SubscriptionsComponent;
