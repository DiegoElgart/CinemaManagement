import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
    getUserStatus,
    loginUser,
    selectUser,
} from "../slices/users/usersSlice";

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ username: "", password: "" });
    const { username, password } = formData;

    const userStatus = useSelector(getUserStatus);
    const user = useSelector(selectUser);

    useEffect(() => {
        if (userStatus === "succeeded") {
            localStorage.setItem("accessToken", user.accessToken);
            navigate("/main");
        } else if (userStatus === "failed") {
            navigate("/");
            alert("wrong password or username");
        }
    }, [userStatus, user, navigate]);

    const handleChange = e => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onLogin = e => {
        e.preventDefault();
        try {
            dispatch(
                loginUser({
                    username: formData.username,
                    password: formData.password,
                })
            );

            // navigate("/main");
        } catch (err) {
            console.log(err);
        }
        setFormData({ username: "", password: "" });
    };

    return (
        <div>
            <h1>Login </h1>
            <form onSubmit={onLogin}>
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
                <input type='submit' value='Login' />
            </form>

            <br />
            <button onClick={() => navigate("/register")}>
                Create New Account
            </button>
        </div>
    );
};

export default LoginPage;
