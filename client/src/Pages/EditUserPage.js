import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchUserById } from "../slices/users/usersSlice";
import { useParams } from "react-router-dom";

const EditUserPage = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [userToEdit, setUserToEdit] = useState({
        fname: "",
        lname: "",
        createdDate: "",
        username: "",
        sessionTimeOut: "",
        permissions: ["View Subscriptions", "Create Subscriptions"],
    });

    useEffect(() => {
        const getUserById = async () => {
            const data = await dispatch(fetchUserById(id));
            setUserToEdit(data.payload);
        };
        getUserById();
    }, []);

    const handleChange = e => {
        setUserToEdit(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
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
            <form onSubmit={handleSubmit} className='form-container'>
                <div className='form-row'>
                    <label>First Name:</label>
                    <input
                        name='fname'
                        type='text'
                        value={userToEdit.fname}
                        onChange={handleChange}
                    />
                </div>
                <div className='form-row'>
                    <label>Last Name:</label>
                    <input
                        name='lname'
                        type='text'
                        value={userToEdit.lname}
                        onChange={handleChange}
                    />
                </div>
                <div className='form-row'>
                    <label>Created Date:</label>
                    <input
                        name='createdDate'
                        type='date'
                        disabled
                        value={formattedDate}
                    />
                </div>
                <div className='form-row'>
                    <label>Username:</label>
                    <input
                        name='username'
                        type='text'
                        value={userToEdit.username}
                        onChange={handleChange}
                    />
                </div>
                <div className='form-row'>
                    <label>Session Time Out:</label>
                    <input
                        name='sessionTimeOut'
                        type='text'
                        value={userToEdit.sessionTimeOut}
                        onChange={handleChange}
                    />
                </div>
                {userToEdit.permissions
                    ? userToEdit.permissions.map((per, index) => (
                          <div className='form-row' key={index}>
                              <input type='checkbox' value={per} />
                              <label>{per}</label>
                          </div>
                      ))
                    : null}
                <div className='button-container'>
                    <button className='button'>Update</button>
                </div>
            </form>
        </div>
    );
};

export default EditUserPage;
