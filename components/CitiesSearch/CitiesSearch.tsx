import React, { useState } from "react";
import City from "types/City";
import cities from "../../gradovi.json";

import styles from "./CitiesSearch.module.css";

function CitiesSearch() {
  const [searchResults, setSearchResults] = useState<City[]>([]);

  const searchCities = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (!value.length) {
      setSearchResults([]);
      return;
    }

    const results = cities
      .filter((city) => city.city.toLowerCase().includes(value.toLowerCase()))
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
            <div className={styles.result} key={city.city}>
              <p>{city.city}</p>
              <p>icon</p>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default CitiesSearch;
