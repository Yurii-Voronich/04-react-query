import axios from "axios";
import type { Movie } from "../types/movie";

axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.headers.common["Authorization"] = `Bearer ${
  import.meta.env.VITE_TMDB_TOKEN
}`;
interface TMDBResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
export default async function fetchMovies(
  topic: string,
  page: number
): Promise<TMDBResponse> {
  const res = await axios.get<TMDBResponse>("/search/movie", {
    params: {
      query: topic,
      page: page,
    },
  });
  return res.data;
}
