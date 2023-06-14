import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
    fetchUserById,
    getUserToEdit,
    updateUser,
} from "../slices/users/usersSlice";
import { useParams } from "react-router-dom";

const EditUserPage = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const user = useSelector(getUserToEdit);

    const [userToEdit, setUserToEdit] = useState({
        fname: "",
        lname: "",
        createdDate: "",
        username: "",
        sessionTimeOut: "",
        permissions: [],
    });

    // const [userToEdit, setUserToEdit] = useState(null);

    useEffect(() => {
        dispatch(fetchUserById(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (user) {
            setUserToEdit(user);
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
        setUserToEdit(prevState => {
            const updatedPermissions = checked
                ? [...prevState.permissions, name]
                : prevState.permissions.filter(
                      permission => permission !== name
                  );

            return {
                ...prevState,
                permissions: updatedPermissions,
            };
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        userToEdit._id = id;
        console.log(userToEdit);
        dispatch(updateUser(userToEdit));
    };

    const timestamp = userToEdit.createdDate;
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

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
                            defaultValue={formattedDate}
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
                    {userToEdit.permissions ? (
                        <div>
                            <label>Permissions:</label>
                            <div className='container'>
                                <label>
                                    View Subscriptions:{" "}
                                    <input
                                        type='checkbox'
                                        name='View Subscriptions'
                                        onChange={handleCheckboxChange}
                                    />
                                </label>
                                <label>
                                    Create Subscriptions:{" "}
                                    <input
                                        type='checkbox'
                                        name='Create Subscriptions'
                                        onChange={handleCheckboxChange}
                                    />
                                </label>
                                <label>
                                    Delete Subscriptions:{" "}
                                    <input
                                        type='checkbox'
                                        name='Delete Subscriptions'
                                    />
                                </label>
                                <label>
                                    View Movies:{" "}
                                    <input type='checkbox' name='View Movies' />
                                </label>
                                <label>
                                    Create Movies:{" "}
                                    <input
                                        type='checkbox'
                                        name='Create Movies'
                                    />
                                </label>
                                <label>
                                    Delete Movies:{" "}
                                    <input
                                        type='checkbox'
                                        name='Delete Movies'
                                    />
                                </label>
                            </div>
                        </div>
                    ) : null}
                    <div className='button-container'>
                        <button className='submit'>Update</button>
                    </div>
                </form>
            ) : null}
        </div>
    );
};

export default EditUserPage;
