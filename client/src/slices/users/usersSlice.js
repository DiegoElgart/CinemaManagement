import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const USERS_URL = "http://localhost:3000/user";

const initialState = {
	users: [],
	status: "idle",
	error: null,
	userToEdit: {},
};

export const fetchAllUsers = createAsyncThunk("users/fetchAllUsers", async () => {
	const response = await axios.get(`${USERS_URL}/getUsers`);
	return response.data;
});
export const fetchUserById = createAsyncThunk("user/fetchUserById", async id => {
	const response = await axios.get(`${USERS_URL}/${id}`, {
		headers: {
			"Content-Type": "application/json",
			"access-token": localStorage.getItem("accessToken"),
		},
	});
	return response.data;
});
export const addPasswordToUser = createAsyncThunk("users/addPasswordToUser", async newUser => {
	const response = await axios.post(`${USERS_URL}/signUp`, newUser, {
		headers: {
			"Content-Type": "application/json",
			"access-token": localStorage.getItem("accessToken"),
		},
	});
	return response.data;
});
export const addUser = createAsyncThunk("users/addUser", async newUser => {
	const response = await axios.post(`${USERS_URL}/addUser`, newUser, {
		headers: {
			"Content-Type": "application/json",
			"access-token": localStorage.getItem("accessToken"),
		},
	});
	return response.data;
});

export const updateUser = createAsyncThunk("user/updateUser", async updatedUser => {
	const response = await axios.post(`${USERS_URL}/${updatedUser._id}`, updatedUser, {
		headers: {
			"Content-Type": "application/json",
			"access-token": localStorage.getItem("accessToken"),
		},
	});
	return response.data;
});

export const deleteUser = createAsyncThunk("user/deleteUser", async deleteUser => {
	const response = await axios.post(`${USERS_URL}/delete/${deleteUser}`, {
		headers: {
			"Content-Type": "application/json",
			"access-token": localStorage.getItem("accessToken"),
		},
	});
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
			.addCase(addPasswordToUser.fulfilled, (state, action) => {
				state.users.push(action.payload);
			})
			.addCase(addPasswordToUser.rejected, (state, action) => {
				state.error = action.error.message;
			})
			.addCase(fetchUserById.fulfilled, (state, action) => {
				state.status = "Succeeded fetching user by id";
				state.userToEdit = action.payload;
			})
			.addCase(fetchUserById.pending, (state, action) => {
				state.status = "Pending fetching user by id";
			})
			.addCase(fetchUserById.rejected, (state, action) => {
				state.status = "Failed fetching user by id";

				state.error = action.error.message;
			})
			.addCase(updateUser.fulfilled, (state, action) => {
				const index = state.users.findIndex(user => user._id === action.payload._id);
				if (index !== -1) {
					state.users[index] = action.payload;
				}
			})
			.addCase(updateUser.rejected, (state, action) => {
				state.error = action.error.message;
			})
			.addCase(deleteUser.rejected, (state, action) => {
				state.error = action.error.message;
			})
			.addCase(deleteUser.fulfilled, (state, action) => {
				state.status = action.payload;
			});
	},
});

export const getAllUsers = state => state.users;

export const getUserToEdit = state => state.users.userToEdit;

export const getUserStatus = state => state.users.status;

export default userSlice.reducer;
