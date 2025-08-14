import type { Movie } from "../../types/movie";
import css from "./MovieGrid.module.css";
interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}
const MovieGrid = ({ movies, onSelect }: MovieGridProps) => {
  return (
    <ul className={css.grid}>
      {movies.map((item) => (
        <li key={item.id}>
          <div className={css.card}>
            <img
              onClick={() => onSelect(item)}
              className={css.image}
              src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
              alt={item.overview}
              loading="lazy"
            />
            <h2 className={css.title}>{item.title}</h2>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MovieGrid;
