import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const SUBSCRIPTIONS_URL = "http://localhost:3000/subscriptions";

const initialState = {
    subscriptions: [],
    subcriptionById: {},
    status: "idle",
    error: null,
};

export const fetchAllSubscriptions = createAsyncThunk(
    "subscriptions/fetchSubscriptions",
    async () => {
        const response = await axios.get(SUBSCRIPTIONS_URL);
        return response.data;
    }
);

export const fetchSubscriptionById = createAsyncThunk(
    "subscription/fetchSubscriptionById",
    async id => {
        const response = await axios.get(`${SUBSCRIPTIONS_URL}/${id}`);
        return response.data;
    }
);

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
            });
    },
});

export const selectAllSubscriptions = state => state.subscriptions;
export const selectSubscriptionById = state => state.subcriptionById;

export default subscriptionsSlice.reducer;