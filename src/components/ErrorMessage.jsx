const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="mb-8 p-6 bg-red-100 border-2 border-red-300 rounded-2xl">
      <p className="text-red-800 font-bold mb-4">{message}</p>
      <button
        onClick={onRetry}
        className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-all"
      >
        Try Again
      </button>
    </div>
  );
};

export default ErrorMessage;
