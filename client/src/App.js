import "./app.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import MainPage from "./Pages/MainPage";
import ManageUsersPage from "./Pages/ManageUsersPage";
import UsersPage from "./Pages/UsersPage";
import CreateAccountPage from "./Pages/CreateAccountPage";
import EditUserPage from "./Pages/EditUserPage";

function App() {
    return (
        <main className='container'>
            <Routes>
                <Route path='/' element={<LoginPage />} />
                <Route path='/main' element={<MainPage />} />
                <Route path='/register' element={<CreateAccountPage />} />
                <Route path='/manage-users' element={<ManageUsersPage />} />
                <Route path='/users' element={<UsersPage />} />
                <Route path='/edit-user/:id' element={<EditUserPage />} />
            </Routes>
        </main>
    );
}

export default App;
