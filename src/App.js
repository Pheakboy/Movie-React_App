import { useState } from "react";
import Header from "./components/Header";
import MovieCard from "./components/MovieCard";
import MovieDetail from "./components/MovieDetail";
import Loading from "./components/Loading";
import ErrorMessage from "./components/ErrorMessage";
import EmptyState from "./components/EmptyState";
import MovieStats from "./components/MovieStats";
import { useMovies } from "./hooks/useMovies";
import { useFavorites } from "./hooks/useFavorites";
const App = () => {
  const { filteredMovies, search, setSearch, loading, error, fetchMovies } =
    useMovies();
  const { favorites, toggleFavorite, isFavorited } = useFavorites();
  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieDetail
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
        onToggleFavorite={toggleFavorite}
        isFavorited={isFavorited(selectedMovie.id)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header search={search} onSearchChange={setSearch} />

      <main className="max-w-7xl mx-auto px-6 py-12">
        {error && <ErrorMessage message={error} onRetry={fetchMovies} />}

        {loading ? (
          <Loading />
        ) : filteredMovies.length === 0 ? (
          <EmptyState onClearSearch={() => setSearch("")} />
        ) : (
          <>
            <MovieStats
              movieCount={filteredMovies.length}
              favoritesCount={favorites.length}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredMovies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onMovieClick={setSelectedMovie}
                  onToggleFavorite={toggleFavorite}
                  isFavorited={isFavorited(movie.id)}
                />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default App;
