import City from "types/City";

const KEY = "@favourites";

export const getFavourites = () => {
  const favourites = window.localStorage.getItem(KEY);
  if (favourites) {
    return JSON.parse(favourites) as City[];
  } else {
    return [];
  }
};

export const saveFavourites = (newFavourites: City[]) => {
  window.localStorage.setItem(KEY, JSON.stringify(newFavourites));
};

export const addNewFavourite = (newFavourite: City) => {
  if (!newFavourite) throw new Error("Favourite can't have falsy value.");
  const newFavourites = [...getFavourites(), newFavourite];
  saveFavourites(newFavourites);
  return newFavourites;
};

export const removeFavourite = (favouriteName: string) => {
  if (!favouriteName) throw new Error("Favourite name required.");
  const newFavourites = getFavourites().filter(
    ({ name }) => favouriteName !== name
  );
  saveFavourites(newFavourites);
  return newFavourites;
};

export const removeAllFavourites = () => {
  window.localStorage.removeItem(KEY);
};

export const isFavourite = (cityName: string) => {
  return (
    getFavourites().findIndex((favourite) => favourite.name === cityName) !== -1
  );
};
