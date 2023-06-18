import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const MOVIES_URL = "http://localhost:3000/movies";

const initialState = {
    movies: [],
    movieToEdit: {},
    status: "idle",
    error: null,
};

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
    const response = await axios.get(MOVIES_URL);
    return response.data;
});

export const fetchMovieById = createAsyncThunk(
    "movie/fetchMovieById",
    async id => {
        const response = await axios.get(`${MOVIES_URL}/${id}`);
        return response.data;
    }
);

export const addNewMovie = createAsyncThunk(
    "movie/addNewMovie",
    async newMovie => {
        const response = await axios.post(`${MOVIES_URL}/new`, newMovie);
        return response.data;
    }
);

export const updateMovie = createAsyncThunk(
    "movie/updateMovie",
    async updateMovie => {
        const response = await axios.post(
            `${MOVIES_URL}/${updateMovie._id}`,
            updateMovie
        );
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
            })
            .addCase(addNewMovie.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload.message;
            })
            .addCase(fetchMovieById.fulfilled, (state, action) => {
                state.status = "Succeeded fetching Movie by Id";
                const movieDate = action.payload.premiered;
                const date = new Date(movieDate);
                const formattedDate = date.toISOString().slice(0, 10);
                action.payload.premiered = formattedDate;
                state.movieToEdit = action.payload;
            })
            .addCase(fetchMovieById.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload.message;
            });
    },
});

export const selectAllMovies = state => state.movies.movies;
export const getMoviesStatus = state => state.movies.status;
export const getMoviesError = state => state.movies.error;
export const getMovieToEdit = state => state.movies.movieToEdit;

export const { movieAdded } = moviesSlice.actions;

export default moviesSlice.reducer;
