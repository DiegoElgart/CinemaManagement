import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { act } from "react-dom/test-utils";

const MEMBERS_URL = "http://localhost:3000/members";

const initialState = {
	members: [],
	memberToEdit: {},
	status: "idle",
	error: null,
};

export const fetchAllMembers = createAsyncThunk("members/fecthAllMembers", async () => {
	const response = await axios.get(`${MEMBERS_URL}`);
	return response.data;
});

const membersSlice = createSlice({
	name: "members",
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(fetchAllMembers.pending, (state, action) => {
				state.status = "loading members";
			})
			.addCase(fetchAllMembers.fulfilled, (state, action) => {
				state.status = "Succeeded fetching all members";
				state.members = action.payload;
				state.memberToEdit = {};
			})
			.addCase(fetchAllMembers.rejected, (state, action) => {
				state.status = "Failed loading members";
				state.error = action.error.message;
			});
	},
});

export const selectAllMembers = state => state.members.members;

export default membersSlice.reducer;
