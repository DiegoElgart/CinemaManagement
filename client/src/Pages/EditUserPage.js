import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
    fetchUserById,
    getUserToEdit,
    updateUser,
} from "../slices/users/usersSlice";
import { useNavigate, useParams } from "react-router-dom";

const EditUserPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const user = useSelector(getUserToEdit);

    const [userToEdit, setUserToEdit] = useState({
        _id: id,
        fname: "",
        lname: "",
        createdDate: "",
        username: "",
        sessionTimeOut: "",
        permissions: [],
    });
    const [userPermsissions, setUserPermissions] = useState([
        {
            viewSubscriptions: false,
            createSubscriptions: false,
            deleteSubscriptions: false,
            viewMovies: false,
            createMovies: false,
            deleteMovies: false,
        },
    ]);

    useEffect(() => {
        dispatch(fetchUserById(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (user && user.permissions) {
            setUserToEdit(user);
            setUserPermissions(user.permissions);
        }
    }, [user]);

    const handleChange = e => {
        setUserToEdit(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleCheckboxChange = e => {
        const { name, checked } = e.target;
        setUserPermissions(prevState =>
            prevState.map(permission => {
                return {
                    ...permission,
                    [name]: checked,
                };
            })
        );
    };

    const handleSubmit = e => {
        e.preventDefault();

        const userToDispatch = {
            _id: id,
            ...userToEdit,
            permissions: userPermsissions,
        };
        dispatch(updateUser(userToDispatch));
        alert("User Updated");
        navigate("/manage-users/users");
    };

    return (
        <div className='container'>
            <h1>Edit User:</h1>
            {userToEdit ? (
                <form onSubmit={handleSubmit} className='form-container'>
                    <div className='form-row'>
                        <label>First Name:</label>
                        <input
                            name='fname'
                            type='text'
                            defaultValue={userToEdit.fname}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='form-row'>
                        <label>Last Name:</label>
                        <input
                            name='lname'
                            type='text'
                            defaultValue={userToEdit.lname}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='form-row'>
                        <label>Created Date:</label>
                        <input
                            name='createdDate'
                            type='date'
                            disabled
                            defaultValue={userToEdit.createdDate}
                        />
                    </div>
                    <div className='form-row'>
                        <label>Username:</label>
                        <input
                            name='username'
                            type='text'
                            defaultValue={userToEdit.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='form-row'>
                        <label>Session Time Out:</label>
                        <input
                            name='sessionTimeOut'
                            type='text'
                            defaultValue={userToEdit.sessionTimeOut}
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
                                    onChange={handleCheckboxChange}
                                    checked={
                                        userPermsissions[0].viewSubscriptions
                                    }
                                />
                            </label>
                            <label>
                                Create Subscriptions:{" "}
                                <input
                                    type='checkbox'
                                    name='createSubscriptions'
                                    onChange={handleCheckboxChange}
                                    checked={
                                        userPermsissions[0].createSubscriptions
                                    }
                                />
                            </label>
                            <label>
                                Delete Subscriptions:{" "}
                                <input
                                    type='checkbox'
                                    name='deleteSubscriptions'
                                    onChange={handleCheckboxChange}
                                    checked={
                                        userPermsissions[0].deleteSubscriptions
                                    }
                                />
                            </label>
                            <label>
                                View Movies:{" "}
                                <input
                                    type='checkbox'
                                    name='viewMovies'
                                    onChange={handleCheckboxChange}
                                    checked={userPermsissions[0].viewMovies}
                                />
                            </label>
                            <label>
                                Create Movies:{" "}
                                <input
                                    type='checkbox'
                                    name='createMovies'
                                    onChange={handleCheckboxChange}
                                    checked={userPermsissions[0].createMovies}
                                />
                            </label>
                            <label>
                                Delete Movies:{" "}
                                <input
                                    type='checkbox'
                                    name='deleteMovies'
                                    onChange={handleCheckboxChange}
                                    checked={userPermsissions[0].deleteMovies}
                                />
                            </label>
                        </div>
                    </div>

                    <div className='button-container'>
                        <button className='submit'>Update</button>
                        <input
                            type='button'
                            name='Cancel'
                            value='Cancel'
                            onClick={e => navigate("/manage-users/users")}
                        />
                    </div>
                </form>
            ) : null}
        </div>
    );
};

export default EditUserPage;
