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
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";

const App = () => {
  const [movie, setmovie] = useState("");
  const [selectedMovie, setselectedMovie] = useState<Movie | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["movies", movie, currentPage],
    queryFn: () => fetchMovies(movie, currentPage),
    enabled: movie !== "",
    placeholderData: keepPreviousData,
  });
  useEffect(() => {
    if (isSuccess && data.results.length === 0) {
      toast.error("No movies found for your request.");
    }
  }, [data, isSuccess]);

  const onSubmit = (topic: string) => {
    setmovie(topic);
    setCurrentPage(1);
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
      {isSuccess && data.results.length > 0 && (
        <MovieGrid movies={data.results} onSelect={onSelect} />
      )}
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {selectedMovie && selectedMovie !== null && (
        <MovieModal movie={selectedMovie} onClose={onClose} />
      )}
      {isSuccess && data.total_pages > 1 && (
        <ReactPaginate
          pageCount={data.total_pages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setCurrentPage(selected + 1)}
          forcePage={currentPage - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
        />
      )}
    </div>
  );
};

export default App;
