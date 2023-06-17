import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
    addUser,
    fetchUserById,
    getUserToEdit,
    updateUser,
} from "../slices/users/usersSlice";
import { useNavigate, useParams } from "react-router-dom";

const AddUserPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [userToAdd, setUserToAdd] = useState({
        fname: "",
        lname: "",
        createdDate: "",
        username: "",
        sessionTimeOut: "",
        permissions: [
            {
                viewSubscriptions: false,
                createSubscriptions: false,
                deleteSubscriptions: false,
                viewMovies: false,
                createMovies: false,
                deleteMovies: false,
            },
        ],
    });

    const handleSubmit = async e => {
        e.preventDefault();
        await dispatch(addUser(userToAdd));
        navigate("/manage-users");
    };

    const handleChange = e => {
        const { name, value, type, checked } = e.target;

        if (type === "checkbox") {
            if (name === "createSubscriptions" && checked) {
                setUserToAdd(prevState => ({
                    ...prevState,
                    permissions: prevState.permissions.map(permission => ({
                        ...permission,
                        viewSubscriptions: true,
                        deleteSubscriptions: true,
                        [name]: checked,
                    })),
                }));
            } else if (name === "createMovies" && checked) {
                setUserToAdd(prevState => ({
                    ...prevState,
                    permissions: prevState.permissions.map(permission => ({
                        ...permission,
                        viewMovies: true,
                        deleteMovies: true,
                        [name]: checked,
                    })),
                }));
            } else {
                setUserToAdd(prevState => ({
                    ...prevState,
                    permissions: prevState.permissions.map(permission => ({
                        ...permission,
                        [name]: checked,
                    })),
                }));
            }
        } else {
            setUserToAdd(prevState => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    return (
        <div>
            <h1>Add User</h1>
            <form onSubmit={handleSubmit} className='form-container'>
                <div className='form-row'>
                    <label>First Name:</label>
                    <input name='fname' type='text' onChange={handleChange} />
                </div>
                <div className='form-row'>
                    <label>Last Name:</label>
                    <input name='lname' type='text' onChange={handleChange} />
                </div>

                <div className='form-row'>
                    <label>Username:</label>
                    <input
                        name='username'
                        type='text'
                        onChange={handleChange}
                    />
                </div>
                <div className='form-row'>
                    <label>Session Time Out:</label>
                    <input
                        name='sessionTimeOut'
                        type='text'
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Permissions:</label>

                    <div className='container'>
                        <label>
                            View Subscriptions:{" "}
                            <input
                                type='checkbox'
                                name='viewSubscriptions'
                                checked={
                                    userToAdd.permissions[0].viewSubscriptions
                                }
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Create Subscriptions:{" "}
                            <input
                                type='checkbox'
                                name='createSubscriptions'
                                checked={
                                    userToAdd.permissions[0].createSubscriptions
                                }
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Delete Subscriptions:{" "}
                            <input
                                type='checkbox'
                                name='deleteSubscriptions'
                                onChange={handleChange}
                                checked={
                                    userToAdd.permissions[0].deleteSubscriptions
                                }
                            />
                        </label>
                        <label>
                            View Movies:{" "}
                            <input
                                type='checkbox'
                                name='viewMovies'
                                onChange={handleChange}
                                checked={userToAdd.permissions[0].viewMovies}
                            />
                        </label>
                        <label>
                            Create Movies:{" "}
                            <input
                                type='checkbox'
                                name='createMovies'
                                onChange={handleChange}
                                checked={userToAdd.permissions[0].createMovies}
                            />
                        </label>
                        <label>
                            Delete Movies:{" "}
                            <input
                                type='checkbox'
                                name='deleteMovies'
                                onChange={handleChange}
                                checked={userToAdd.permissions[0].deleteMovies}
                            />
                        </label>
                    </div>
                </div>

                <div className='button-container'>
                    <button className='submit'>Save</button>
                    <input
                        type='button'
                        name='Cancel'
                        value='Cancel'
                        onClick={e => navigate("/manage-users")}
                    />
                </div>
            </form>
        </div>
    );
};

export default AddUserPage;
