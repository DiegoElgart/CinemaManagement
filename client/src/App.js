import "./app.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import MainPage from "./Pages/MainPage";
import ManageUsersPage from "./Pages/ManageUsersPage";
import UsersPage from "./Pages/UsersPage";
import { useSelector } from "react-redux";
import { selectUser } from "./slices/users/usersSlice";
function App() {
    return (
        <main className='container'>
            <MainPage />
            <Routes>
                <Route path='/' element={<LoginPage />} />

                <Route path='/manage-users' element={<ManageUsersPage />} />
                <Route path='/users' element={<UsersPage />} />
            </Routes>
        </main>
    );
}

export default App;
