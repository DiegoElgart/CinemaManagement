import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slices/users/usersSlice";
import { getIsAdmin } from "../slices/users/authSlice";

const MainPage = ({ permissions }) => {
	const isAdmin = useSelector(getIsAdmin);
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
				{permissions[0].viewMovies ? <button onClick={handleMoviesClick}>Movies</button> : null}

				<button onClick={handleSubscriptionsClick}>Subscriptions</button>

				{isAdmin ? <button onClick={handleUsersManagementClick}>Users Management</button> : null}

				<button onClick={handleLogoutClick}>Logout</button>
			</div>
			<Outlet />
		</div>
	);
};

export default MainPage;
