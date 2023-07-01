import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../slices/users/usersSlice";

const MainMenu = ({ permissions }) => {
	const dispatch = useDispatch();

	const navigate = useNavigate();

	const handleMoviesClick = () => {
		navigate("/movies");
	};

	const handleSubscriptionsClick = () => {
		navigate("/subscriptions");
	};

	const handleUsersManagementClick = () => {
		navigate("/manage-users");
	};

	const handleLogoutClick = async () => {
		await dispatch(logout());
		navigate("/");
	};

	return (
		<div className='main-page'>
			<div className='button-container'>
				<button onClick={handleMoviesClick}>Movies</button>
				<button onClick={handleSubscriptionsClick}>Subscriptions</button>
				<button onClick={handleUsersManagementClick}>Users Management</button>
				<button onClick={handleLogoutClick}>Logout</button>
			</div>
			<Outlet />
		</div>
	);
};

export default MainMenu;
