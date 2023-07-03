import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const MEMBERS_URL = "http://localhost:3000/members";

const initialState = {
	members: [],
	memberToEdit: {},
	status: "idle",
	error: null,
};

export const fetchAllMembers = createAsyncThunk("members/fecthAllMembers", async () => {
	const response = await axios.get(`${MEMBERS_URL}`, { headers: { "access-token": localStorage.getItem("accessToken") } });
	return response.data;
});

export const fetchMemberById = createAsyncThunk("members/fetchMemberById", async memberId => {
	const response = await axios.get(`${MEMBERS_URL}/${memberId}`, { headers: { "access-token": localStorage.getItem("accessToken") } });
	return response.data;
});

export const updateMember = createAsyncThunk("member/updateMember", async obj => {
	const response = await axios.post(`${MEMBERS_URL}/${obj._id}`, obj, {
		headers: {
			"Content-Type": "application/json",
			"access-token": localStorage.getItem("accessToken"),
		},
	});
	return response.data;
});

export const deleteMember = createAsyncThunk("member/deleteMember", async memberId => {
	const response = await axios.post(`${MEMBERS_URL}/${memberId}/delete`,{}, { headers: { "Content-Type": "application/json", "access-token": localStorage.getItem("accessToken") } });
	return response.data;
});

export const addNewMember = createAsyncThunk("members/addNewMember", async obj => {
	const response = await axios.post(`${MEMBERS_URL}/new`, obj, {
		headers: {
			"Content-Type": "application/json",
			"access-token": localStorage.getItem("accessToken"),
		},
	});
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
			})
			.addCase(fetchMemberById.fulfilled, (state, action) => {
				state.status = "Succeeded fetching member by id";
				state.memberToEdit = action.payload;
			})
			.addCase(fetchMemberById.rejected, (state, action) => {
				state.status = "Failed fetching member by id";
			})
			.addCase(updateMember.fulfilled, (state, action) => {
				state.status = "Updated member succesfully";
			})
			.addCase(updateMember.rejected, (state, action) => {
				state.status = "Failed updated member ";
			})
			.addCase(deleteMember.fulfilled, (state, action) => {
				state.status = "Deleted member succesfully";
			})
			.addCase(deleteMember.rejected, (state, action) => {
				state.status = "Failed to delete member ";
			})
			.addCase(addNewMember.fulfilled, (state, action) => {
				state.status = "Added new member succesfully";
				state.members.push(action.payload);
			})
			.addCase(addNewMember.rejected, (state, action) => {
				state.status = "failed adding new member";
				state.error = action.payload.message;
			});
	},
});

export const selectAllMembers = state => state.members.members;
export const selectMemberToEdit = state => state.members.memberToEdit;

export default membersSlice.reducer;
