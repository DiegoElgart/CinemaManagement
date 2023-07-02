import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserPermissions, getIsAdmin, logout } from "../slices/users/authSlice";
const MenuComponent = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const permissionsDb = useSelector(getUserPermissions);
	const isAdmin = useSelector(getIsAdmin);

	const [permissions, setPermissions] = useState([
		{
			viewSubscriptions: false,
			createSubscriptions: false,
			deleteSubscriptions: false,
			updateSubscriptions: false,
			viewMovies: false,
			createMovies: false,
			deleteMovies: false,
			updateMovies: false,
		},
	]);
	useEffect(() => {
		setPermissions(permissionsDb);
	}, [permissionsDb]);

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
		</div>
	);
};

export default MenuComponent;
