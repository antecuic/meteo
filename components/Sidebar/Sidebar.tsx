import Link from "next/link";
import React, { useMemo, useState } from "react";
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

type Sort = "ASC" | "DESC";

function Sidebar({ favourites, handleStarClick }: Props) {
  const [sort, setSort] = useState<Sort>("ASC");
  const [showSidebar, setShowSidebar] = useState(false);

  const sortedFavourites = useMemo(() => {
    return favourites.sort((a, b) => {
      const isAsc = sort === "ASC";
      const order = a.name.localeCompare(b.name);
      return isAsc ? order : -order;
    });
  }, [favourites, sort]);

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
        <div className={styles.heading}>
          <h2>Favourites</h2>
          <p
            className={styles.sort}
            onClick={() =>
              setSort((prevState) => (prevState === "ASC" ? "DESC" : "ASC"))
            }
          >
            Sort: <span>{sort}</span>
          </p>
        </div>
        <div className={styles.favouriteContent}>
          {sortedFavourites.map((city) => (
            <div key={city.name} className={styles.favourite}>
              <Link
                href={`/details?name=${city.name}&longitude=${city.lng}&latitude=${city.lat}`}
              >
                <a className={styles.favouriteName}>{city.name}</a>
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
      </div>
    </>
  );
}

export default Sidebar;
