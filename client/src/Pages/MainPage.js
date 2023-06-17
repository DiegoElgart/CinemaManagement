import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../slices/users/usersSlice";

const MainPage = () => {
    const dispatch = useDispatch();

    // const user = useSelector(selectUser);
    // console.log(user);
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
            <h1>Main Page</h1>

            <div className='button-container'>
                <button onClick={handleMoviesClick}>Movies</button>
                <button onClick={handleSubscriptionsClick}>
                    Subscriptions
                </button>

                <button onClick={handleUsersManagementClick}>
                    Users Management
                </button>

                <button onClick={handleLogoutClick}>Logout</button>
            </div>
            <Outlet />
        </div>
    );
};

export default MainPage;
