import React, { useContext, useMemo } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "./context";

const imgUrl = "https://via.placeholder.com/200x300?text=No+Image";

const Movies = () => {
  const { movies, loading, isError } = useContext(AppContext);

  // ✅ Remove duplicate movies using imdbID (PERMANENT FIX)
  const uniqueMovies = useMemo(() => {
    return Array.from(
      new Map(movies.map(movie => [movie.imdbID, movie])).values()
    );
  }, [movies]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (isError) {
    return <div className="error text-center text-red-600 text-2xl font-semibold mt-4">Error: {isError}</div>;
  }

  return (
    <section className="movie-page">
      <div className="grid grid-4-col">
        {uniqueMovies.map((movie) => {
          const { imdbID, Title, Poster } = movie;
          const movieName =
            Title.length > 15 ? `${Title.substring(0, 15)}...` : Title;

          return (
            <NavLink to={`/movies/${imdbID}`} key={imdbID}>
              <div className="card">
                <div className="card-info">
                  <h2>{movieName}</h2>
                  <img
                    src={Poster !== "N/A" ? Poster : imgUrl}
                    alt={Title}
                    loading="lazy"
                  />
                </div>
              </div>
            </NavLink>
          );
        })}
      </div>
    </section>
  );
};

export default Movies;
