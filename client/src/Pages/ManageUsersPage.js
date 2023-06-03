import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const ManageUsersPage = () => {
    const navigate = useNavigate();

    const handleUsersClick = () => {
        navigate("/users");
    };
    return (
        <div className='main-page'>
            <h1>Manage Users</h1>
            <div className='button-container'>
                <button onClick={handleUsersClick}>All Users</button>
                <button>Add User</button>
            </div>
            <Outlet />
        </div>
    );
};

export default ManageUsersPage;
