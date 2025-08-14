import toast from "react-hot-toast";
import fetchMovies from "../../services/movieService";
import SearchBar from "../SearchBar/SearchBar";
import css from "./App.module.css";
import { useState } from "react";
import type { Movie } from "../../types/movie";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { MovieModal } from "../MovieModal/MovieModal";

const App = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [movie, setMovie] = useState<Movie | null>(null);
  const onSubmit = async (topic: string) => {
    setMovies([]);
    setIsLoading(true);
    setIsError(false);
    try {
      const moviesData = await fetchMovies(topic);
      if (moviesData.length === 0) {
        toast.error("No movies found for your request.");
      }
      setMovies(moviesData);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  const movieSelect = (movie: Movie) => {
    setMovie(movie);
  };
  const onClose = () => {
    setMovie(null);
  };
  return (
    <div className={css.app}>
      <SearchBar onSubmit={onSubmit} />
      {movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={movieSelect} />
      )}
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {movie && <MovieModal movie={movie} onClose={onClose} />}
    </div>
  );
};

export default App;
