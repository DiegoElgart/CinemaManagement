import "./app.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import MainMenu from "./Pages/MainMenu";
import ManageUsersPage from "./Pages/ManageUsersPage";
import UsersPage from "./Pages/UsersPage";
import CreateAccountPage from "./Pages/CreateAccountPage";
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
import { useSelector } from "react-redux";
import { getUserName, getUserSessionTime, getUserPermissions } from "./slices/users/authSlice";

function App() {
	const userNameDb = useSelector(getUserName);
	const sessionTimeOutDb = useSelector(getUserSessionTime);
	const permissionsDb = useSelector(getUserPermissions);

	const [permissions, setPermissions] = useState([]);
	const [userName, setUserName] = useState("");
	const [sessionTimeOut, setSessionTimeOut] = useState(0);

	useEffect(() => {
		setUserName(userNameDb);
		setSessionTimeOut(sessionTimeOutDb);
		setPermissions(permissionsDb);
	}, [userNameDb, sessionTimeOutDb, permissionsDb]);

	return (
		<main className='container'>
			{userName ? (
				<div>
					<h4>Hi, {userName}</h4>
				</div>
			) : null}

			<Routes>
				<Route path='/' element={<HomePage permissions={permissions} />} />
				<Route path='/login' element={<LoginPage />} />
				<Route path='/register' element={<CreateAccountPage />} />

				<Route path='/manage-users' element={<ManageUsersPage />}>
					<Route path='/manage-users/users' element={<UsersPage />} />
					<Route path='/manage-users/edit-user/:id' element={<EditUserPage />} />
					<Route path='/manage-users/addUser' element={<AddUserPage />} />
				</Route>

				<Route path='/movies' element={<ManageMoviesPage />}>
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
