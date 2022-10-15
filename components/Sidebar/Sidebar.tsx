import React, { useState } from "react";
import cn from "clsx";
import { GiHamburgerMenu } from "react-icons/gi";
import { VscChromeClose } from "react-icons/vsc";
import { AiFillStar } from "react-icons/ai";

import City from "types/City";

import styles from "./Sidebar.module.css";

interface Props {
  favourites: City[];
  handleStarClick: (city: City) => void;
}

function Sidebar({ favourites, handleStarClick }: Props) {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      <GiHamburgerMenu
        size={35}
        className={styles.burgerMenu}
        onClick={() => setShowSidebar(true)}
      />
      <div className={cn([styles.sidebar, showSidebar && styles.show])}>
        <VscChromeClose
          size={35}
          className={styles.close}
          onClick={() => setShowSidebar(false)}
        />
        <h2>Favourites</h2>
        <div className={styles.favouriteContainer}>
          {favourites.map((city) => (
            <div key={city.name} className={styles.favourite}>
              <p className={styles.favouriteName}>{city.name}</p>
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
      </div>
    </>
  );
}

export default Sidebar;
