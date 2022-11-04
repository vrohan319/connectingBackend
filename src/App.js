import React, { useState, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovieHandler = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://swapi.dev/api/films/");

      if (!response.ok) {
        throw new Error("somethings wrong");
      }

      const data = await response.json();

      const transformedMovie = data.results.map((value) => {
        return {
          id: value.episode_id,
          title: value.title,
          openingText: value.opening_crawl,
          releaseDate: value.release_date,
        };
      });
      setMovies(transformedMovie);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchMovieHandler();
  }, [fetchMovieHandler]);

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  } else if (error === null) {
    content = <p>Found no movies.</p>;
  } else {
    content = error;
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
