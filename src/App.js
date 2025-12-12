import { useState, useEffect } from 'react';
import { Search, Star, X, Heart, Play, TrendingUp, ChevronRight } from 'lucide-react';

const MovieDB = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const API_KEY = '11a3f85c405ec2580bb40a327c724d64';
  const BASE_URL = 'https://api.themoviedb.org/3';
  const IMG_BASE = 'https://image.tmdb.org/t/p/w500';

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&page=1`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.results) {
        setMovies(data.results);
        setFilteredMovies(data.results);
      } else {
        setError('No movies found');
      }
    } catch (err) {
      setError(`Error fetching movies: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (search.trim() === '') {
      setFilteredMovies(movies);
    } else {
      const filtered = movies.filter(movie =>
        movie.title.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredMovies(filtered);
    }
  }, [search, movies]);

  const toggleFavorite = (movieId) => {
    setFavorites(prev =>
      prev.includes(movieId)
        ? prev.filter(id => id !== movieId)
        : [...prev, movieId]
    );
  };

  const isFavorited = (movieId) => favorites.includes(movieId);

  const MovieCard = ({ movie }) => {
    const imageUrl = movie.poster_path ? `${IMG_BASE}${movie.poster_path}` : null;
    const rating = movie.vote_average ? (movie.vote_average / 2).toFixed(1) : '0';

    return (
      <div
        onClick={() => setSelectedMovie(movie)}
        className="group relative cursor-pointer h-96 rounded-2xl overflow-hidden"
      >
        {/* Card Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-800 to-slate-900 group-hover:from-slate-700 group-hover:to-slate-800 transition-all duration-500" />

        {/* Image */}
        {imageUrl ? (
          <>
            <img
              src={imageUrl}
              alt={movie.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-125 transition-transform duration-500 opacity-80 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent group-hover:via-black/30 transition-all duration-300" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center">
            <span className="text-slate-400 text-center px-4 text-sm">{movie.title}</span>
          </div>
        )}

        {/* Overlay Content */}
        <div className="absolute inset-0 flex flex-col justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-yellow-500/90 rounded-lg">
              <Star className="w-3.5 h-3.5 fill-white text-white" />
              <span className="text-xs font-bold text-white">{rating}</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(movie.id);
              }}
              className="p-2 bg-white/20 hover:bg-red-500 rounded-lg transition-all backdrop-blur"
            >
              <Heart
                className="w-4 h-4 text-white"
                fill={isFavorited(movie.id) ? 'white' : 'none'}
              />
            </button>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-white text-sm line-clamp-2">{movie.title}</h3>
            <button className="w-full py-2 bg-white text-black font-semibold rounded-lg flex items-center justify-center gap-2 hover:bg-slate-200 transition-all">
              <Play className="w-4 h-4 fill-black" />
              View Details
            </button>
          </div>
        </div>

        {/* Static Rating Badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 bg-yellow-500/80 rounded-lg group-hover:opacity-0 transition-opacity duration-300">
          <Star className="w-3.5 h-3.5 fill-white text-white" />
          <span className="text-xs font-bold text-white">{rating}</span>
        </div>
      </div>
    );
  };

  if (selectedMovie) {
    const posterUrl = selectedMovie.poster_path
      ? `${IMG_BASE}${selectedMovie.poster_path}`
      : null;
    const year = selectedMovie.release_date
      ? new Date(selectedMovie.release_date).getFullYear()
      : 'N/A';
    const rating = selectedMovie.vote_average ? (selectedMovie.vote_average / 2).toFixed(1) : 'N/A';

    return (
      <div className="min-h-screen bg-white">
        {/* Close Button */}
        <button
          onClick={() => setSelectedMovie(null)}
          className="fixed top-6 right-6 z-50 p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-all"
        >
          <X className="w-6 h-6 text-black" />
        </button>

        {/* Hero Section */}
        <div className="relative h-96 md:h-screen overflow-hidden">
          {posterUrl && (
            <div>
              <img
                src={posterUrl}
                alt={selectedMovie.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
            </div>
          )}

          {/* Hero Content */}
          <div className="absolute inset-0 flex items-end p-8 md:p-16">
            <div className="max-w-2xl">
              <p className="text-sm font-bold text-slate-600 mb-2">FEATURED</p>
              <h1 className="text-5xl md:text-7xl font-black text-black mb-6 leading-tight">
                {selectedMovie.title}
              </h1>
              <div className="flex items-center gap-4 flex-wrap mb-8">
                <span className="px-4 py-2 bg-black text-white font-bold rounded-lg">{year}</span>
                <span className="px-4 py-2 bg-slate-200 text-black font-bold rounded-lg">
                  {rating} ⭐
                </span>
                <span className="px-4 py-2 bg-slate-200 text-black font-bold rounded-lg">
                  {selectedMovie.vote_count ? (selectedMovie.vote_count / 1000).toFixed(0) + 'K' : '0'} votes
                </span>
              </div>
              <div className="flex gap-4">
                <button className="px-8 py-3 bg-black text-white font-bold rounded-lg hover:bg-slate-800 transition-all flex items-center gap-2">
                  <Play className="w-5 h-5 fill-white" />
                  Watch Now
                </button>
                <button
                  onClick={() => toggleFavorite(selectedMovie.id)}
                  className="px-8 py-3 bg-white text-black font-bold rounded-lg border-2 border-black hover:bg-slate-100 transition-all flex items-center gap-2"
                >
                  <Heart
                    className="w-5 h-5"
                    fill={isFavorited(selectedMovie.id) ? 'black' : 'none'}
                  />
                  {isFavorited(selectedMovie.id) ? 'Saved' : 'Save'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-white">
          <div className="max-w-6xl mx-auto px-8 py-16">
            {/* About */}
            {selectedMovie.overview && (
              <div className="mb-16">
                <h2 className="text-3xl font-black text-black mb-6">About</h2>
                <p className="text-lg text-slate-700 leading-relaxed max-w-3xl">
                  {selectedMovie.overview}
                </p>
              </div>
            )}

            {/* Details Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="p-6 bg-slate-100 rounded-2xl">
                <p className="text-sm font-bold text-slate-600 mb-2">LANGUAGE</p>
                <p className="text-2xl font-black text-black">
                  {selectedMovie.original_language?.toUpperCase() || 'N/A'}
                </p>
              </div>
              <div className="p-6 bg-slate-100 rounded-2xl">
                <p className="text-sm font-bold text-slate-600 mb-2">RELEASE DATE</p>
                <p className="text-xl font-black text-black">{selectedMovie.release_date || 'N/A'}</p>
              </div>
              {selectedMovie.budget > 0 && (
                <div className="p-6 bg-slate-100 rounded-2xl">
                  <p className="text-sm font-bold text-slate-600 mb-2">BUDGET</p>
                  <p className="text-2xl font-black text-black">
                    ${(selectedMovie.budget / 1000000).toFixed(1)}M
                  </p>
                </div>
              )}
              <div className="p-6 bg-slate-100 rounded-2xl">
                <p className="text-sm font-bold text-slate-600 mb-2">POPULARITY</p>
                <p className="text-2xl font-black text-black">
                  {selectedMovie.popularity?.toFixed(0) || 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <h1 className="text-3xl md:text-4xl font-black text-black">
              CineDB
            </h1>

            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search movies..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-black transition-all text-black placeholder-slate-400"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {error && (
          <div className="mb-8 p-6 bg-red-100 border-2 border-red-300 rounded-2xl">
            <p className="text-red-800 font-bold mb-4">{error}</p>
            <button
              onClick={fetchMovies}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-all"
            >
              Try Again
            </button>
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-96">
            <div className="w-12 h-12 border-4 border-slate-300 border-t-black rounded-full animate-spin mb-4" />
            <p className="text-slate-600 font-bold">Loading amazing movies...</p>
          </div>
        ) : filteredMovies.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-6xl mb-6">🎬</p>
            <p className="text-3xl font-black text-black mb-3">No movies found</p>
            <p className="text-slate-600 mb-8">Try a different search</p>
            <button
              onClick={() => setSearch('')}
              className="px-8 py-4 bg-black text-white font-bold rounded-xl hover:bg-slate-800 transition-all inline-flex items-center gap-2"
            >
              Browse All Movies
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <>
            <div className="mb-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="w-6 h-6 text-black" />
                  <p className="text-sm font-bold text-slate-600 uppercase">Now Showing</p>
                </div>
                <p className="text-4xl font-black text-black">
                  {filteredMovies.length} Movies
                </p>
              </div>
              {favorites.length > 0 && (
                <div className="px-6 py-3 bg-slate-100 rounded-xl border-2 border-slate-200">
                  <p className="font-bold text-black">
                    <span className="text-red-600">{favorites.length}</span> Saved to Favorites
                  </p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredMovies.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default MovieDB;