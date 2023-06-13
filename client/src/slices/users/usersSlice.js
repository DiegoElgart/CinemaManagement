import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const USERS_URL = "http://localhost:3000/user";

const initialState = {
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

export const updateUser = createAsyncThunk(
    "user/updateUser",
    async updatedUser => {
        const response = await axios.post(
            `${USERS_URL}/${updatedUser._id}`,
            updatedUser
        );
        return response.data;
    }
);

export const loginUser = createAsyncThunk("user/loginUser", async loginData => {
    const response = await axios.post(`${USERS_URL}/login`, loginData);
    localStorage.setItem("accessToken", response.data.accessToken);
    return response.data;
});

export const logout = createAsyncThunk("user/logout", async () => {
    localStorage.removeItem("accessToken");
});

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
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
            .addCase(fetchAllUsers.pending, (state, action) => {
                state.status = "loading all users";
            })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.status = "succeeded fetching all users";
                state.users = [...action.payload];
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
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                const index = state.users.findIndex(
                    user => user._id === action.payload._id
                );
                if (index !== -1) {
                    state.users[index] = action.payload;
                }
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.error = action.error.message;
            });
    },
});

export const getAllUsers = state => state.users;
export const getUserById = state => state.userToEdit;

export default userSlice.reducer;
