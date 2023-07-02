import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { act } from "react-dom/test-utils";

const AUTH_URL = "http://localhost:3000/auth";

const initialState = {
	user: {},
	permissions: [
		{
			viewSubscriptions: false,
			createSubscriptions: false,
			deleteSubscriptions: false,
			updateSubscriptions: false,
			viewMovies: false,
			createMovies: false,
			deleteMovies: false,
			updateMovies: false,
		},
	],
	fname: "",
	sessionTimeOut: 0,
	isAdmin: false,
	status: "idle",
	error: null,
};

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
				if (action.payload.user.username === "admin") {
					state.isAdmin = true;
				} else {
					state.isAdmin = false;
				}
				state.permissions = action.payload.permissions;
				state.fname = action.payload.fname;
				state.sessionTimeOut = action.payload.sessionTimeOut;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			})

			.addCase(logout.fulfilled, (state, action) => {
				state.status = "idle";
				state.user = {};
				state.permissions = [
					{
						viewSubscriptions: false,
						createSubscriptions: false,
						deleteSubscriptions: false,
						updateSubscriptions: false,
						viewMovies: false,
						createMovies: false,
						deleteMovies: false,
						updateMovies: false,
					},
				];
				state.fname = "";
				state.sessionTimeOut = 0;
				state.isAdmin = false;
			});
	},
});
export const selectUser = state => state.auth;
export const getaAuthStatus = state => state.auth.status;
export const getAuthsError = state => state.user.error;
export const getUserPermissions = state => state.auth.permissions;
export const getUserName = state => state.auth.fname;
export const getUserSessionTime = state => state.auth.sessionTimeOut;
export const getIsAdmin = state => state.auth.isAdmin;

export default authSlice.reducer;
