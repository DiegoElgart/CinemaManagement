import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const SUBSCRIPTIONS_URL = "http://localhost:3000/subscriptions";

const initialState = {
	subscriptions: [],
	subcriptionById: {},
	subscription: {},
	status: "idle",
	error: null,
};

export const fetchAllSubscriptions = createAsyncThunk("subscriptions/fetchSubscriptions", async () => {
	const response = await axios.get(SUBSCRIPTIONS_URL);
	return response.data;
});

export const fetchSubscriptionById = createAsyncThunk("subscription/fetchSubscriptionById", async id => {
	const response = await axios.get(`${SUBSCRIPTIONS_URL}/${id}`);
	return response.data;
});

export const fetchSubscriptionByMemberId = createAsyncThunk("subscription/fetchSubscriptionByMemberId", async memberId => {
	const response = await axios.get(`${SUBSCRIPTIONS_URL}/memberId/${memberId}`);
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
				state.subscriptions = action.payload;
			})
			.addCase(fetchSubscriptionByMemberId.fulfilled, (state, action) => {
				state.status = "succeeded fetching subscription by memberid";
				state.subscription = action.payload;
			})
			.addCase(fetchSubscriptionByMemberId.rejected, (state, action) => {
				state.status = "failed fetching subscription by memberid";
				state.subscription = {};
			});
	},
});

export const selectAllSubscriptions = state => state.subscriptions.subscriptions;
export const selectSubscriptionById = state => state.subcriptionById;
export const selectSubscription = state => state.subscriptions.subscription;

export default subscriptionsSlice.reducer;
