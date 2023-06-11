import { useSelector, useDispatch } from "react-redux";
import { getAllUsers, fetchAllUsers } from "../slices/users/usersSlice";
import { useEffect, useState } from "react";
import { addUser } from "../slices/users/usersSlice";
import { useNavigate } from "react-router-dom";

const CreateAccountPage = () => {
    const navigate = useNavigate();
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

    const handleSubmit = async e => {
        e.preventDefault();
        const result = await dispatch(addUser(formData));
        if (result.meta.requestStatus === "rejected") {
            alert("Need to set up password");
        } else {
            navigate("/");
        }
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
