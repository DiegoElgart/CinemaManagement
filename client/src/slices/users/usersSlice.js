import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const USERS_URL = "http://localhost:3000/auth";

const initialState = { user: {} };

export const loginUser = createAsyncThunk("user/loginUser", async loginData => {
    console.log(loginData);
    const response = await axios.post(`${USERS_URL}/login`, loginData);
    return response.data;
});

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        usersLogin: {
            async reducer(state, action) {
                state.user = action.payload;
            },
        },
    },
});

const { usersLogin } = userSlice.actions;

export default userSlice.reducer;
