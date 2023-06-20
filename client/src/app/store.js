import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "../slices/movies/moviesSlice";
import usersReducer from "../slices/users/usersSlice";
import authReducer from "../slices/users/authSlice";
import subscriptionsReducer from "../slices/subscriptions/subscriptionsSlice";
import membersReducer from "../slices/members/membersSlice";

export const store = configureStore({
    reducer: {
        movies: moviesReducer,
        users: usersReducer,
        auth: authReducer,
        subscriptions: subscriptionsReducer,
        members: membersReducer,
    },
});
