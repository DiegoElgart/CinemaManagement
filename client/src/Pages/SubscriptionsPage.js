import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchAllSubscriptions,
    selectAllSubscriptions,
} from "../slices/subscriptions/subscriptionsSlice";

const SubscriptionsPage = () => {
    const dispatch = useDispatch();
    const allSubscriptions = useSelector(selectAllSubscriptions);

    useEffect(() => {
        dispatch(fetchAllSubscriptions());
    }, [dispatch]);

    return <div>SubscriptionsPage</div>;
};

export default SubscriptionsPage;
