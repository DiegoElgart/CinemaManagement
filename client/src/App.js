import "./app.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import MainPage from "./Pages/MainPage";
import ManageUsersPage from "./Pages/ManageUsersPage";
import UsersPage from "./Pages/UsersPage";
import CreateAccountPage from "./Pages/CreateAccountPage";
import EditUserPage from "./Pages/EditUserPage";
import MoviesPage from "./Pages/MoviesPage";
import AddUserPage from "./Pages/AddUserPage";
import AddMoviePage from "./Pages/AddMoviePage";
import ManageMoviesPage from "./Pages/ManageMoviesPage";
import EditMoviePage from "./Pages/EditMoviePage";
import SubscriptionsPage from "./Pages/SubscriptionsPage";

function App() {
    return (
        <main className='container'>
            <Routes>
                <Route path='/' element={<LoginPage />} />
                <Route path='/main' element={<MainPage />} />
                <Route path='/register' element={<CreateAccountPage />} />
                <Route path='/manage-users' element={<ManageUsersPage />}>
                    <Route path='/manage-users/users' element={<UsersPage />} />
                    <Route
                        path='/manage-users/edit-user/:id'
                        element={<EditUserPage />}
                    />
                    <Route
                        path='/manage-users/addUser'
                        element={<AddUserPage />}
                    />
                </Route>
                <Route path='/movies' element={<ManageMoviesPage />}>
                    <Route path='/movies/allmovies' element={<MoviesPage />} />
                    <Route path='/movies/addMovie' element={<AddMoviePage />} />
                    <Route
                        path='/movies/edit/:id'
                        element={<EditMoviePage />}
                    />
                </Route>
                <Route path='/subscriptions' element={<SubscriptionsPage />} />
            </Routes>
        </main>
    );
}

export default App;
