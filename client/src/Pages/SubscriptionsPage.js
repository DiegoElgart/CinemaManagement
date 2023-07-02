import { Outlet, useNavigate } from "react-router-dom";
import MenuComponent from "../Components/MenuComponent";
import { useSelector } from "react-redux";
import { getIsAdmin } from "../slices/users/authSlice";

const SubscriptionsPage = () => {
	const navigate = useNavigate();
	const isAdmin = useSelector(getIsAdmin);
	return (
		<div className='container'>
			<MenuComponent />
			<h1>Subscriptions</h1>
			<span className='button-container'>
				<button onClick={() => navigate("/subscriptions/members")}>All Members</button>
				{isAdmin ? <button onClick={() => navigate("/subscriptions/addMember")}>Add Member</button> : null}
			</span>
			<Outlet />
		</div>
	);
};

export default SubscriptionsPage;
