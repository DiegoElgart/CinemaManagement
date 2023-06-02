import "./app.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import MainPage from "./Pages/MainPage";

function App() {
    return (
        <main className='container'>
            <h1>Cinema Managment</h1>
            <Routes>
                <Route path='/' element={<LoginPage />} />
                <Route path='/main' element={<MainPage />} />
            </Routes>
        </main>
    );
}

export default App;
