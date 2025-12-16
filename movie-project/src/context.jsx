import { createContext, useEffect, useState } from "react";

const AppContext = createContext(null);
const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = import.meta.env.VITE_URL;

const AppProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("batman");
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState("");
  const [singleMovie, setSingleMovie] = useState({});

  const fetchMovies = async (searchTerm) => {
    setLoading(true);
    setIsError("");

    try {
      const response = await fetch(
        `${API_URL}?apikey=${API_KEY}&s=${searchTerm}`
      );
      const data = await response.json();
      console.log(data);
      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setMovies([]);
        setIsError(data.Error);
      }
    } catch {
      setIsError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // 🎬 Fetch single movie
  const getSingleMovie = async (id) => {
    setLoading(true);
    setIsError("");

    try {
      const res = await fetch(
        `${API_URL}?apikey=${API_KEY}&i=${id}&plot=full`
      );
      const data = await res.json();

      if (data.Response === "True") {
        setSingleMovie(data);
      } else {
        setIsError(data.Error);
      }
    } catch {
      setIsError("Failed to load movie");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 SEARCH HAPPENS HERE
  useEffect(() => {
    let timer = setTimeout(() => {
      fetchMovies(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <AppContext.Provider
      value={{ movies, loading, isError, query, setQuery, singleMovie, getSingleMovie }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
