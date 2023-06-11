// usersSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const USERS_URL = "http://localhost:3000/auth";

const initialState = {
    user: {},
    users: [],
    status: "idle",
    error: null,
    userToEdit: {},
};

export const fetchAllUsers = createAsyncThunk(
    "users/fetchAllUsers",
    async () => {
        const response = await axios.get(`${USERS_URL}/getUsers`);
        return response.data;
    }
);
export const fetchUserById = createAsyncThunk(
    "user/fetchUserById",
    async id => {
        const response = await axios.get(`${USERS_URL}/${id}`);
        return response.data;
    }
);
export const addUser = createAsyncThunk("users/addUser", async newUser => {
    const response = await axios.post(`${USERS_URL}/signUp`, newUser);
    return response.data;
});

export const loginUser = createAsyncThunk("user/loginUser", async loginData => {
    const response = await axios.post(`${USERS_URL}/login`, loginData);
    localStorage.setItem("accessToken", response.data.accessToken);
    return response.data;
});

export const logout = createAsyncThunk("user/logout", async () => {
    localStorage.removeItem("accessToken");
});

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        usersLogin: (state, action) => {
            state = action.payload;
        },
        userAdded: {
            async reducer(state, action) {
                state.users.push(action.payload);
            },
        },
        userById: {
            async reduce(state, action) {
                state.userToEdit = action.payload;
            },
        },
    },
    extraReducers(builder) {
        builder
            .addCase(loginUser.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(fetchAllUsers.pending, (state, action) => {
                state.status = "loading all users";
            })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.status = "succeeded fetching all users";
                state.users = action.payload;
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.status = "idle";
                state.user = {};
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.users.push(action.payload);
            })
            .addCase(addUser.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(fetchUserById.fulfilled, (state, action) => {
                state.userToEdit = action.payload;
            })
            .addCase(fetchUserById.rejected, (state, action) => {
                state.error = action.error.message;
            });
    },
});

export const selectUser = state => state.user.user;
export const getUserStatus = state => state.user.status;
export const getUsersError = state => state.user.error;
export const getAllUsers = state => state.user.users;

export default userSlice.reducer;
