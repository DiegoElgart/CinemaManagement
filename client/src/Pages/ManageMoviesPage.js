import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const ManageMoviesPage = () => {
    const navigate = useNavigate();

    const handleUsersClick = path => {
        navigate(path);
    };
    return (
        <div className='main-page'>
            <h1>Manage Movies</h1>
            <div className='button-container'>
                <button
                    onClick={() => handleUsersClick("/manage-movies/movies")}>
                    All Movies
                </button>
                <button
                    onClick={() => handleUsersClick("/manage-movies/addMovie")}>
                    Add Movie
                </button>
            </div>
            <Outlet />
        </div>
    );
};

export default ManageMoviesPage;
