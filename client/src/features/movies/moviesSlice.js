import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const MOVIES_URL = "http://localhost:3000/movies";

const initialState = { movies: [], status: "idle", error: null };

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
    const response = await axios.get(MOVIES_URL);
    return response.data;
});

export const addNewMovie = createAsyncThunk(
    "movies/addNewMovie",
    async newMovie => {
        console.log(newMovie);
        const response = await axios.post(`${MOVIES_URL}/new`, newMovie);
        return response.data;
    }
);

const moviesSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        movieAdded: {
            async reducer(state, action) {
                state.movies.push(action.payload);
            },
            prepare(name, genres, image, premiered) {
                return {
                    payload: {
                        name,
                        genres,
                        image,
                        premiered,
                    },
                };
            },
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchMovies.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(fetchMovies.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.movies = action.payload;
            })
            .addCase(fetchMovies.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(addNewMovie.fulfilled, (state, action) => {
                state.movies.push(action.payload);
            });
    },
});

export const selectAllMovies = state => state.movies.movies;
export const getMoviesStatus = state => state.movies.status;
export const getMoviesError = state => state.movies.error;

export const { movieAdded } = moviesSlice.actions;

export default moviesSlice.reducer;
