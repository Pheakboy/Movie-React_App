import { TrendingUp } from "lucide-react";

const MovieStats = ({ movieCount, favoritesCount }) => {
  return (
    <div className="mb-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <TrendingUp className="w-6 h-6 text-black" />
          <p className="text-sm font-bold text-slate-600 uppercase">
            Now Showing
          </p>
        </div>
        <p className="text-4xl font-black text-black">{movieCount} Movies</p>
      </div>
      {favoritesCount > 0 && (
        <div className="px-6 py-3 bg-slate-100 rounded-xl border-2 border-slate-200">
          <p className="font-bold text-black">
            <span className="text-red-600">{favoritesCount}</span> Saved to
            Favorites
          </p>
        </div>
      )}
    </div>
  );
};

export default MovieStats;
