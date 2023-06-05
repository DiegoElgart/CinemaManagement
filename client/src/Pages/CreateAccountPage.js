import { useSelector, useDispatch } from "react-redux";
import { getAllUsers, fetchAllUsers } from "../slices/users/usersSlice";
import { useEffect, useState } from "react";
import { addUser } from "../slices/users/usersSlice";

const CreateAccountPage = () => {
    const dispatch = useDispatch();
    const users = useSelector(getAllUsers);
    const [formData, setFormData] = useState("");

    const { username, password } = formData;

    const handleChange = e => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(addUser(formData));
    };

    useEffect(() => {
        dispatch(fetchAllUsers());
    }, []);

    return (
        <div className='container'>
            <h1>Create an Account</h1>
            <form onSubmit={handleSubmit}>
                <label>Username: </label>
                <input
                    type='text'
                    name='username'
                    onChange={handleChange}></input>
                <br />
                <br />
                <label>Password: </label>
                <input
                    type='password'
                    name='password'
                    onChange={handleChange}></input>
                <br />
                <br />
                <span className='button-container'>
                    <button className='button'>Create</button>
                </span>
            </form>
        </div>
    );
};

export default CreateAccountPage;
