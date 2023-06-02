// usersSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const USERS_URL = "http://localhost:3000/auth";

const initialState = { user: {}, status: "idle", error: null };

export const fetchAllUsers = createAsyncThunk(
    "users/fetchAllUsers",
    async () => {
        const response = await axios.get(USERS_URL);
        return response.data;
    }
);

export const loginUser = createAsyncThunk("user/loginUser", async loginData => {
    const response = await axios.post(`${USERS_URL}/login`, loginData);
    localStorage.setItem("accessToken", response.data.accessToken);
    return response.data;
});

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        usersLogin: (state, action) => {
            state = action.payload;
        },
        allUsers:{}
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
            });
    },
});

export const selectUser = state => state.user.user;
export const getUserStatus = state => state.user.status;
export const getUsersError = state => state.user.error;

export default userSlice.reducer;
