import { useCallback, useEffect, useState } from "react";
import City from "types/City";
import {
  addNewFavourite,
  getFavourites,
  isFavourite,
  removeAllFavourites,
  removeFavourite,
} from "utils/favourites";

export default function useFavourites() {
  const [favourites, setFavourites] = useState<City[]>([]);

  const toggleFavourite = useCallback((city: City) => {
    const updatedFavourites = isFavourite(city.name)
      ? removeFavourite(city.name)
      : addNewFavourite(city);

    setFavourites(updatedFavourites);
  }, []);

  const clearFavourites = useCallback(() => {
    setFavourites([]);
    removeAllFavourites();
  }, []);

  useEffect(() => {
    const favourites = getFavourites();
    setFavourites(favourites);
  }, [getFavourites]);

  return {
    favourites,
    toggleFavourite,
    isFavourite,
    clearFavourites,
  };
}
