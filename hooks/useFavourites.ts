import { useCallback, useEffect, useState } from "react";
import City from "types/City";

export default function useFavourites() {
  const key = "@favourites";
  const [favourites, setFavourites] = useState<City[]>([]);

  const getFavourites = useCallback(() => {
    const favourites = window.localStorage.getItem(key);
    if (favourites) {
      return JSON.parse(favourites) as City[];
    } else {
      return [];
    }
  }, []);

  const saveFavourites = (newFavourites: City[]) => {
    window.localStorage.setItem(key, JSON.stringify(newFavourites));
    setFavourites(newFavourites);
  };

  const addNewFavourite = useCallback(
    (newFavourite: City) => {
      if (!newFavourite) throw new Error("Favourite can't have falsy value.");
      const newFavourites = [...favourites, newFavourite];
      saveFavourites(newFavourites);
    },
    [favourites]
  );

  const removeFavourite = useCallback(
    (favouriteName: string) => {
      if (!favouriteName) throw new Error("Favourite name required.");
      const newFavourites = getFavourites().filter(
        ({ name }) => favouriteName !== name
      );
      saveFavourites(newFavourites);
    },
    [getFavourites]
  );

  const toggleFavourite = (city: City) => {
    if (isFavourite(city.name)) {
      removeFavourite(city.name);
    } else {
      addNewFavourite(city);
    }
  };

  const isFavourite = (cityName: string) => {
    return (
      favourites.findIndex((favourite) => favourite.name === cityName) !== -1
    );
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
