import { ChevronRight } from "lucide-react";

const EmptyState = ({ onClearSearch }) => {
  return (
    <div className="text-center py-24">
      <p className="text-6xl mb-6">🎬</p>
      <p className="text-3xl font-black text-black mb-3">No movies found</p>
      <p className="text-slate-600 mb-8">Try a different search</p>
      <button
        onClick={onClearSearch}
        className="px-8 py-4 bg-black text-white font-bold rounded-xl hover:bg-slate-800 transition-all inline-flex items-center gap-2"
      >
        Browse All Movies
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default EmptyState;
