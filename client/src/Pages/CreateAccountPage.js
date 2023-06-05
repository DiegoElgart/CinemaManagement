import { useSelector, useDispatch } from "react-redux";
import { getAllUsers, fetchAllUsers } from "../slices/users/usersSlice";
import { useEffect } from "react";

const CreateAccountPage = () => {
    const dispatch = useDispatch();
    const users = useSelector(getAllUsers);
    useEffect(() => {
        dispatch(fetchAllUsers());
    }, []);
    console.log(users);
    return (
        <div className='container'>
            <h1>Create an Account</h1>
            <form>
                <label>Username: </label>
                <input type='text' name='username'></input>
                <br />
                <br />
                <label>Password: </label>
                <input type='text' name='username'></input>
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
