import { Outlet, useNavigate } from "react-router-dom";

const SubscriptionsPage = () => {
	const navigate = useNavigate();

	return (
		<div className='container'>
			<h1>Subscriptions</h1>
			<span className='button-container'>
				<button onClick={() => navigate("/subscriptions/members")}>All Members</button>
				<button onClick={() => navigate("/subscriptions/addMember")}>Add Member</button>
			</span>
			<Outlet />
		</div>
	);
};

export default SubscriptionsPage;
