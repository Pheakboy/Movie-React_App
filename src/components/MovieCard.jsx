import { Star, Heart, Play } from "lucide-react";
import { IMG_BASE } from "../utils/constants";

const MovieCard = ({ movie, onMovieClick, onToggleFavorite, isFavorited }) => {
  const imageUrl = movie.poster_path
    ? `${IMG_BASE}${movie.poster_path}`
    : null;
  const rating = movie.vote_average
    ? (movie.vote_average / 2).toFixed(1)
    : "0";

  return (
    <div
      onClick={() => onMovieClick(movie)}
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
          <span className="text-slate-400 text-center px-4 text-sm">
            {movie.title}
          </span>
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
              onToggleFavorite(movie.id);
            }}
            className="p-2 bg-white/20 hover:bg-red-500 rounded-lg transition-all backdrop-blur"
          >
            <Heart
              className="w-4 h-4 text-white"
              fill={isFavorited ? "white" : "none"}
            />
          </button>
        </div>

        <div className="space-y-2">
          <h3 className="font-bold text-white text-sm line-clamp-2">
            {movie.title}
          </h3>
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

export default MovieCard;
