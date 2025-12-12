import { useState } from "react";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (movieId) => {
    setFavorites((prev) =>
      prev.includes(movieId)
        ? prev.filter((id) => id !== movieId)
        : [...prev, movieId]
    );
  };

  const isFavorited = (movieId) => favorites.includes(movieId);

  return {
    favorites,
    toggleFavorite,
    isFavorited,
  };
};
