import { X, Heart, Play } from "lucide-react";
import { IMG_BASE } from "../utils/constants";

const MovieDetail = ({ movie, onClose, onToggleFavorite, isFavorited }) => {
  const posterUrl = movie.poster_path ? `${IMG_BASE}${movie.poster_path}` : null;
  const year = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "N/A";
  const rating = movie.vote_average
    ? (movie.vote_average / 2).toFixed(1)
    : "N/A";

  return (
    <div className="min-h-screen bg-white">
      {/* Close Button */}
      <button
        onClick={onClose}
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
              alt={movie.title}
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
              {movie.title}
            </h1>
            <div className="flex items-center gap-4 flex-wrap mb-8">
              <span className="px-4 py-2 bg-black text-white font-bold rounded-lg">
                {year}
              </span>
              <span className="px-4 py-2 bg-slate-200 text-black font-bold rounded-lg">
                {rating} ⭐
              </span>
              <span className="px-4 py-2 bg-slate-200 text-black font-bold rounded-lg">
                {movie.vote_count
                  ? (movie.vote_count / 1000).toFixed(0) + "K"
                  : "0"}{" "}
                votes
              </span>
            </div>
            <div className="flex gap-4">
              <button className="px-8 py-3 bg-black text-white font-bold rounded-lg hover:bg-slate-800 transition-all flex items-center gap-2">
                <Play className="w-5 h-5 fill-white" />
                Watch Now
              </button>
              <button
                onClick={() => onToggleFavorite(movie.id)}
                className="px-8 py-3 bg-white text-black font-bold rounded-lg border-2 border-black hover:bg-slate-100 transition-all flex items-center gap-2"
              >
                <Heart
                  className="w-5 h-5"
                  fill={isFavorited ? "black" : "none"}
                />
                {isFavorited ? "Saved" : "Save"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-white">
        <div className="max-w-6xl mx-auto px-8 py-16">
          {/* About */}
          {movie.overview && (
            <div className="mb-16">
              <h2 className="text-3xl font-black text-black mb-6">About</h2>
              <p className="text-lg text-slate-700 leading-relaxed max-w-3xl">
                {movie.overview}
              </p>
            </div>
          )}

          {/* Details Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="p-6 bg-slate-100 rounded-2xl">
              <p className="text-sm font-bold text-slate-600 mb-2">
                LANGUAGE
              </p>
              <p className="text-2xl font-black text-black">
                {movie.original_language?.toUpperCase() || "N/A"}
              </p>
            </div>
            <div className="p-6 bg-slate-100 rounded-2xl">
              <p className="text-sm font-bold text-slate-600 mb-2">
                RELEASE DATE
              </p>
              <p className="text-xl font-black text-black">
                {movie.release_date || "N/A"}
              </p>
            </div>
            {movie.budget > 0 && (
              <div className="p-6 bg-slate-100 rounded-2xl">
                <p className="text-sm font-bold text-slate-600 mb-2">
                  BUDGET
                </p>
                <p className="text-2xl font-black text-black">
                  ${(movie.budget / 1000000).toFixed(1)}M
                </p>
              </div>
            )}
            <div className="p-6 bg-slate-100 rounded-2xl">
              <p className="text-sm font-bold text-slate-600 mb-2">
                POPULARITY
              </p>
              <p className="text-2xl font-black text-black">
                {movie.popularity?.toFixed(0) || "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
