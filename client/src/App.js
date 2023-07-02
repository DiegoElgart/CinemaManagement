import "./app.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import ManageUsersPage from "./Pages/ManageUsersPage";
import UsersPage from "./Pages/UsersPage";
import CreateAccountPage from "./Pages/CreateAccountPage";
import MainPage from "./Pages/MainPage";
import EditUserPage from "./Pages/EditUserPage";
import MoviesPage from "./Pages/MoviesPage";
import AddUserPage from "./Pages/AddUserPage";
import AddMoviePage from "./Pages/AddMoviePage";
import ManageMoviesPage from "./Pages/ManageMoviesPage";
import EditMoviePage from "./Pages/EditMoviePage";
import SubscriptionsPage from "./Pages/SubscriptionsPage";
import MembersPage from "./Pages/MembersPage";
import EditMemberPage from "./Pages/EditMemberPage";
import AddMemberPage from "./Pages/AddMemberPage";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserName, getUserSessionTime, getUserPermissions, getIsAdmin, logout } from "./slices/users/authSlice";

function App() {
	const userNameDb = useSelector(getUserName);
	const sessionTimeOutDb = useSelector(getUserSessionTime);
	const permissionsDb = useSelector(getUserPermissions);
	const isAdmin = useSelector(getIsAdmin);
	const navigate = useNavigate();
	const dispatch = useDispatch();
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
	const [userName, setUserName] = useState("");
	const [sessionTimeOut, setSessionTimeOut] = useState(0);

	useEffect(() => {
		setUserName(userNameDb);
		setSessionTimeOut(sessionTimeOutDb);
		setPermissions(permissionsDb);
	}, [userNameDb, sessionTimeOutDb, permissionsDb]);

	useEffect(() => {
		const timeInMilliseconds = sessionTimeOut * 60 * 1000;
		const timeoutId = setTimeout(() => {
			dispatch(logout());
			navigate("/");
		}, timeInMilliseconds);
		return () => {
			clearTimeout(timeoutId);
		};
	}, [dispatch, sessionTimeOut]);

	return (
		<main className='container'>
			{userName ? (
				<div>
					<h4>Hi, {userName}</h4>
				</div>
			) : null}
			<Routes>
				<Route path='/' element={<LoginPage />} />
				<Route path='/register' element={<CreateAccountPage />} />
				<Route path='/main' element={<MainPage permissions={permissions} />} />
				{isAdmin ? (
					<Route path='/manage-users' element={<ManageUsersPage />}>
						<Route path='/manage-users/users' element={<UsersPage />} />
						<Route path='/manage-users/edit-user/:id' element={<EditUserPage />} />
						<Route path='/manage-users/addUser' element={<AddUserPage />} />
					</Route>
				) : null}
				<Route path='/movies' element={<ManageMoviesPage moviePermissions={permissions} />}>
					<Route path='/movies/allmovies' element={<MoviesPage />} />
					<Route path='/movies/addMovie' element={<AddMoviePage />} />
					<Route path='/movies/edit/:id' element={<EditMoviePage />} />
				</Route>
				<Route path='/subscriptions' element={<SubscriptionsPage />}>
					<Route path='/subscriptions/members' element={<MembersPage />} />
					<Route path='/subscriptions/addMember' element={<AddMemberPage />} />
					<Route path='/subscriptions/members/:id' element={<EditMemberPage />} />
				</Route>
			</Routes>
		</main>
	);
}

export default App;
