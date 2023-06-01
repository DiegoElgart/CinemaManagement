import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "../slices/movies/moviesSlice";
import userReducer from "../slices/users/usersSlice";

export const store = configureStore({
    reducer: { movies: moviesReducer, user: userReducer },
});
