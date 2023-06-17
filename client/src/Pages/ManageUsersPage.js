import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const ManageUsersPage = () => {
    const navigate = useNavigate();

    const handleUsersClick = path => {
        navigate(path);
    };
    return (
        <div className='main-page'>
            <h1>Manage Users</h1>
            <div className='button-container'>
                <button onClick={e => handleUsersClick("/manage-users/users")}>
                    All Users
                </button>
                <button
                    onClick={e => handleUsersClick("/manage-users/AddUser")}>
                    Add User
                </button>
            </div>
            <Outlet />
        </div>
    );
};

export default ManageUsersPage;
