import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import MenuComponent from "../Components/MenuComponent";

const ManageMoviesPage = ({ moviePermissions }) => {
	const navigate = useNavigate();

	const handleUsersClick = path => {
		navigate(path);
	};
	return (
		<div className='main-page'>
			<MenuComponent />
			<h1>Manage Movies</h1>
			<div className='button-container'>
				<button onClick={() => handleUsersClick("/movies/allmovies")}>All Movies</button>
				{moviePermissions[0].createMovies ? <button onClick={() => handleUsersClick("/movies/addMovie")}>Add Movie</button> : null}
			</div>
			<Outlet />
		</div>
	);
};

export default ManageMoviesPage;
