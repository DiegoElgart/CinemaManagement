import { useSelector, useDispatch } from "react-redux";
import { selectAllMovies } from "./moviesSlice";

const MovieList = () => {
    const dispatch = useDispatch();
    const movies = useSelector(selectAllMovies);
    return (
        <div>
            {movies.map(movie => {
                return (
                    <div key={movie._id}>
                        <h3>{movie.name}</h3>
                        <img alt={movie.name} src={movie.image} />
                    </div>
                );
            })}
        </div>
    );
};

export default MovieList;
