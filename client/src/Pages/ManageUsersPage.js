import React from "react";
import { useNavigate } from "react-router-dom";

const ManageUsersPage = () => {
    const navigate = useNavigate();

    const handleUsersClick = () => {
        navigate("/users");
    };
    return (
        <div className='main-page'>
            <h1>Main Page</h1>
            <div className='button-container'>
                <button onClick={handleUsersClick}>All Users</button>
                <button>Add User</button>
            </div>
        </div>
    );
};

export default ManageUsersPage;
