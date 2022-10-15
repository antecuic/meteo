import React, { useState } from "react";
import City from "types/City";
import cities from "../../gradovi.json";
import { AiFillStar } from "react-icons/ai";

import styles from "./CitiesSearch.module.css";

interface Props {
  favourites: City[];
  handleStarClick: (city: City) => void;
}

function CitiesSearch({ favourites, handleStarClick }: Props) {
  const [searchResults, setSearchResults] = useState<City[]>([]);

  const searchCities = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (!value.length) {
      setSearchResults([]);
      return;
    }

    const results = cities
      .filter((city) => city.name.toLowerCase().includes(value.toLowerCase()))
      .slice(0, 5);

    setSearchResults(results);
  };

  return (
    <div className={styles.search}>
      <input
        className={styles.input}
        type="text"
        placeholder="Search for a location"
        onChange={searchCities}
      />
      {searchResults.length > 0 ? (
        <div className={styles.searchResults}>
          {searchResults.map((city) => {
            const isFavourite =
              favourites.findIndex(
                (favourite) => city.name === favourite.name
              ) !== -1;
            return (
              <div className={styles.result} key={city.name}>
                <p>{city.name}</p>
                <AiFillStar
                  onClick={() => handleStarClick(city)}
                  size={20}
                  className={styles.star}
                  fill={isFavourite ? "#1d71f2" : undefined}
                />
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export default CitiesSearch;
