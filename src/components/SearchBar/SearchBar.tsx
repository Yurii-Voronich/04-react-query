import toast from "react-hot-toast";
import styles from "./SearchBar.module.css";

interface SearchBarProps {
  onSubmit: (topic: string) => void;
}
const SearchBar = ({ onSubmit }: SearchBarProps) => {
  const handleSearch = (formData: FormData) => {
    const querry = formData.get("query") as string;
    if (!querry.trim()) {
      toast.error("Please enter your search querry", {
        position: "top-center",
      });
      return;
    }

    onSubmit(querry);
  };
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a
          className={styles.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>
        <form className={styles.form} action={handleSearch}>
          <input
            className={styles.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
          />
          <button className={styles.button} type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  );
};

export default SearchBar;
