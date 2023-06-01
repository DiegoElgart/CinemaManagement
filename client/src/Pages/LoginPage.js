import { useState } from "react";
import { useDispatch } from "react-redux";

import { loginUser } from "../slices/users/usersSlice";

const LoginPage = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({ username: "", password: "" });

    const { username, password } = formData;

    const handleChange = e => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onLogin = e => {
        e.preventDefault(); // Prevent the default form submission behavior
        try {
            dispatch(
                loginUser({
                    username: formData.username,
                    password: formData.password,
                })
            );
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <h1>Login </h1>
            <form onSubmit={onLogin}>
                {" "}
                {/* Attach onSubmit to the form element */}
                <label>User Name: </label>
                <input
                    type='text'
                    name='username'
                    value={username}
                    placeholder='Enter your username...'
                    onChange={handleChange}
                />
                <br />
                <br />
                <label>Password: </label>
                <input
                    type='password'
                    name='password'
                    value={password}
                    placeholder='Enter your password...'
                    onChange={handleChange}
                />
                <br />
                <br />
                <input type='submit' value='Login' />{" "}
                {/* Move onSubmit to the form element */}
            </form>
            <p>New User ? :</p>
            <a href='/'>Create Account</a>
        </div>
    );
};

export default LoginPage;
