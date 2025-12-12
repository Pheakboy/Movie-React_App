import { Search } from "lucide-react";

const Header = ({ search, onSearchChange }) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <h1 className="text-3xl md:text-4xl font-black text-black">
            Movie Explorer
          </h1>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search movies..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-black transition-all text-black placeholder-slate-400"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
