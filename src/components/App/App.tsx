import toast from "react-hot-toast";
import fetchMovies from "../../services/movieService";
import SearchBar from "../SearchBar/SearchBar";
import css from "./App.module.css";
import { useEffect, useState } from "react";
import type { Movie } from "../../types/movie";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { MovieModal } from "../MovieModal/MovieModal";
import { useQuery } from "@tanstack/react-query";

const App = () => {
  const [movie, setmovie] = useState("");
  const [selectedMovie, setselectedMovie] = useState<Movie | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["movies", movie],
    queryFn: () => fetchMovies(movie),
    enabled: movie !== "",
  });
  useEffect(() => {
    if (data && data.length === 0) {
      toast.error("No movies found for your request.");
    }
  }, [data]);

  const onSubmit = (topic: string) => {
    setmovie(topic);
  };

  const onSelect = (item: Movie) => {
    setselectedMovie(item);
  };

  const onClose = () => {
    setselectedMovie(null);
  };

  return (
    <div className={css.app}>
      <SearchBar onSubmit={onSubmit} />
      {data && data.length > 0 && (
        <MovieGrid movies={data} onSelect={onSelect} />
      )}
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {selectedMovie && selectedMovie !== null && (
        <MovieModal movie={selectedMovie} onClose={onClose} />
      )}
    </div>
  );
};

export default App;
