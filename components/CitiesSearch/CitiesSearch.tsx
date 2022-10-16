import React, { useState } from "react";
import City from "types/City";
import cities from "../../gradovi.json";
import { AiFillStar } from "react-icons/ai";
import Link from "next/link";

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
          {searchResults.map((city) => (
            <div className={styles.result}>
              <Link
                key={city.name}
                href={`/details?name=${city.name}&longitude=${city.lng}&latitude=${city.lat}`}
              >
                <a className={styles.resultLink}>{city.name}</a>
              </Link>
              <AiFillStar
                onClick={() => handleStarClick(city)}
                size={20}
                className={styles.star}
                fill={
                  favourites.some((fav) => fav.name === city.name)
                    ? "#1d71f2"
                    : undefined
                }
              />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default CitiesSearch;
