import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(false);

  async function fetchMovieHandler() {
    setLoading(true);
    const response = await fetch("https://swapi.dev/api/films/");
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
    setLoading(false);
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && <p>Found no movies.</p>}
        {isLoading && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
