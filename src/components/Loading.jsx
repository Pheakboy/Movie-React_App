const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-96">
      <div className="w-12 h-12 border-4 border-slate-300 border-t-black rounded-full animate-spin mb-4" />
      <p className="text-slate-600 font-bold">Loading amazing movies...</p>
    </div>
  );
};

export default Loading;
