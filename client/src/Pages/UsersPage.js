import { useSelector, useDispatch } from "react-redux";
import { fetchAllUsers, getAllUsers } from "../slices/users/usersSlice";
import { useEffect } from "react";

const UsersPage = () => {
    const dispatch = useDispatch();
    const users = useSelector(getAllUsers);

    useEffect(() => {
        dispatch(fetchAllUsers());
    }, []);

    console.log(users);
    return (
        <div className='main-page'>
            <h1>Users</h1>
            {users.map(user => {
                return (
                    <div key={user._id}>
                        <h3>Username: {user.username}</h3>
                    </div>
                );
            })}
        </div>
    );
};

export default UsersPage;
