import { useSelector, useDispatch } from "react-redux";
import {
    fetchAllUsers,
    getAllUsers,
    deleteUser,
} from "../slices/users/usersSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UsersPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { users } = useSelector(getAllUsers);

    useEffect(() => {
        dispatch(fetchAllUsers());
    }, [dispatch]);

    const handleDelete = userId => {
        dispatch(deleteUser(userId));
        navigate("/manage-users", { replace: true });
    };

    return (
        <div className='main-page'>
            <h1>Users</h1>
            {users.map(user => {
                return (
                    <div key={user._id} className='card'>
                        <h3 className='title'>First Name: {user.fname}</h3>
                        <span className='content'>
                            <h3>Last Name: {user.lname}</h3>
                            <h3>
                                Session Time Out (min): {user.sessionTimeOut}
                            </h3>
                            <h4>Created data: {user.createdDate}</h4>
                        </span>
                        <span className='button-container'>
                            <button
                                className='button'
                                onClick={() =>
                                    navigate(
                                        `/manage-users/edit-user/${user._id}`
                                    )
                                }>
                                Edit
                            </button>
                            <button
                                className='button'
                                onClick={() => handleDelete(user._id)}>
                                Delete
                            </button>
                        </span>
                    </div>
                );
            })}
        </div>
    );
};

export default UsersPage;
