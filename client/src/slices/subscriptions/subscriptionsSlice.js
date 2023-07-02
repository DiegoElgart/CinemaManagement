import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const SUBSCRIPTIONS_URL = "http://localhost:3000/subscriptions";

const initialState = {
	subscriptions: [],
	subcriptionById: {},
	subscription: [],
	isSubscription: false,
	status: "idle",
	error: null,
};

export const fetchAllSubscriptions = createAsyncThunk("subscriptions/fetchSubscriptions", async () => {
	const response = await axios.get(SUBSCRIPTIONS_URL, {
		headers: {
			"Content-Type": "application/json",
			"access-token": localStorage.getItem("accessToken"),
		},
	});
	return response.data;
});

export const fetchSubscriptionById = createAsyncThunk("subscription/fetchSubscriptionById", async id => {
	const response = await axios.get(`${SUBSCRIPTIONS_URL}/${id}`, {
		headers: {
			"Content-Type": "application/json",
			"access-token": localStorage.getItem("accessToken"),
		},
	});
	return response.data;
});

export const fetchSubscriptionByMemberId = createAsyncThunk("subscription/fetchSubscriptionByMemberId", async memberId => {
	const response = await axios.get(`${SUBSCRIPTIONS_URL}/memberId/${memberId}`, {
		headers: {
			"Content-Type": "application/json",
			"access-token": localStorage.getItem("accessToken"),
		},
	});
	return response.data;
});
export const fetchSubscriptionByMovieId = createAsyncThunk("subscription/fetchSubscriptionByMovieId", async movieId => {
	const response = await axios.get(`${SUBSCRIPTIONS_URL}/movieId/${movieId}`, {
		headers: {
			"Content-Type": "application/json",
			"access-token": localStorage.getItem("accessToken"),
		},
	});
	return response.data;
});

export const addSubscription = createAsyncThunk("subscription/addSubscription", async newSubscription => {
	const response = await axios.post(`${SUBSCRIPTIONS_URL}/new`, newSubscription, {
		headers: {
			"Content-Type": "application/json",
			"access-token": localStorage.getItem("accessToken"),
		},
	});
	return response.data;
});
export const deleteSubscriptionByMemberId = createAsyncThunk("subscription/deleteSubscriptionByMemberId", async memberId => {
	const response = await axios.post(`${SUBSCRIPTIONS_URL}/delete/${memberId}`, {
		headers: {
			"Content-Type": "application/json",
			"access-token": localStorage.getItem("accessToken"),
		},
	});
	return response.data;
});

const subscriptionsSlice = createSlice({
	name: "subscriptions",
	initialState,
	reducers: {
		getSubscriptions: (state, action) => {
			state.subscriptions = action.payload;
		},
	},
	extraReducers(builder) {
		builder
			.addCase(fetchAllSubscriptions.pending, (state, action) => {
				state.status = "loading subscriptions";
			})
			.addCase(fetchAllSubscriptions.fulfilled, (state, action) => {
				state.status = "succeeded fetching all subscriptions";
				state.subscriptions = action.payload;
			})
			.addCase(fetchSubscriptionById.fulfilled, (state, action) => {
				state.status = "succeeded fetching subscription by id";
				state.subscriptionById = action.payload;
			})
			.addCase(fetchSubscriptionByMemberId.fulfilled, (state, action) => {
				state.status = "succeeded fetching subscription by memberid";
				state.subscription = action.payload;
			})
			.addCase(fetchSubscriptionByMemberId.rejected, (state, action) => {
				state.status = "failed fetching subscription by memberid";
				state.subscription = {};
			})
			.addCase(addSubscription.rejected, (state, action) => {
				state.status = "failed to add new subscription";
			})
			.addCase(addSubscription.fulfilled, (state, action) => {
				state.status = "failed to add new subscription";
			})
			.addCase(deleteSubscriptionByMemberId.fulfilled, (state, action) => {
				state.status = "Successful deleted subscription by memberId";
			})
			.addCase(deleteSubscriptionByMemberId.rejected, (state, action) => {
				state.status = "Failed to delete subscription by memberId";
			})
			.addCase(fetchSubscriptionByMovieId.fulfilled, (state, action) => {
				state.status = "succeeded fetching subscription by movieId";
				state.subscription = action.payload;
				state.isSubscription = true;
			})
			.addCase(fetchSubscriptionByMovieId.rejected, (state, action) => {
				state.status = "failed fetching subscription by movieId";
				state.isSubscription = false;
			});
	},
});

export const selectAllSubscriptions = state => state.subscriptions.subscriptions;
export const selectSubscriptionById = state => state.subcriptionById;
export const selectSubscription = state => state.subscriptions.subscription;
export const selectSubscriptionByMemberId = state => state.subscriptions.subscription;
export const selectIsSubscription = state => state.subscriptions.isSubscription;
export default subscriptionsSlice.reducer;
