import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const AUTH_URL = "http://localhost:3000/auth";

const initialState = { user: {}, status: "idle", error: null };

export const loginUser = createAsyncThunk("user/loginUser", async loginData => {
    const response = await axios.post(`${AUTH_URL}/login`, loginData);
    localStorage.setItem("accessToken", response.data.accessToken);
    return response.data;
});

export const addUser = createAsyncThunk("users/addUser", async newUser => {
    const response = await axios.post(`${AUTH_URL}/signUp`, newUser);
    return response.data;
});

export const logout = createAsyncThunk("user/logout", async () => {
    localStorage.removeItem("accessToken");
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        usersLogin: (state, action) => {
            state.user = action.payload;
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

            .addCase(logout.fulfilled, (state, action) => {
                state.status = "idle";
                state.user = {};
            });
    },
});
export const selectUser = state => state.auth;
export const getaAuthStatus = state => state.auth.status;
export const getAuthsError = state => state.user.error;

export default authSlice.reducer;
