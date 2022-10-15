import { useEffect, useState } from "react";
import City from "types/City";
import {
  addNewFavourite,
  getFavourites,
  isFavourite,
  removeFavourite,
} from "utils/favourites";

export default function useFavourites() {
  const [favourites, setFavourites] = useState<City[]>([]);

  const toggleFavourite = (city: City) => {
    const updatedFavourites = isFavourite(city.name)
      ? removeFavourite(city.name)
      : addNewFavourite(city);

    setFavourites(updatedFavourites);
  };

  useEffect(() => {
    const favourites = getFavourites();
    setFavourites(favourites);
  }, [getFavourites]);

  return {
    favourites,
    toggleFavourite,
    isFavourite,
  };
}
